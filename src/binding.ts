import { parseType } from './parsers';
import { Observer, IObserverSyncCallback, IObservers } from './observer';
import { Binder, IOneWayBinder, ITwoWayBinder } from './binders';
import { View } from './view';
import { PRIMITIVE, KEYPATH, DEFAULT_PROPERTYNAME, IKeypaths, IPrimitives } from './attributes';

const FORMATTER_ARGS =  /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
const FORMATTER_SPLIT = /\s+/;

export interface IFormatterObservers {
  [key: string]: {
    [key: string]: Observer
  }
}

export type eventHandlerFunction = (event: Event) => void;

/**
 * TODO move to utils
 * @param el
 */
function getInputValue(el: HTMLSelectElement | HTMLInputElement) {
  let results: string[] = [];
  if (el.type === 'checkbox') {
    return (el as HTMLInputElement).checked;
  } else if (el.type === 'select-multiple') {
    let options:HTMLOptionsCollection = (el as HTMLSelectElement).options;

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const option = options[key];
        if (option.selected) {
          results.push(option.value);
        }
      }
    }

    return results;
  } else {
    return el.value;
  }
}

/**
 *  A single binding between a model attribute and a DOM element.
 */
export class Binding {
  observers: IObservers = {};
  view: View;
  el: HTMLElement;
  /**
   * Name of the binder without the prefix
   */
  type: string | null;
  binder: Binder<any> | null;
  formatters: string[] | null;
  formatterObservers: IFormatterObservers;
  /**
   * statics values (PRIMITIVE Attributes)
   */
  primitives: IPrimitives = {};
  /**
   * keypath values (KEYPATH Attributes)
   */
  keypaths: IKeypaths = {};
  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */
  args: string[] | null;
  /**
   * 
   */
  model: any = {};
  /**
   * HTML Comment to mark a binding in the DOM
   */
  marker?: Comment;
  /**
   * Used in component bindings. TODO e.g. move to ComponentBinding or binders?
   */
  _bound?: boolean;
  /**
   * just to have a value where we could store custom data
   */
  customData?: any;

  /**
   * All information about the binding is passed into the constructor; the
   * containing view, the DOM node, the type of binding, the model object and the
   * keypath at which to listen for changes.
   * @param {*} view 
   * @param {*} el 
   * @param {*} type 
   * @param {*} keypath 
   * @param {*} binder 
   * @param {*} args The start binders, on `class-*` args[0] wil be the classname 
   * @param {*} formatters 
   */
  constructor(view: View, el: HTMLElement, type: string | null, keypath: string | null, binder: Binder<any> | null, args: string[] | null, formatters: string[] | null) {
    this.view = view;
    this.el = el;
    this.type = type;
    this.binder = binder;
    this.args = args;
    this.formatters = formatters;
    this.formatterObservers = {};
    this.model[DEFAULT_PROPERTYNAME] = undefined;
    this.customData = {};

    console.log('new binder', this.type);

    if(keypath !== null) {
      this.keypaths[DEFAULT_PROPERTYNAME] = keypath;
    } else {
      this.keypaths[DEFAULT_PROPERTYNAME] = 'FIXME';
    }
  }

  /**
   * Observes the object keypath
   * @param obj 
   * @param keypath 
   */
  observe(obj: any, keypath: string, callback?: IObserverSyncCallback): Observer {
    if(callback) {
      return new Observer(obj, keypath, callback);
    } else {
      return new Observer(obj, keypath, this);
    }
    
  }

  parseTarget() {
    for (const propertyName in this.keypaths) {
      if (this.keypaths.hasOwnProperty(propertyName)) {
        const keypath = this.keypaths[propertyName];
        if(keypath) {
          let token = parseType(keypath);
          if (token.type === PRIMITIVE) {
            this.primitives[propertyName] = token.value;
          } else if(token.type === KEYPATH){
            this.observers[propertyName] = this.observe(this.view.models, keypath);
            this.model[propertyName] = this.observers[propertyName].target;
          } else {
            throw new Error('Unknown type in token');
          }
        } else {
          this.primitives[propertyName] = undefined;
        }
      }
    }
  }
  
  /**
   * Get the iteration alias, used in the interation binders like `each-*`
   * @param {*} modelName 
   * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L26
   * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L1175
   */
  getIterationAlias(modelName: string) {
    return '%' + modelName + '%';
  }

  parseFormatterArguments(args: string[], formatterIndex: number): string[] {
    return args
    .map(parseType)
    .map(({type, value}, ai) => {
      if (type === PRIMITIVE) {
        const primitiveValue = value;
        return primitiveValue;
      } else if (type === KEYPATH) {
        // keypath is string
        const keypath = (value as string );
        if (!this.formatterObservers[formatterIndex]) {
          this.formatterObservers[formatterIndex] = {};
        }

        let observer = this.formatterObservers[formatterIndex][ai];

        if (!observer) {
          observer = this.observe(this.view.models, keypath);
          this.formatterObservers[formatterIndex][ai] = observer;
        }
        return observer.value();
      } else {
        throw new Error('Unknown argument type');
      }
    });
  }

  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  formattedValue(value: any) {
    if(this.formatters === null) {
      // throw new Error('formatters is null');
      return value;
    }
    return this.formatters.reduce((result: any/*check type*/, declaration: string /*check type*/, index: number) => {
      let args = declaration.match(FORMATTER_ARGS);
      if(args === null) {
        throw new Error('No args matched from FORMATTER_ARGS');
      }
      let id = args.shift();
      if(!id) {
        throw new Error('No id found in args');
      }
      let formatter = this.view.options.formatters[id];

      const processedArgs = this.parseFormatterArguments(args, index);

      if (formatter && (formatter.read instanceof Function)) {
        result = formatter.read(result, ...processedArgs);
      } else if (formatter instanceof Function) {
        result = formatter(result, ...processedArgs);
      }
      return result;
    }, value);
  }

  /**
   * Returns an event handler for the binding around the supplied function.
   */
  eventHandler(fn: eventHandlerFunction): (ev: Event) => any {
    let binding = this;
    let handler = binding.view.options.handler;

    return (ev) => {
      if(!handler) {
        throw new Error('No handler defined in binding.view.options.handler');
      }
      handler.call(fn, this, ev, binding);
    };
  }

  /**
   * Sets the value for the binding. This Basically just runs the binding routine
   * with the supplied value formatted.
   */
  set(value: any, propertyName = DEFAULT_PROPERTYNAME) {
    if ((value instanceof Function) && !(this.binder as ITwoWayBinder<any> ).function) {
      value = (value as IOneWayBinder<any> )
      value = this.formattedValue(value.call(this.model[propertyName]));
    } else {
      value = (value as ITwoWayBinder<any> )
      value = this.formattedValue(value);
    }

    let routineFn;
    if(this.binder === null) {
      throw new Error('binder is null');
    }
    if(this.binder.hasOwnProperty('routine')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      routineFn = this.binder.routine;
    } else {
      this.binder = ( this.binder as IOneWayBinder<any>);
      routineFn = this.binder;
    }

    if (routineFn instanceof Function) {
      routineFn.call(this, this.el, value);
    }
  }

  /**
   * Syncs up the view binding with the model.
   */
  sync() {
    for (const propertyName in this.observers) {
      if (this.observers.hasOwnProperty(propertyName)) {
        const observer = this.observers[propertyName];

        if(observer) {
          this.model[propertyName] = observer.target;
          this.set(observer.value(), propertyName);
        } else {
          const primitive = this.primitives[propertyName];
          this.set(primitive, propertyName);
        }
      }
    }
  }

  /**
   * Publishes the value currently set on the input element back to the model.
   */
  publish() {
    if (this.observers) {
      if(this.formatters === null) {
        throw new Error('formatters is null');
      }
      for (const propertyName in this.observers) {
        if (this.observers.hasOwnProperty(propertyName)) {
          const observer = this.observers[propertyName];

          let value = this.formatters.reduceRight((result: any/*check type*/, declaration: string /*check type*/, index: number) => {
            const args = declaration.split(FORMATTER_SPLIT);
            const id = args.shift();
            if(!id) {
              throw new Error('id not defined');
            }
            const formatter = this.view.options.formatters[id];
            const processedArgs = this.parseFormatterArguments(args, index);
    
            if (formatter && formatter.publish) {
              result = formatter.publish(result, ...processedArgs);
            }
            return result;
          }, this.getValue((this.el as HTMLInputElement)));
    
          observer.setValue(value);
        }
      }
    }
  }

  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  bind() {
    this.parseTarget();

    if (this.binder && this.binder.hasOwnProperty('bind')) {
      this.binder = (this.binder as ITwoWayBinder<any>);
      if(!this.binder.bind && typeof(this.binder.bind) !== 'function') {
        throw new Error('the method bind is not a function');
      }
      this.binder.bind.call(this, this.el);
    }

    if (this.view.options.preloadData) {
      this.sync();
    }
  }

  /**
   * Unsubscribes from the model and the element.
   */
  unbind() {
    if(this.binder === null) {
      throw new Error('binder is null');
    }
    if(this.binder.hasOwnProperty('bind')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if (this.binder.unbind) {
        this.binder.unbind.call(this, this.el);
      }
    }

    if (this.observers) {
      for (const propertyName in this.observers) {
        if (this.observers.hasOwnProperty(propertyName)) {
          const observer = this.observers[propertyName];
          observer.unobserve();
        }
      }
      
    }

    Object.keys(this.formatterObservers).forEach(fi => {
      let args = this.formatterObservers[fi];

      Object.keys(args).forEach(ai => {
        args[ai].unobserve();
      });
    });

    this.formatterObservers = {};
  }

  /**
   * Updates the binding's model from what is currently set on the view. Unbinds
   * the old model first and then re-binds with the new model.
   * @param {any} models 
   */
  update(models: any = {}) {
    if (this.observers) {
      for (const propertyName in this.observers) {
        if (this.observers.hasOwnProperty(propertyName)) {
          const observer = this.observers[propertyName];
          this.model[propertyName] = observer.target;
          // this.model = observer.target;
        }
      }
      
    }
    if(this.binder === null) {
      throw new Error('binder is null');
    }
    if(this.binder.hasOwnProperty('update')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if (this.binder.update) {
        this.binder.update.call(this, models);
      }
    }
  }

  /**
   * Returns elements value
   * @param el 
   */
  getValue(el: HTMLSelectElement | HTMLInputElement) {
    if(this.binder === null) {
      throw new Error('binder is null');
    }
    if(this.binder.hasOwnProperty('getValue')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if(typeof(this.binder.getValue) !== 'function') {
        throw new Error('getValue is not a function');
      }
      return this.binder.getValue.call(this, el);
    } else {
      return getInputValue(el);
    }
  }
}
