(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tinybind"] = factory();
	else
		root["tinybind"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tinybind.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/adapter.ts":
/*!************************!*\
  !*** ./src/adapter.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Adapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// The default `.` adapter that comes with tinybind.js. Allows subscribing to
// properties on plain objects, implemented in ES5 natives using
// `Object.defineProperty`.
var ARRAY_METHODS = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

var Adapter =
/*#__PURE__*/
function () {
  function Adapter() {
    _classCallCheck(this, Adapter);

    _defineProperty(this, "counter", 0);

    _defineProperty(this, "weakmap", {});
  }

  _createClass(Adapter, [{
    key: "weakReference",
    value: function weakReference(obj) {
      if (!obj.hasOwnProperty('__rv')) {
        var id = this.counter++;
        Object.defineProperty(obj, '__rv', {
          value: id
        });
      }

      if (!this.weakmap[obj.__rv]) {
        this.weakmap[obj.__rv] = {
          callbacks: {}
        };
      }

      return this.weakmap[obj.__rv];
    }
  }, {
    key: "cleanupWeakReference",
    value: function cleanupWeakReference(ref, id) {
      if (!Object.keys(ref.callbacks).length) {
        if (!(ref.pointers && Object.keys(ref.pointers).length)) {
          delete this.weakmap[id];
        }
      }
    }
  }, {
    key: "stubFunction",
    value: function stubFunction(obj, fn) {
      var original = obj[fn];
      var map = this.weakReference(obj);
      var weakmap = this.weakmap;

      obj[fn] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var response = original.apply(obj, args);
        Object.keys(map.pointers).forEach(function (r) {
          var k = map.pointers[r];

          if (weakmap[r]) {
            if (weakmap[r].callbacks[k] instanceof Array) {
              weakmap[r].callbacks[k].forEach(function (callback) {
                callback.sync();
              });
            }
          }
        });
        return response;
      };
    }
  }, {
    key: "observeMutations",
    value: function observeMutations(obj, ref, keypath) {
      var _this = this;

      if (obj instanceof Array) {
        var map = this.weakReference(obj);

        if (!map.pointers) {
          map.pointers = {};
          ARRAY_METHODS.forEach(function (fn) {
            _this.stubFunction(obj, fn);
          });
        }

        if (!map.pointers[ref]) {
          map.pointers[ref] = [];
        }

        if (map.pointers[ref].indexOf(keypath) === -1) {
          map.pointers[ref].push(keypath);
        }
      }
    }
  }, {
    key: "unobserveMutations",
    value: function unobserveMutations(obj, ref, keypath) {
      if (obj instanceof Array && obj.__rv != null) {
        var map = this.weakmap[obj.__rv];

        if (map) {
          var _pointers = map.pointers[ref];

          if (_pointers) {
            var idx = _pointers.indexOf(keypath);

            if (idx > -1) {
              _pointers.splice(idx, 1);
            }

            if (!_pointers.length) {
              delete map.pointers[ref];
            }

            this.cleanupWeakReference(map, obj.__rv);
          }
        }
      }
    }
  }, {
    key: "observe",
    value: function observe(obj, keypath, callback) {
      var _this2 = this;

      var value;
      var callbacks = this.weakReference(obj).callbacks;

      if (!callbacks[keypath]) {
        callbacks[keypath] = [];
        var desc = Object.getOwnPropertyDescriptor(obj, keypath);

        if (!desc || !(desc.get || desc.set || !desc.configurable)) {
          value = obj[keypath];
          Object.defineProperty(obj, keypath, {
            enumerable: true,
            get: function get() {
              return value;
            },
            set: function set(newValue) {
              if (newValue !== value) {
                _this2.unobserveMutations(value, obj.__rv, keypath);

                value = newValue;
                var map = _this2.weakmap[obj.__rv];

                if (map) {
                  var _callbacks = map.callbacks[keypath];

                  if (_callbacks) {
                    _callbacks.forEach(function (cb) {
                      cb.sync();
                    });
                  }

                  _this2.observeMutations(newValue, obj.__rv, keypath);
                }
              }
            }
          });
        }
      }

      if (callbacks[keypath].indexOf(callback) === -1) {
        callbacks[keypath].push(callback);
      }

      this.observeMutations(obj[keypath], obj.__rv, keypath);
    }
  }, {
    key: "unobserve",
    value: function unobserve(obj, keypath, callback) {
      var map = this.weakmap[obj.__rv];

      if (map) {
        var _callbacks2 = map.callbacks[keypath];

        if (_callbacks2) {
          var idx = _callbacks2.indexOf(callback);

          if (idx > -1) {
            _callbacks2.splice(idx, 1);

            if (!_callbacks2.length) {
              delete map.callbacks[keypath];
              this.unobserveMutations(obj[keypath], obj.__rv, keypath);
            }
          }

          this.cleanupWeakReference(map, obj.__rv);
        }
      }
    }
  }, {
    key: "get",
    value: function get(obj, keypath) {
      return obj[keypath];
    }
  }, {
    key: "set",
    value: function set(obj, keypath, value) {
      obj[keypath] = value;
    }
  }]);

  return Adapter;
}();

exports.Adapter = Adapter;
;
var adapter = new Adapter();
var _default = adapter;
exports.default = _default;

/***/ }),

/***/ "./src/attributes.ts":
/*!***************************!*\
  !*** ./src/attributes.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PROPERTYNAME = exports.KEYPATH = exports.PRIMITIVE = void 0;

/**
 * Attribiute tyoes
 */
var PRIMITIVE = 0;
exports.PRIMITIVE = PRIMITIVE;
var KEYPATH = 1;
exports.KEYPATH = KEYPATH;
var DEFAULT_PROPERTYNAME = '_binder';
exports.DEFAULT_PROPERTYNAME = DEFAULT_PROPERTYNAME;

/***/ }),

/***/ "./src/binders.ts":
/*!************************!*\
  !*** ./src/binders.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.binders = void 0;

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var getString = function getString(value) {
  return value != null ? value.toString() : undefined;
};

var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};

var createView = function createView(binding, models, anchorEl) {
  var template = binding.el.cloneNode(true);
  var view = new _view.View(template, models, binding.view.options);
  view.bind();

  if (!binding || !binding.marker || binding.marker.parentNode === null) {
    throw new Error('No parent node for binding!');
  }

  binding.marker.parentNode.insertBefore(template, anchorEl);
  return view;
};

var binders = {
  // Binds an event handler on the element.
  'on-*': {
    function: true,
    priority: 1000,
    bind: function bind(el) {
      if (!this.customData) {
        this.customData = {
          handler: null
        };
      }
    },
    unbind: function unbind(el) {
      if (this.customData.handler) {
        if (this.args === null) {
          throw new Error('args is null');
        }

        el.removeEventListener(this.args[0], this.customData);
      }
    },
    routine: function routine(el, value
    /*TODO*/
    ) {
      if (this.customData.handler) {
        if (this.args === null) {
          throw new Error('args is null');
        }

        el.removeEventListener(this.args[0], this.customData.handler);
      }

      this.customData.handler = this.eventHandler(value);

      if (this.args === null) {
        throw new Error('args is null');
      }

      el.addEventListener(this.args[0], this.customData.handler);
    }
  },
  // Appends bound instances of the element in place for each item in the array.
  'each-*': {
    block: true,
    priority: 4000,
    bind: function bind(el) {
      if (!this.marker) {
        this.marker = document.createComment(" tinybind: ".concat(this.type, " "));
        this.customData = {
          iterated: []
        };

        if (!el.parentNode) {
          throw new Error('No parent node!');
        }

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else {
        this.customData.iterated.forEach(function (view) {
          view.bind();
        });
      }
    },
    unbind: function unbind(el) {
      if (this.customData.iterated) {
        this.customData.iterated.forEach(function (view) {
          view.unbind();
        });
      }
    },
    routine: function routine(el, collection) {
      var _this = this;

      if (this.args === null) {
        throw new Error('args is null');
      }

      var modelName = this.args[0];
      collection = collection || []; // TODO support object keys to iterate over

      if (!Array.isArray(collection)) {
        throw new Error('each-' + modelName + ' needs an array to iterate over, but it is');
      } // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`  


      var indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);
      collection.forEach(function (model, index) {
        var scope = {
          $parent: _this.view.models
        };
        scope[indexProp] = index;
        scope[modelName] = model;
        var view = _this.customData.iterated[index];

        if (!view) {
          var previous;

          if (_this.customData.iterated.length) {
            previous = _this.customData.iterated[_this.customData.iterated.length - 1].els[0];
          } else if (_this.marker) {
            previous = _this.marker;
          } else {
            throw new Error('previous not defined');
          }

          view = createView(_this, scope, previous.nextSibling);

          _this.customData.iterated.push(view);
        } else {
          if (view.models[modelName] !== model) {
            // search for a view that matches the model
            var matchIndex, nextView;

            for (var nextIndex = index + 1; nextIndex < _this.customData.iterated.length; nextIndex++) {
              nextView = _this.customData.iterated[nextIndex];

              if (nextView.models[modelName] === model) {
                matchIndex = nextIndex;
                break;
              }
            }

            if (matchIndex !== undefined) {
              // model is in other position
              // todo: consider avoiding the splice here by setting a flag
              // profile performance before implementing such change
              _this.customData.iterated.splice(matchIndex, 1);

              if (!_this.marker || !_this.marker.parentNode) {
                throw new Error('Marker has no parent node');
              }

              _this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);

              nextView.models[indexProp] = index;
            } else {
              //new model
              nextView = createView(_this, scope, view.els[0]);
            }

            _this.customData.iterated.splice(index, 0, nextView);
          } else {
            view.models[indexProp] = index;
          }
        }
      });

      if (this.customData.iterated.length > collection.length) {
        times(this.customData.iterated.length - collection.length, function () {
          var view = _this.customData.iterated.pop();

          view.unbind();

          if (!_this.marker || !_this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }

          _this.marker.parentNode.removeChild(view.els[0]);
        });
      }

      if (el.nodeName === 'OPTION' && this.view.bindings) {
        this.view.bindings.forEach(function (binding) {
          if (_this.marker && binding.el === _this.marker.parentNode && binding.type === 'value') {
            binding.sync();
          }
        });
      }
    },
    update: function update(models) {
      var _this2 = this;

      var data = {}; //todo: add test and fix if necessary

      Object.keys(models).forEach(function (key) {
        if (_this2.args === null) {
          throw new Error('args is null');
        }

        if (key !== _this2.args[0]) {
          data[key] = models[key];
        }
      });
      this.customData.iterated.forEach(function (view) {
        view.update(data);
      });
    }
  },
  // Adds or removes the class from the element when value is true or false.
  'class-*': function (el, value) {
    var elClass = " ".concat(el.className, " ");

    if (this.args === null) {
      throw new Error('args is null');
    }

    if (value !== elClass.indexOf(" ".concat(this.args[0], " ")) > -1) {
      if (value) {
        el.className = "".concat(el.className, " ").concat(this.args[0]);
      } else {
        el.className = elClass.replace(" ".concat(this.args[0], " "), ' ').trim();
      }
    }
  },
  // Sets the element's text value.
  text: function (el, value) {
    el.textContent = value != null ? value : '';
  },
  // Sets the element's HTML content.
  html: function (el, value) {
    console.log('html', el, value);
    el.innerHTML = value != null ? value : '';
  },
  // Shows the element when value is true.
  show: function (el, value) {
    el.style.display = value ? '' : 'none';
  },
  // Hides the element when value is true (negated version of `show` binder).
  hide: function (el, value) {
    el.style.display = value ? 'none' : '';
  },
  // Enables the element when value is true.
  enabled: function (el, value) {
    el.disabled = !value;
  },
  // Disables the element when value is true (negated version of `enabled` binder).
  disabled: function (el, value) {
    el.disabled = !!value;
  },
  // Checks a checkbox or radio input when the value is true. Also sets the model
  // property when the input is checked or unchecked (two-way binder).
  checked: {
    publishes: true,
    priority: 2000,
    bind: function bind(el) {
      var self = this;
      this.customData = {};

      if (!this.customData.callback) {
        this.customData.callback = function () {
          self.publish();
        };
      }

      el.addEventListener('change', this.customData.callback);
    },
    unbind: function unbind(el) {
      el.removeEventListener('change', this.customData.callback);
    },
    routine: function routine(el, value) {
      if (el.type === 'radio') {
        el.checked = getString(el.value) === getString(value);
      } else {
        el.checked = !!value;
      }
    }
  },
  // Sets the element's value. Also sets the model property when the input changes
  // (two-way binder).
  value: {
    publishes: true,
    priority: 3000,
    bind: function bind(el) {
      this.customData = {};
      this.customData.isRadio = el.tagName === 'INPUT' && el.type === 'radio';

      if (!this.customData.isRadio) {
        this.customData.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');
        var self = this;

        if (!this.customData.callback) {
          this.customData.callback = function () {
            self.publish();
          };
        }

        el.addEventListener(this.customData.event, this.customData.callback);
      }
    },
    unbind: function unbind(el) {
      if (!this.customData.isRadio) {
        el.removeEventListener(this.customData.event, this.customData.callback);
      }
    },
    routine: function routine(el, value) {
      if (this.customData && this.customData.isRadio) {
        el.setAttribute('value', value);
      } else {
        if (el.type === 'select-multiple' && el instanceof HTMLSelectElement) {
          if (value instanceof Array) {
            for (var i = 0; i < el.length; i++) {
              var option = el[i];
              option.selected = value.indexOf(option.value) > -1;
            }
          }
        } else if (getString(value) !== getString(el.value)) {
          el.value = value != null ? value : '';
        }
      }
    }
  },
  // Inserts and binds the element and it's child nodes into the DOM when true.
  if: {
    block: true,
    priority: 4000,
    bind: function bind(el) {
      this.customData = {};

      if (!this.marker) {
        var keypath = this.keypaths ? this.keypaths[0] : '';
        this.marker = document.createComment(' tinybind: ' + this.type + ' ' + keypath + ' ');
        this.customData.attached = false;

        if (!el.parentNode) {
          throw new Error('Element has no parent node');
        }

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else if (this.customData.bound === false && this.customData.nested) {
        this.customData.nested.bind();
      }

      this.customData.bound = true;
    },
    unbind: function unbind() {
      if (this.customData.nested) {
        this.customData.nested.unbind();
        this.customData.bound = false;
      }
    },
    routine: function routine(el, value) {
      value = !!value;

      if (value !== this.customData.attached) {
        if (value) {
          if (!this.customData.nested) {
            this.customData.nested = new _view.View(el, this.view.models, this.view.options);
            this.customData.nested.bind();
          }

          if (!this.marker || !this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }

          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          this.customData.attached = true;
        } else {
          if (!el.parentNode) {
            throw new Error('Element has no parent node');
          }

          el.parentNode.removeChild(el);
          this.customData.attached = false;
        }
      }
    },
    update: function update(models) {
      if (this.customData.nested) {
        this.customData.nested.update(models);
      }
    }
  }
};
exports.binders = binders;
var _default = binders;
exports.default = _default;

/***/ }),

/***/ "./src/binding.ts":
/*!************************!*\
  !*** ./src/binding.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binding = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

var _attributes = __webpack_require__(/*! ./attributes */ "./src/attributes.ts");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
var FORMATTER_SPLIT = /\s+/;

/**
 * TODO move to utils
 * @param el
 */
function getInputValue(el) {
  var results = [];

  if (el.type === 'checkbox') {
    return el.checked;
  } else if (el.type === 'select-multiple') {
    var options = el.options;

    for (var _key in options) {
      if (options.hasOwnProperty(_key)) {
        var option = options[_key];

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


var Binding =
/*#__PURE__*/
function () {
  /**
   * Name of the binder without the prefix
   */

  /**
   * statics values (PRIMITIVE Attributes)
   */

  /**
   * keypath values (KEYPATH Attributes)
   */

  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */

  /**
   * 
   */

  /**
   * HTML Comment to mark a binding in the DOM
   */

  /**
   * Used in component bindings. TODO e.g. move to ComponentBinding or binders?
   */

  /**
   * just to have a value where we could store custom data
   */

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
  function Binding(view, el, type, keypath, binder, args, formatters) {
    _classCallCheck(this, Binding);

    _defineProperty(this, "observers", {});

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "binder", void 0);

    _defineProperty(this, "formatters", void 0);

    _defineProperty(this, "formatterObservers", void 0);

    _defineProperty(this, "primitives", {});

    _defineProperty(this, "keypaths", {});

    _defineProperty(this, "args", void 0);

    _defineProperty(this, "model", {});

    _defineProperty(this, "marker", void 0);

    _defineProperty(this, "_bound", void 0);

    _defineProperty(this, "customData", void 0);

    this.view = view;
    this.el = el;
    this.type = type;
    this.binder = binder;
    this.args = args;
    this.formatters = formatters;
    this.formatterObservers = {};
    this.model[_attributes.DEFAULT_PROPERTYNAME] = undefined;
    this.customData = {};
    console.log('new binder', this.type);

    if (keypath !== null) {
      this.keypaths[_attributes.DEFAULT_PROPERTYNAME] = keypath;
    } else {
      this.keypaths[_attributes.DEFAULT_PROPERTYNAME] = 'FIXME';
    }
  }
  /**
   * Observes the object keypath
   * @param obj 
   * @param keypath 
   */


  _createClass(Binding, [{
    key: "observe",
    value: function observe(obj, keypath, callback) {
      if (callback) {
        return new _observer.Observer(obj, keypath, callback);
      } else {
        return new _observer.Observer(obj, keypath, this);
      }
    }
  }, {
    key: "parseTarget",
    value: function parseTarget() {
      for (var propertyName in this.keypaths) {
        if (this.keypaths.hasOwnProperty(propertyName)) {
          var keypath = this.keypaths[propertyName];

          if (keypath) {
            var token = (0, _parsers.parseType)(keypath);

            if (token.type === _attributes.PRIMITIVE) {
              this.primitives[propertyName] = token.value;
            } else if (token.type === _attributes.KEYPATH) {
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

  }, {
    key: "getIterationAlias",
    value: function getIterationAlias(modelName) {
      return '%' + modelName + '%';
    }
  }, {
    key: "parseFormatterArguments",
    value: function parseFormatterArguments(args, formatterIndex) {
      var _this = this;

      return args.map(_parsers.parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === _attributes.PRIMITIVE) {
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === _attributes.KEYPATH) {
          // keypath is string
          var keypath = value;

          if (!_this.formatterObservers[formatterIndex]) {
            _this.formatterObservers[formatterIndex] = {};
          }

          var observer = _this.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this.observe(_this.view.models, keypath);
            _this.formatterObservers[formatterIndex][ai] = observer;
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

  }, {
    key: "formattedValue",
    value: function formattedValue(value) {
      var _this2 = this;

      if (this.formatters === null) {
        // throw new Error('formatters is null');
        return value;
      }

      return this.formatters.reduce(function (result, declaration, index) {
        var args = declaration.match(FORMATTER_ARGS);

        if (args === null) {
          throw new Error('No args matched from FORMATTER_ARGS');
        }

        var id = args.shift();

        if (!id) {
          throw new Error('No id found in args');
        }

        var formatter = _this2.view.options.formatters[id];

        var processedArgs = _this2.parseFormatterArguments(args, index);

        if (formatter && formatter.read instanceof Function) {
          result = formatter.read.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
        } else if (formatter instanceof Function) {
          result = formatter.apply(void 0, [result].concat(_toConsumableArray(processedArgs)));
        }

        return result;
      }, value);
    }
    /**
     * Returns an event handler for the binding around the supplied function.
     */

  }, {
    key: "eventHandler",
    value: function eventHandler(fn) {
      var _this3 = this;

      var binding = this;
      var handler = binding.view.options.handler;
      return function (ev) {
        if (!handler) {
          throw new Error('No handler defined in binding.view.options.handler');
        }

        handler.call(fn, _this3, ev, binding);
      };
    }
    /**
     * Sets the value for the binding. This Basically just runs the binding routine
     * with the supplied value formatted.
     */

  }, {
    key: "set",
    value: function set(value) {
      var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _attributes.DEFAULT_PROPERTYNAME;

      if (value instanceof Function && !this.binder.function) {
        value = value;
        value = this.formattedValue(value.call(this.model[propertyName]));
      } else {
        value = value;
        value = this.formattedValue(value);
      }

      var routineFn;

      if (this.binder === null) {
        throw new Error('binder is null');
      }

      if (this.binder.hasOwnProperty('routine')) {
        this.binder = this.binder;
        routineFn = this.binder.routine;
      } else {
        this.binder = this.binder;
        routineFn = this.binder;
      }

      if (routineFn instanceof Function) {
        routineFn.call(this, this.el, value);
      }
    }
    /**
     * Syncs up the view binding with the model.
     */

  }, {
    key: "sync",
    value: function sync() {
      for (var propertyName in this.observers) {
        if (this.observers.hasOwnProperty(propertyName)) {
          var observer = this.observers[propertyName];

          if (observer) {
            this.model[propertyName] = observer.target;
            this.set(observer.value(), propertyName);
          } else {
            var primitive = this.primitives[propertyName];
            this.set(primitive, propertyName);
          }
        }
      }
    }
    /**
     * Publishes the value currently set on the input element back to the model.
     */

  }, {
    key: "publish",
    value: function publish() {
      var _this4 = this;

      if (this.observers) {
        if (this.formatters === null) {
          throw new Error('formatters is null');
        }

        for (var propertyName in this.observers) {
          if (this.observers.hasOwnProperty(propertyName)) {
            var observer = this.observers[propertyName];
            var value = this.formatters.reduceRight(function (result, declaration, index) {
              var args = declaration.split(FORMATTER_SPLIT);
              var id = args.shift();

              if (!id) {
                throw new Error('id not defined');
              }

              var formatter = _this4.view.options.formatters[id];

              var processedArgs = _this4.parseFormatterArguments(args, index);

              if (formatter && formatter.publish) {
                result = formatter.publish.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
              }

              return result;
            }, this.getValue(this.el));
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

  }, {
    key: "bind",
    value: function bind() {
      this.parseTarget();

      if (this.binder && this.binder.hasOwnProperty('bind')) {
        this.binder = this.binder;

        if (!this.binder.bind && typeof this.binder.bind !== 'function') {
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

  }, {
    key: "unbind",
    value: function unbind() {
      var _this5 = this;

      if (this.binder === null) {
        throw new Error('binder is null');
      }

      if (this.binder.hasOwnProperty('bind')) {
        this.binder = this.binder;

        if (this.binder.unbind) {
          this.binder.unbind.call(this, this.el);
        }
      }

      if (this.observers) {
        for (var propertyName in this.observers) {
          if (this.observers.hasOwnProperty(propertyName)) {
            var observer = this.observers[propertyName];
            observer.unobserve();
          }
        }
      }

      Object.keys(this.formatterObservers).forEach(function (fi) {
        var args = _this5.formatterObservers[fi];
        Object.keys(args).forEach(function (ai) {
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

  }, {
    key: "update",
    value: function update() {
      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.observers) {
        for (var propertyName in this.observers) {
          if (this.observers.hasOwnProperty(propertyName)) {
            var observer = this.observers[propertyName];
            this.model[propertyName] = observer.target; // this.model = observer.target;
          }
        }
      }

      if (this.binder === null) {
        throw new Error('binder is null');
      }

      if (this.binder.hasOwnProperty('update')) {
        this.binder = this.binder;

        if (this.binder.update) {
          this.binder.update.call(this, models);
        }
      }
    }
    /**
     * Returns elements value
     * @param el 
     */

  }, {
    key: "getValue",
    value: function getValue(el) {
      if (this.binder === null) {
        throw new Error('binder is null');
      }

      if (this.binder.hasOwnProperty('getValue')) {
        this.binder = this.binder;

        if (typeof this.binder.getValue !== 'function') {
          throw new Error('getValue is not a function');
        }

        return this.binder.getValue.call(this, el);
      } else {
        return getInputValue(el);
      }
    }
  }]);

  return Binding;
}();

exports.Binding = Binding;

/***/ }),

/***/ "./src/component-binding.ts":
/*!**********************************!*\
  !*** ./src/component-binding.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBinding = void 0;

var _tinybind = __webpack_require__(/*! ./tinybind */ "./src/tinybind.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _attributes = __webpack_require__(/*! ./attributes */ "./src/attributes.ts");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeObject = function mergeObject(target, obj) {
  if (obj) {
    Object.keys(obj).forEach(function (key) {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }

  return target;
};

/**
 * component view encapsulated as a binding within it's parent view.
 */
var ComponentBinding =
/*#__PURE__*/
function (_Binding) {
  _inherits(ComponentBinding, _Binding);

  /**
   * statics values (PRIMITIVE Attributes)
   */

  /**
   * keypath values (KEYPATH Attributes)
   */

  /**
   * Initializes a component binding for the specified view. The raw component
   * element is passed in along with the component type. Attributes and scope
   * inflections are determined based on the components defined attributes.
   * @param view 
   * @param el 
   * @param type 
   */
  function ComponentBinding(view, el, type) {
    var _this;

    _classCallCheck(this, ComponentBinding);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentBinding).call(this, view, el, type, null, null, null, null));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "view", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentView", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "el", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "type", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "component", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "primitives", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keypaths", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observers", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindingPrefix", _tinybind.tinybind._fullPrefix);

    _this.view = view;
    _this.el = el;
    _this.type = type;
    _this.component = view.options.components[_this.type];
    _this.primitives = {};
    _this.observers = {};

    _this.parseTarget();

    return _this;
  }

  _createClass(ComponentBinding, [{
    key: "parseTarget",
    value: function parseTarget() {
      // parse component attributes
      for (var i = 0, len = this.el.attributes.length; i < len; i++) {
        var attribute = this.el.attributes[i]; // if attribute starts not with binding prefix. E.g. rv-

        if (attribute.name.indexOf(this.bindingPrefix) !== 0) {
          var propertyName = this.camelCase(attribute.name);
          var token = (0, _parsers.parseType)(attribute.value);

          if (token.type === _attributes.PRIMITIVE) {
            this.primitives[propertyName] = token.value;
          } else if (token.type === _attributes.KEYPATH) {
            this.keypaths[propertyName] = attribute.value;
            this.observers[propertyName] = this.observe(this.view.models, this.keypaths[propertyName], this);
            this.model[propertyName] = this.observers[propertyName].target;
          } else {
            throw new Error('can\'t parse component attribute');
          }
        }
      }
    }
    /**
     * Intercepts `tinybind.Binding::sync` since component bindings are not bound to
     * a particular model to update it's value.
     */

  }, {
    key: "sync",
    value: function sync() {}
    /**
     * Intercepts `tinybind.Binding::update` since component bindings are not bound
     * to a particular model to update it's value.
     */

  }, {
    key: "update",
    value: function update() {}
    /**
     * Intercepts `tinybind.Binding::publish` since component bindings are not bound
     * to a particular model to update it's value.
     */

  }, {
    key: "publish",
    value: function publish() {}
    /**
     * Returns an object map using the component's scope inflections.
     */

  }, {
    key: "locals",
    value: function locals() {
      var _this2 = this;

      var result = {};
      Object.keys(this.primitives).forEach(function (key) {
        result[key] = _this2.formattedValue(_this2.primitives[key]);
        result[key] = _this2.primitives[key];
      });
      Object.keys(this.observers).forEach(function (key) {
        result[key] = _this2.observers[key].target;
      });
      return result;
    }
    /**
     * Returns a camel-cased version of the string. Used when translating an
     * element's attribute name into a property name for the component's scope.
     * TODO move to utils
     * @param string 
     */

  }, {
    key: "camelCase",
    value: function camelCase(string) {
      return string.replace(/-([a-z])/g, function (grouped) {
        return grouped[1].toUpperCase();
      });
    }
  }, {
    key: "getMergedOptions",
    value: function getMergedOptions() {
      var options = {
        // EXTENSIONS
        binders: Object.create(null),
        formatters: Object.create(null),
        components: Object.create(null),
        adapters: Object.create(null)
      };
      mergeObject(options.binders, this.component.binders);
      mergeObject(options.formatters, this.component.formatters);
      mergeObject(options.components, this.component.components);
      mergeObject(options.adapters, this.component.adapters);
      mergeObject(options.binders, this.view.options.binders);
      mergeObject(options.formatters, this.view.options.formatters);
      mergeObject(options.components, this.view.options.components);
      mergeObject(options.adapters, this.view.options.adapters);
      options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix;
      options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters;
      options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface;
      options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData;
      options.handler = this.component.handler ? this.component.handler : this.view.options.handler;
      return options;
    }
    /**
     * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
     * map of models from the root view. Bind `this.componentView` on subsequent calls.
     */

  }, {
    key: "bind",
    value: function bind() {
      if (!this.componentView) {
        this.el.innerHTML = this.component.template.call(this);
        /**
         * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
         */

        var scope = this.component.initialize.call(this, this.el, this.locals());
        this.componentView = _tinybind.tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, this.getMergedOptions());
      } else {
        this.componentView.bind();
      }
    }
    /**
     * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this3 = this;

      Object.keys(this.observers).forEach(function (key) {
        _this3.observers[key].unobserve();
      });

      if (this.componentView) {
        this.componentView.unbind.call(this);
      }
    }
  }]);

  return ComponentBinding;
}(_binding.Binding);

exports.ComponentBinding = ComponentBinding;

/***/ }),

/***/ "./src/formatters.ts":
/*!***************************!*\
  !*** ./src/formatters.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatters = void 0;
var formatters = {};
exports.formatters = formatters;

formatters.not = function (value) {
  return !value;
};

/***/ }),

/***/ "./src/observer.ts":
/*!*************************!*\
  !*** ./src/observer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Check if a value is an object than can be observed.
function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
} // Error thrower.


function error(message) {
  throw new Error('[Observer] ' + message);
} // TODO


var adapters;
var interfaces;
var rootInterface;

var Observer =
/*#__PURE__*/
function () {
  /**
   * Constructs a new keypath observer and kicks things off.
   * @param obj 
   * @param keypath 
   * @param callback 
   */
  function Observer(obj, keypath, callback) {
    _classCallCheck(this, Observer);

    _defineProperty(this, "keypath", void 0);

    _defineProperty(this, "callback", void 0);

    _defineProperty(this, "objectPath", void 0);

    _defineProperty(this, "obj", void 0);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "tokens", void 0);

    this.keypath = keypath;
    this.callback = callback;
    this.objectPath = [];
    var parseResult = this.parse();
    this.key = parseResult.key;
    this.tokens = parseResult.tokens;
    this.obj = this.getRootObject(obj);
    this.target = this.realize();

    if (isObject(this.target)) {
      this.set(true, this.key, this.target, this.callback);
    }
  }

  _createClass(Observer, [{
    key: "parse",

    /**
     * Parses the keypath using the interfaces defined on the view. Sets variables
     * for the tokenized keypath as well as the end key.
     */
    value: function parse() {
      var path;
      var root;

      if (!interfaces.length) {
        error('Must define at least one adapter interface.');
      }

      if (!!~interfaces.indexOf(this.keypath[0])) {
        root = this.keypath[0];
        path = this.keypath.substr(1);
      } else {
        root = rootInterface;
        path = this.keypath;
      }

      this.tokens = Observer.tokenize(path, root);

      if (!this.tokens.length) {
        throw new Error('no tokens');
      }

      this.key = this.tokens.pop();
      return {
        key: this.key,
        tokens: this.tokens
      };
    }
    /**
     * Realizes the full keypath, attaching observers for every key and correcting
     * old observers to any changed objects in the keypath.
     */

  }, {
    key: "realize",
    value: function realize() {
      var current = this.obj;
      var unreached = -1;
      var prev;
      var token;

      for (var index = 0; index < this.tokens.length; index++) {
        token = this.tokens[index];

        if (isObject(current)) {
          if (typeof this.objectPath[index] !== 'undefined') {
            if (current !== (prev = this.objectPath[index])) {
              this.set(false, token, prev, this);
              this.set(true, token, current, this);
              this.objectPath[index] = current;
            }
          } else {
            this.set(true, token, current, this);
            this.objectPath[index] = current;
          }

          current = this.get(token, current);
        } else {
          if (unreached === -1) {
            unreached = index;
          }

          if (prev = this.objectPath[index]) {
            this.set(false, token, prev, this);
          }
        }
      }

      if (unreached !== -1) {
        this.objectPath.splice(unreached);
      }

      return current;
    }
    /**
     * Updates the keypath. This is called when any intermediary key is changed.
     */

  }, {
    key: "sync",
    value: function sync() {
      var next, oldValue, newValue;

      if ((next = this.realize()) !== this.target) {
        if (isObject(this.target)) {
          this.set(false, this.key, this.target, this.callback);
        }

        if (isObject(next)) {
          this.set(true, this.key, next, this.callback);
        }

        oldValue = this.value();
        this.target = next;
        newValue = this.value();
        if (newValue !== oldValue || newValue instanceof Function) this.callback.sync();
      } else if (next instanceof Array) {
        this.callback.sync();
      }
    } // Reads the current end value of the observed keypath. Returns undefined if
    // the full keypath is unreachable.

  }, {
    key: "value",
    value: function value() {
      if (isObject(this.target)) {
        return this.get(this.key, this.target);
      }
    } // Sets the current end value of the observed keypath. Calling setValue when
    // the full keypath is unreachable is a no-op.

  }, {
    key: "setValue",
    value: function setValue(value) {
      if (isObject(this.target)) {
        adapters[this.key.i].set(this.target, this.key.path, value);
      }
    }
    /**
     * Gets the provided key on an object.
     * @param key 
     * @param obj 
     */

  }, {
    key: "get",
    value: function get(key, obj) {
      return adapters[key.i].get(obj, key.path);
    }
    /**
     * Observes or unobserves a callback on the object using the provided key.
     * @param active 
     * @param key 
     * @param obj 
     * @param callback 
     */

  }, {
    key: "set",
    value: function set(active, key, obj, callback) {
      if (active) {
        adapters[key.i].observe(obj, key.path, callback);
      } else {
        adapters[key.i].unobserve(obj, key.path, callback);
      }
    }
    /**
     * Unobserves the entire keypath.
     */

  }, {
    key: "unobserve",
    value: function unobserve() {
      var obj;
      var token;

      for (var index = 0; index < this.tokens.length; index++) {
        token = this.tokens[index];

        if (obj = this.objectPath[index]) {
          this.set(false, token, obj, this);
        }
      }

      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback);
      }
    } // traverse the scope chain to find the scope which has the root property
    // if the property is not found in chain, returns the root scope

  }, {
    key: "getRootObject",
    value: function getRootObject(obj) {
      var rootProp, current;

      if (!obj.$parent) {
        return obj;
      }

      if (this.tokens.length) {
        rootProp = this.tokens[0].path;
      } else {
        rootProp = this.key.path;
      }

      current = obj;

      while (current.$parent && current[rootProp] === undefined) {
        current = current.$parent;
      }

      return current;
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;

_defineProperty(Observer, "updateOptions", function (options) {
  adapters = options.adapters;
  interfaces = Object.keys(adapters);
  rootInterface = options.rootInterface;
});

_defineProperty(Observer, "tokenize", function (keypath, root) {
  var tokens = [];
  var current = {
    i: root,
    path: ''
  };
  var index;
  var chr;

  for (index = 0; index < keypath.length; index++) {
    chr = keypath.charAt(index);

    if (!!~interfaces.indexOf(chr)) {
      tokens.push(current);
      current = {
        i: chr,
        path: ''
      };
    } else {
      current.path += chr;
    }
  }

  tokens.push(current);
  return tokens;
});

/***/ }),

/***/ "./src/parsers.ts":
/*!************************!*\
  !*** ./src/parsers.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJson = isJson;
exports.parseType = parseType;
exports.parseTemplate = parseTemplate;

var _attributes = __webpack_require__(/*! ./attributes */ "./src/attributes.ts");

var QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '
// Used in parsers.parseTemplate

var TEXT = 0;
var BINDING = 1; // Test if string is a json string

function isJson(str) {
  try {
    var val = JSON.parse(str);
    return val instanceof Array || val instanceof Object ? true : false;
  } catch (error) {
    return false;
  }
} // Parser and tokenizer for getting the type and value from a string.


function parseType(string) {
  var type = _attributes.PRIMITIVE;
  var value = string;

  if (typeof string === 'undefined') {
    return {
      type: type,
      value: undefined
    };
  }

  if (QUOTED_STR.test(string)) {
    value = string.slice(1, -1);
  } else if (string === 'true') {
    value = true;
  } else if (string === 'false') {
    value = false;
  } else if (string === 'null') {
    value = null;
  } else if (string === 'undefined') {
    value = undefined;
  } else if (!isNaN(Number(string))) {
    value = Number(string);
  } else if (isJson(string)) {
    value = JSON.parse(string);
  } else {
    type = _attributes.KEYPATH;
  }

  return {
    type: type,
    value: value
  };
}

// Template parser and tokenizer for mustache-style text content bindings.
// Parses the template and returns a set of tokens, separating static portions
// of text from binding declarations.
function parseTemplate(template, delimiters) {
  var tokens = null;
  var length = template.length;
  var index = 0;
  var lastIndex = 0;
  var open = delimiters[0],
      close = delimiters[1];

  while (lastIndex < length) {
    index = template.indexOf(open, lastIndex);

    if (index < 0) {
      if (tokens) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex)
        });
      }

      break;
    } else {
      tokens = tokens || [];

      if (index > 0 && lastIndex < index) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex, index)
        });
      }

      lastIndex = index + open.length;
      index = template.indexOf(close, lastIndex);

      if (index < 0) {
        var substring = template.slice(lastIndex - close.length);
        var lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === TEXT) {
          lastToken.value += substring;
        } else {
          tokens.push({
            type: TEXT,
            value: substring
          });
        }

        break;
      }

      var _value = template.slice(lastIndex, index).trim();

      tokens.push({
        type: BINDING,
        value: _value
      });
      lastIndex = index + close.length;
    }
  }

  return tokens;
}

/***/ }),

/***/ "./src/tinybind.ts":
/*!*************************!*\
  !*** ./src/tinybind.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.tinybind = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _formatters = __webpack_require__(/*! ./formatters */ "./src/formatters.ts");

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.ts"));

var _binders = __webpack_require__(/*! ./binders */ "./src/binders.ts");

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO move to uitils
var mergeObject = function mergeObject(target, obj) {
  if (obj) {
    Object.keys(obj).forEach(function (key) {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }

  return target;
};

var tinybind = {
  // Global binders.
  binders: _binders.binders,
  // Global components.
  components: {},
  // Global formatters.
  formatters: _formatters.formatters,
  // Global sightglass adapters.
  adapters: {
    '.': _adapter.default
  },
  // Default attribute prefix.
  _prefix: 'rv',
  _fullPrefix: 'rv-',

  get prefix() {
    return this._prefix;
  },

  set prefix(value) {
    this._prefix = value;
    this._fullPrefix = value + '-';
  },

  parseTemplate: _parsers.parseTemplate,
  parseType: _parsers.parseType,
  // Default template delimiters.
  templateDelimiters: ['{', '}'],
  // Default sightglass root interface.
  rootInterface: '.',
  // Preload data by default.
  preloadData: true,

  /**
   * Default event handler.
   * TODO is this used?
   */
  handler: function handler(
  /* TODO CHECME */
  context, ev, binding) {
    // console.warn('yes it is used');
    this.call(context, ev, binding.view.models);
  },

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  fallbackBinder: function fallbackBinder(el, value) {
    if (!this.type) {
      throw new Error('Can\'t set atttribute of ' + this.type);
    }

    if (value != null) {
      el.setAttribute(this.type, value);
    } else {
      el.removeAttribute(this.type);
    }
  },

  /**
   * Merges an object literal into the corresponding global options.
   * @param options 
   */
  configure: function configure(options) {
    var _this = this;

    if (!options) {
      return;
    }

    Object.keys(options).forEach(function (option) {
      var value = options[option];

      switch (option) {
        case 'binders':
          mergeObject(_this.binders, value);
          break;

        case 'formatters':
          mergeObject(_this.formatters, value);
          break;

        case 'components':
          mergeObject(_this.components, value);
          break;

        case 'adapters':
          mergeObject(_this.adapters, value);
          break;

        case 'adapter':
          mergeObject(_this.adapters, value);
          break;

        case 'prefix':
          _this.prefix = value;
          break;

        case 'parseTemplate':
          _this.parseTemplate = value;
          break;

        case 'parseType':
          _this.parseType = value;
          break;

        case 'prefix':
          _this.prefix = value;
          break;

        case 'templateDelimiters':
          _this.templateDelimiters = value;
          break;

        case 'rootInterface':
          _this.rootInterface = value;
          break;

        case 'preloadData':
          _this.preloadData = value;
          break;

        default:
          console.warn('Option not supported', option, value);
          break;
      }
    });
  },
  // Initializes a new instance of a component on the specified element and
  // returns a tinybind.View instance.	
  init: function init(componentKey, el) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!el) {
      el = document.createElement('div');
    }

    var component = tinybind.components[componentKey];
    el.innerHTML = component.template.call(tinybind, el);
    var scope = component.initialize.call(tinybind, el, data);
    var view = tinybind.bind(el, scope);
    view.bind();
    return view;
  },
  // Binds some data to a template / element. Returns a tinybind.View instance.
  bind: function bind(el, models, options) {
    var viewOptions = {
      // EXTENSIONS
      binders: Object.create(null),
      formatters: Object.create(null),
      components: Object.create(null),
      adapters: Object.create(null),
      // other
      starBinders: Object.create(null),
      // sightglass
      rootInterface: Object.create(null)
    };
    models = models || Object.create(null); // options = options || {};

    if (options) {
      mergeObject(viewOptions.binders, options.binders);
      mergeObject(viewOptions.formatters, options.formatters);
      mergeObject(viewOptions.components, options.components);
      mergeObject(viewOptions.adapters, options.adapters);
    }

    viewOptions.prefix = options && options.prefix ? options.prefix : tinybind.prefix;
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters;
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : tinybind.rootInterface;
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : tinybind.preloadData;
    viewOptions.handler = options && options.handler ? options.handler : tinybind.handler; // merge extensions

    mergeObject(viewOptions.binders, tinybind.binders);
    mergeObject(viewOptions.formatters, tinybind.formatters);
    mergeObject(viewOptions.components, tinybind.components);
    mergeObject(viewOptions.adapters, tinybind.adapters); // get all starBinders from available binders

    viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
      return key.indexOf('*') > 0;
    });

    _observer.Observer.updateOptions(viewOptions);

    var view = new _view.View(el, models, viewOptions);
    view.bind();
    return view;
  }
};
exports.tinybind = tinybind;
var _default = tinybind;
exports.default = _default;

/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _tinybind = __webpack_require__(/*! ./tinybind */ "./src/tinybind.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _componentBinding = __webpack_require__(/*! ./component-binding */ "./src/component-binding.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var textBinder = {
  routine: function routine(node, value) {
    node.data = value != null ? value : '';
  }
};
var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

var parseNode = function parseNode(view, node) {
  var block = false; // if node.nodeType === Node.TEXT_NODE

  node = node;

  if (node.nodeType === 3) {
    if (!node.data) {
      throw new Error('node has no data');
    }

    var tokens = (0, _parsers.parseTemplate)(node.data, _tinybind.tinybind.templateDelimiters);

    if (tokens) {
      if (!node.parentNode) {
        throw new Error('Node has no parent node');
      }

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var text = document.createTextNode(token.value);
        node.parentNode.insertBefore(text, node);

        if (token.type === 1) {
          view.buildBinding(text, null, token.value, textBinder, null);
        }
      }

      node.parentNode.removeChild(node);
    }

    block = true;
  } else if (node.nodeType === 1) {
    block = view.traverse(node);
  }

  if (!block) {
    if (node.childNodes) {
      for (var _i = 0; _i < node.childNodes.length; _i++) {
        parseNode(view, node.childNodes[_i]);
      }
    }
  }
};

var bindingComparator = function bindingComparator(a, b) {
  var aPriority = a.binder ? a.binder.priority || 0 : 0;
  var bPriority = b.binder ? b.binder.priority || 0 : 0;
  return bPriority - aPriority;
};

var trimStr = function trimStr(str) {
  return str.trim();
}; // A collection of bindings built from a set of parent nodes.


var View =
/*#__PURE__*/
function () {
  // The DOM elements and the model objects for binding are passed into the
  // constructor along with any local options that should be used throughout the
  // context of the view and it's bindings.
  function View(els, models, options) {
    _classCallCheck(this, View);

    _defineProperty(this, "els", void 0);

    _defineProperty(this, "models", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "bindings", []);

    _defineProperty(this, "componentView", null);

    if (els instanceof Array) {
      this.els = els;
    } else {
      this.els = [els];
    }

    console.log('view options', options);
    this.models = models;
    this.options = options;
    this.build();
  }

  _createClass(View, [{
    key: "buildBinding",
    value: function buildBinding(node, type, declaration, binder, args) {
      var matches = declaration.match(DECLARATION_SPLIT);

      if (matches === null) {
        throw new Error('no matches');
      }

      var pipes = matches.map(trimStr);
      var keypath = pipes.shift() || null;
      this.bindings.push(new _binding.Binding(this, node, type, keypath, binder, args, pipes));
    } // Parses the DOM tree and builds `Binding` instances for every matched
    // binding declaration.

  }, {
    key: "build",
    value: function build() {
      this.bindings = [];
      var elements = this.els,
          i,
          len;

      for (i = 0, len = elements.length; i < len; i++) {
        parseNode(this, elements[i]);
      }

      this.bindings.sort(bindingComparator);
    }
  }, {
    key: "traverse",
    value: function traverse(node) {
      var bindingPrefix = _tinybind.tinybind._fullPrefix;
      var block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
      var attributes = node.attributes;
      var bindInfos = [];
      var starBinders = this.options.starBinders;
      var type, binder, identifier, args;

      for (var i = 0, len = attributes.length; i < len; i++) {
        var attribute = attributes[i]; // if attribute starts with the binding prefix. E.g. rv

        if (attribute.name.indexOf(bindingPrefix) === 0) {
          type = attribute.name.slice(bindingPrefix.length);
          binder = this.options.binders[type];
          args = [];

          if (!binder) {
            for (var k = 0; k < starBinders.length; k++) {
              identifier = starBinders[k];

              if (type.slice(0, identifier.length - 1) === identifier.slice(0, -1)) {
                binder = this.options.binders[identifier];
                args.push(type.slice(identifier.length - 1));
                break;
              }
            }
          }

          if (!binder) {
            binder = _tinybind.tinybind.fallbackBinder;
          }

          if (binder.block) {
            this.buildBinding(node, type, attribute.value, binder, args);
            node.removeAttribute(attribute.name);
            return true;
          }

          bindInfos.push({
            attr: attribute,
            binder: binder,
            type: type,
            args: args
          });
        }
      }

      for (var _i2 = 0; _i2 < bindInfos.length; _i2++) {
        var bindInfo = bindInfos[_i2];
        this.buildBinding(node, bindInfo.type, bindInfo.attr.value, bindInfo.binder, bindInfo.args);
        node.removeAttribute(bindInfo.attr.name);
      } // bind components


      if (!block) {
        type = node.nodeName.toLowerCase();

        if (this.options.components[type] && !node._bound) {
          this.bindings.push(new _componentBinding.ComponentBinding(this, node, type));
          block = true;
        }
      }

      return block;
    } // Binds all of the current bindings for this view.

  }, {
    key: "bind",
    value: function bind() {
      this.bindings.forEach(function (binding) {
        binding.bind();
      });
    } // Unbinds all of the current bindings for this view.

  }, {
    key: "unbind",
    value: function unbind() {
      if (Array.isArray(this.bindings)) {
        this.bindings.forEach(function (binding) {
          binding.unbind();
        });
      }

      if (this.componentView) {
        this.componentView.unbind();
      }
    } // Syncs up the view with the model by running the routines on all bindings.

  }, {
    key: "sync",
    value: function sync() {
      this.bindings.forEach(function (binding) {
        binding.sync();
      });
    } // Publishes the input values from the view back to the model (reverse sync).

  }, {
    key: "publish",
    value: function publish() {
      this.bindings.forEach(function (binding) {
        if (binding.binder && binding.binder.publishes) {
          binding.publish();
        }
      });
    } // Updates the view's models along with any affected bindings.

  }, {
    key: "update",
    value: function update() {
      var _this = this;

      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.keys(models).forEach(function (key) {
        _this.models[key] = models[key];
      });
      this.bindings.forEach(function (binding) {
        if (binding.update) {
          binding.update(models);
        }
      });
    }
  }]);

  return View;
}();

exports.View = View;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9hdHRyaWJ1dGVzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRlcnMudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYmluZGluZy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9jb21wb25lbnQtYmluZGluZy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9mb3JtYXR0ZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL29ic2VydmVyLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3BhcnNlcnMudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdGlueWJpbmQudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdmlldy50cyJdLCJuYW1lcyI6WyJBUlJBWV9NRVRIT0RTIiwiQWRhcHRlciIsIm9iaiIsImhhc093blByb3BlcnR5IiwiaWQiLCJjb3VudGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIndlYWttYXAiLCJfX3J2IiwiY2FsbGJhY2tzIiwicmVmIiwia2V5cyIsImxlbmd0aCIsInBvaW50ZXJzIiwiZm4iLCJvcmlnaW5hbCIsIm1hcCIsIndlYWtSZWZlcmVuY2UiLCJhcmdzIiwicmVzcG9uc2UiLCJhcHBseSIsImZvckVhY2giLCJrIiwiciIsIkFycmF5IiwiY2FsbGJhY2siLCJzeW5jIiwia2V5cGF0aCIsInN0dWJGdW5jdGlvbiIsImluZGV4T2YiLCJwdXNoIiwiaWR4Iiwic3BsaWNlIiwiY2xlYW51cFdlYWtSZWZlcmVuY2UiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0Iiwic2V0IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIm5ld1ZhbHVlIiwidW5vYnNlcnZlTXV0YXRpb25zIiwiY2IiLCJvYnNlcnZlTXV0YXRpb25zIiwiYWRhcHRlciIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJERUZBVUxUX1BST1BFUlRZTkFNRSIsImdldFN0cmluZyIsInRvU3RyaW5nIiwidW5kZWZpbmVkIiwidGltZXMiLCJuIiwiaSIsImNyZWF0ZVZpZXciLCJiaW5kaW5nIiwibW9kZWxzIiwiYW5jaG9yRWwiLCJ0ZW1wbGF0ZSIsImVsIiwiY2xvbmVOb2RlIiwidmlldyIsIlZpZXciLCJvcHRpb25zIiwiYmluZCIsIm1hcmtlciIsInBhcmVudE5vZGUiLCJFcnJvciIsImluc2VydEJlZm9yZSIsImJpbmRlcnMiLCJmdW5jdGlvbiIsInByaW9yaXR5IiwiY3VzdG9tRGF0YSIsImhhbmRsZXIiLCJ1bmJpbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicm91dGluZSIsImV2ZW50SGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJibG9jayIsImRvY3VtZW50IiwiY3JlYXRlQ29tbWVudCIsInR5cGUiLCJpdGVyYXRlZCIsInJlbW92ZUNoaWxkIiwiY29sbGVjdGlvbiIsIm1vZGVsTmFtZSIsImlzQXJyYXkiLCJpbmRleFByb3AiLCJnZXRBdHRyaWJ1dGUiLCJnZXRJdGVyYXRpb25BbGlhcyIsIm1vZGVsIiwiaW5kZXgiLCJzY29wZSIsIiRwYXJlbnQiLCJwcmV2aW91cyIsImVscyIsIm5leHRTaWJsaW5nIiwibWF0Y2hJbmRleCIsIm5leHRWaWV3IiwibmV4dEluZGV4IiwicG9wIiwibm9kZU5hbWUiLCJiaW5kaW5ncyIsInVwZGF0ZSIsImRhdGEiLCJrZXkiLCJlbENsYXNzIiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsInRyaW0iLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJodG1sIiwiY29uc29sZSIsImxvZyIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImtleXBhdGhzIiwiYXR0YWNoZWQiLCJib3VuZCIsIm5lc3RlZCIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJCaW5kaW5nIiwiYmluZGVyIiwiZm9ybWF0dGVycyIsImZvcm1hdHRlck9ic2VydmVycyIsIk9ic2VydmVyIiwicHJvcGVydHlOYW1lIiwidG9rZW4iLCJwcmltaXRpdmVzIiwib2JzZXJ2ZXJzIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJwcmltaXRpdmVWYWx1ZSIsIm9ic2VydmVyIiwicmVkdWNlIiwicmVzdWx0IiwiZGVjbGFyYXRpb24iLCJtYXRjaCIsInNoaWZ0IiwiZm9ybWF0dGVyIiwicHJvY2Vzc2VkQXJncyIsInBhcnNlRm9ybWF0dGVyQXJndW1lbnRzIiwicmVhZCIsIkZ1bmN0aW9uIiwiZXYiLCJjYWxsIiwiZm9ybWF0dGVkVmFsdWUiLCJyb3V0aW5lRm4iLCJwcmltaXRpdmUiLCJyZWR1Y2VSaWdodCIsInNwbGl0IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsInBhcnNlVGFyZ2V0IiwicHJlbG9hZERhdGEiLCJ1bm9ic2VydmUiLCJmaSIsIm1lcmdlT2JqZWN0IiwiQ29tcG9uZW50QmluZGluZyIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJjb21wb25lbnQiLCJjb21wb25lbnRzIiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJiaW5kaW5nUHJlZml4IiwiY2FtZWxDYXNlIiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY3JlYXRlIiwiYWRhcHRlcnMiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJyb290SW50ZXJmYWNlIiwiY29tcG9uZW50VmlldyIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJnZXRNZXJnZWRPcHRpb25zIiwibm90IiwiaXNPYmplY3QiLCJlcnJvciIsIm1lc3NhZ2UiLCJpbnRlcmZhY2VzIiwib2JqZWN0UGF0aCIsInBhcnNlUmVzdWx0IiwicGFyc2UiLCJ0b2tlbnMiLCJnZXRSb290T2JqZWN0IiwicmVhbGl6ZSIsInBhdGgiLCJyb290Iiwic3Vic3RyIiwidG9rZW5pemUiLCJjdXJyZW50IiwidW5yZWFjaGVkIiwicHJldiIsIm5leHQiLCJvbGRWYWx1ZSIsImFjdGl2ZSIsInJvb3RQcm9wIiwiY2hyIiwiY2hhckF0IiwiUVVPVEVEX1NUUiIsIlRFWFQiLCJCSU5ESU5HIiwiaXNKc29uIiwic3RyIiwidmFsIiwiSlNPTiIsInRlc3QiLCJpc05hTiIsIk51bWJlciIsInBhcnNlVGVtcGxhdGUiLCJkZWxpbWl0ZXJzIiwibGFzdEluZGV4Iiwib3BlbiIsImNsb3NlIiwic3Vic3RyaW5nIiwibGFzdFRva2VuIiwiX3ByZWZpeCIsImNvbnRleHQiLCJmYWxsYmFja0JpbmRlciIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbmZpZ3VyZSIsIndhcm4iLCJpbml0IiwiY29tcG9uZW50S2V5IiwiY3JlYXRlRWxlbWVudCIsInZpZXdPcHRpb25zIiwic3RhckJpbmRlcnMiLCJmaWx0ZXIiLCJ1cGRhdGVPcHRpb25zIiwidGV4dEJpbmRlciIsIm5vZGUiLCJERUNMQVJBVElPTl9TUExJVCIsInBhcnNlTm9kZSIsIm5vZGVUeXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJidWlsZEJpbmRpbmciLCJ0cmF2ZXJzZSIsImJpbmRpbmdDb21wYXJhdG9yIiwiYSIsImIiLCJhUHJpb3JpdHkiLCJiUHJpb3JpdHkiLCJ0cmltU3RyIiwiYnVpbGQiLCJtYXRjaGVzIiwicGlwZXMiLCJlbGVtZW50cyIsInNvcnQiLCJiaW5kSW5mb3MiLCJpZGVudGlmaWVyIiwiYXR0ciIsImJpbmRJbmZvIiwidG9Mb3dlckNhc2UiLCJfYm91bmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGdCQUFnQixDQUNwQixNQURvQixFQUVwQixLQUZvQixFQUdwQixPQUhvQixFQUlwQixTQUpvQixFQUtwQixNQUxvQixFQU1wQixTQU5vQixFQU9wQixRQVBvQixDQUF0Qjs7SUEwQ2FDLE87Ozs7OztxQ0FDTyxDOztxQ0FDSixFOzs7OztrQ0FFQUMsRyxFQUFVO0FBQ3RCLFVBQUksQ0FBQ0EsSUFBSUMsY0FBSixDQUFtQixNQUFuQixDQUFMLEVBQWlDO0FBQy9CLFlBQUlDLEtBQUssS0FBS0MsT0FBTCxFQUFUO0FBRUFDLGVBQU9DLGNBQVAsQ0FBc0JMLEdBQXRCLEVBQTJCLE1BQTNCLEVBQW1DO0FBQ2pDTSxpQkFBT0o7QUFEMEIsU0FBbkM7QUFHRDs7QUFFRCxVQUFJLENBQUMsS0FBS0ssT0FBTCxDQUFhUCxJQUFJUSxJQUFqQixDQUFMLEVBQTZCO0FBQzNCLGFBQUtELE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsSUFBeUI7QUFDdkJDLHFCQUFXO0FBRFksU0FBekI7QUFHRDs7QUFFRCxhQUFPLEtBQUtGLE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsQ0FBUDtBQUNEOzs7eUNBRW9CRSxHLEVBQVdSLEUsRUFBWTtBQUMxQyxVQUFJLENBQUNFLE9BQU9PLElBQVAsQ0FBWUQsSUFBSUQsU0FBaEIsRUFBMkJHLE1BQWhDLEVBQXdDO0FBQ3RDLFlBQUksRUFBRUYsSUFBSUcsUUFBSixJQUFnQlQsT0FBT08sSUFBUCxDQUFZRCxJQUFJRyxRQUFoQixFQUEwQkQsTUFBNUMsQ0FBSixFQUF5RDtBQUN2RCxpQkFBTyxLQUFLTCxPQUFMLENBQWFMLEVBQWIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7O2lDQUVZRixHLEVBQVVjLEUsRUFBWTtBQUNqQyxVQUFJQyxXQUFXZixJQUFJYyxFQUFKLENBQWY7QUFDQSxVQUFJRSxNQUFNLEtBQUtDLGFBQUwsQ0FBbUJqQixHQUFuQixDQUFWO0FBQ0EsVUFBSU8sVUFBVSxLQUFLQSxPQUFuQjs7QUFFQVAsVUFBSWMsRUFBSixJQUFVLFlBQXFDO0FBQUEsMENBQWpDSSxJQUFpQztBQUFqQ0EsY0FBaUM7QUFBQTs7QUFDN0MsWUFBSUMsV0FBV0osU0FBU0ssS0FBVCxDQUFlcEIsR0FBZixFQUFvQmtCLElBQXBCLENBQWY7QUFFQWQsZUFBT08sSUFBUCxDQUFZSyxJQUFJSCxRQUFoQixFQUEwQlEsT0FBMUIsQ0FBa0MsYUFBSztBQUNyQyxjQUFJQyxJQUFJTixJQUFJSCxRQUFKLENBQWFVLENBQWIsQ0FBUjs7QUFFQSxjQUFJaEIsUUFBUWdCLENBQVIsQ0FBSixFQUFnQjtBQUNkLGdCQUFJaEIsUUFBUWdCLENBQVIsRUFBV2QsU0FBWCxDQUFxQmEsQ0FBckIsYUFBbUNFLEtBQXZDLEVBQThDO0FBQzVDakIsc0JBQVFnQixDQUFSLEVBQVdkLFNBQVgsQ0FBcUJhLENBQXJCLEVBQXdCRCxPQUF4QixDQUFnQyxVQUFDSSxRQUFELEVBQXFDO0FBQ25FQSx5QkFBU0MsSUFBVDtBQUNELGVBRkQ7QUFHRDtBQUNGO0FBQ0YsU0FWRDtBQVlBLGVBQU9QLFFBQVA7QUFDRCxPQWhCRDtBQWlCRDs7O3FDQUVnQm5CLEcsRUFBVVUsRyxFQUFhaUIsTyxFQUFpQjtBQUFBOztBQUN2RCxVQUFJM0IsZUFBZXdCLEtBQW5CLEVBQTBCO0FBQ3hCLFlBQUlSLE1BQU0sS0FBS0MsYUFBTCxDQUFtQmpCLEdBQW5CLENBQVY7O0FBRUEsWUFBSSxDQUFDZ0IsSUFBSUgsUUFBVCxFQUFtQjtBQUNqQkcsY0FBSUgsUUFBSixHQUFlLEVBQWY7QUFFQWYsd0JBQWN1QixPQUFkLENBQXNCLGNBQU07QUFDMUIsa0JBQUtPLFlBQUwsQ0FBa0I1QixHQUFsQixFQUF1QmMsRUFBdkI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsWUFBSSxDQUFDRSxJQUFJSCxRQUFKLENBQWFILEdBQWIsQ0FBTCxFQUF3QjtBQUN0Qk0sY0FBSUgsUUFBSixDQUFhSCxHQUFiLElBQW9CLEVBQXBCO0FBQ0Q7O0FBRUQsWUFBSU0sSUFBSUgsUUFBSixDQUFhSCxHQUFiLEVBQWtCbUIsT0FBbEIsQ0FBMEJGLE9BQTFCLE1BQXVDLENBQUMsQ0FBNUMsRUFBK0M7QUFDN0NYLGNBQUlILFFBQUosQ0FBYUgsR0FBYixFQUFrQm9CLElBQWxCLENBQXVCSCxPQUF2QjtBQUNEO0FBQ0Y7QUFDRjs7O3VDQUVrQjNCLEcsRUFBZVUsRyxFQUFhaUIsTyxFQUFpQjtBQUM5RCxVQUFLM0IsZUFBZXdCLEtBQWhCLElBQTJCeEIsSUFBSVEsSUFBSixJQUFZLElBQTNDLEVBQWtEO0FBQ2hELFlBQUlRLE1BQU0sS0FBS1QsT0FBTCxDQUFhUCxJQUFJUSxJQUFqQixDQUFWOztBQUVBLFlBQUlRLEdBQUosRUFBUztBQUNQLGNBQUlILFlBQVdHLElBQUlILFFBQUosQ0FBYUgsR0FBYixDQUFmOztBQUVBLGNBQUlHLFNBQUosRUFBYztBQUNaLGdCQUFJa0IsTUFBTWxCLFVBQVNnQixPQUFULENBQWlCRixPQUFqQixDQUFWOztBQUVBLGdCQUFJSSxNQUFNLENBQUMsQ0FBWCxFQUFjO0FBQ1psQix3QkFBU21CLE1BQVQsQ0FBZ0JELEdBQWhCLEVBQXFCLENBQXJCO0FBQ0Q7O0FBRUQsZ0JBQUksQ0FBQ2xCLFVBQVNELE1BQWQsRUFBc0I7QUFDcEIscUJBQU9JLElBQUlILFFBQUosQ0FBYUgsR0FBYixDQUFQO0FBQ0Q7O0FBRUQsaUJBQUt1QixvQkFBTCxDQUEwQmpCLEdBQTFCLEVBQStCaEIsSUFBSVEsSUFBbkM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7OzRCQUVPUixHLEVBQVUyQixPLEVBQWlCRixRLEVBQWlDO0FBQUE7O0FBQ2xFLFVBQUluQixLQUFKO0FBQ0EsVUFBSUcsWUFBWSxLQUFLUSxhQUFMLENBQW1CakIsR0FBbkIsRUFBd0JTLFNBQXhDOztBQUVBLFVBQUksQ0FBQ0EsVUFBVWtCLE9BQVYsQ0FBTCxFQUF5QjtBQUN2QmxCLGtCQUFVa0IsT0FBVixJQUFxQixFQUFyQjtBQUNBLFlBQUlPLE9BQU85QixPQUFPK0Isd0JBQVAsQ0FBZ0NuQyxHQUFoQyxFQUFxQzJCLE9BQXJDLENBQVg7O0FBRUEsWUFBSSxDQUFDTyxJQUFELElBQVMsRUFBRUEsS0FBS0UsR0FBTCxJQUFZRixLQUFLRyxHQUFqQixJQUF3QixDQUFDSCxLQUFLSSxZQUFoQyxDQUFiLEVBQTREO0FBQzFEaEMsa0JBQVFOLElBQUkyQixPQUFKLENBQVI7QUFFQXZCLGlCQUFPQyxjQUFQLENBQXNCTCxHQUF0QixFQUEyQjJCLE9BQTNCLEVBQW9DO0FBQ2xDWSx3QkFBWSxJQURzQjtBQUdsQ0gsaUJBQUssZUFBTTtBQUNULHFCQUFPOUIsS0FBUDtBQUNELGFBTGlDO0FBT2xDK0IsaUJBQUssdUJBQVk7QUFDZixrQkFBSUcsYUFBYWxDLEtBQWpCLEVBQXdCO0FBQ3RCLHVCQUFLbUMsa0JBQUwsQ0FBd0JuQyxLQUF4QixFQUErQk4sSUFBSVEsSUFBbkMsRUFBeUNtQixPQUF6Qzs7QUFDQXJCLHdCQUFRa0MsUUFBUjtBQUNBLG9CQUFJeEIsTUFBTSxPQUFLVCxPQUFMLENBQWFQLElBQUlRLElBQWpCLENBQVY7O0FBRUEsb0JBQUlRLEdBQUosRUFBUztBQUNQLHNCQUFJUCxhQUFZTyxJQUFJUCxTQUFKLENBQWNrQixPQUFkLENBQWhCOztBQUVBLHNCQUFJbEIsVUFBSixFQUFlO0FBQ2JBLCtCQUFVWSxPQUFWLENBQWtCLFVBQUNxQixFQUFELEVBQStCO0FBQy9DQSx5QkFBR2hCLElBQUg7QUFDRCxxQkFGRDtBQUdEOztBQUVELHlCQUFLaUIsZ0JBQUwsQ0FBc0JILFFBQXRCLEVBQWdDeEMsSUFBSVEsSUFBcEMsRUFBMENtQixPQUExQztBQUNEO0FBQ0Y7QUFDRjtBQXpCaUMsV0FBcEM7QUEyQkQ7QUFDRjs7QUFFRCxVQUFJbEIsVUFBVWtCLE9BQVYsRUFBbUJFLE9BQW5CLENBQTJCSixRQUEzQixNQUF5QyxDQUFDLENBQTlDLEVBQWlEO0FBQy9DaEIsa0JBQVVrQixPQUFWLEVBQW1CRyxJQUFuQixDQUF3QkwsUUFBeEI7QUFDRDs7QUFFRCxXQUFLa0IsZ0JBQUwsQ0FBc0IzQyxJQUFJMkIsT0FBSixDQUF0QixFQUFvQzNCLElBQUlRLElBQXhDLEVBQThDbUIsT0FBOUM7QUFDRDs7OzhCQUVTM0IsRyxFQUFVMkIsTyxFQUFpQkYsUSxFQUFpQztBQUNwRSxVQUFJVCxNQUFNLEtBQUtULE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsQ0FBVjs7QUFFQSxVQUFJUSxHQUFKLEVBQVM7QUFDUCxZQUFJUCxjQUFZTyxJQUFJUCxTQUFKLENBQWNrQixPQUFkLENBQWhCOztBQUVBLFlBQUlsQixXQUFKLEVBQWU7QUFDYixjQUFJc0IsTUFBTXRCLFlBQVVvQixPQUFWLENBQWtCSixRQUFsQixDQUFWOztBQUVBLGNBQUlNLE1BQU0sQ0FBQyxDQUFYLEVBQWM7QUFDWnRCLHdCQUFVdUIsTUFBVixDQUFpQkQsR0FBakIsRUFBc0IsQ0FBdEI7O0FBRUEsZ0JBQUksQ0FBQ3RCLFlBQVVHLE1BQWYsRUFBdUI7QUFDckIscUJBQU9JLElBQUlQLFNBQUosQ0FBY2tCLE9BQWQsQ0FBUDtBQUNBLG1CQUFLYyxrQkFBTCxDQUF3QnpDLElBQUkyQixPQUFKLENBQXhCLEVBQXNDM0IsSUFBSVEsSUFBMUMsRUFBZ0RtQixPQUFoRDtBQUNEO0FBQ0Y7O0FBRUQsZUFBS00sb0JBQUwsQ0FBMEJqQixHQUExQixFQUErQmhCLElBQUlRLElBQW5DO0FBQ0Q7QUFDRjtBQUNGOzs7d0JBRUdSLEcsRUFBVTJCLE8sRUFBaUI7QUFDN0IsYUFBTzNCLElBQUkyQixPQUFKLENBQVA7QUFDRDs7O3dCQUVHM0IsRyxFQUFVMkIsTyxFQUFpQnJCLEssRUFBWTtBQUN6Q04sVUFBSTJCLE9BQUosSUFBZXJCLEtBQWY7QUFDRDs7Ozs7OztBQUNGO0FBRUQsSUFBTXNDLFVBQVUsSUFBSTdDLE9BQUosRUFBaEI7ZUFFZTZDLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE9mOzs7QUFHTyxJQUFNQyxZQUFZLENBQWxCOztBQUNBLElBQU1DLFVBQVUsQ0FBaEI7O0FBV0EsSUFBTUMsdUJBQXVCLFNBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZQOztBQXdDQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBQzFDLEtBQUQsRUFBbUI7QUFDbkMsU0FBT0EsU0FBUyxJQUFULEdBQWdCQSxNQUFNMkMsUUFBTixFQUFoQixHQUFtQ0MsU0FBMUM7QUFDRCxDQUZEOztBQUlBLElBQU1DLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxDQUFELEVBQVlWLEVBQVosRUFBOEI7QUFDMUMsT0FBSyxJQUFJVyxJQUFJLENBQWIsRUFBZ0JBLElBQUlELENBQXBCLEVBQXVCQyxHQUF2QjtBQUE0Qlg7QUFBNUI7QUFDRCxDQUZEOztBQUlBLElBQU1ZLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxPQUFELEVBQW1CQyxNQUFuQixFQUFnQ0MsUUFBaEMsRUFBd0U7QUFDekYsTUFBSUMsV0FBV0gsUUFBUUksRUFBUixDQUFXQyxTQUFYLENBQXFCLElBQXJCLENBQWY7QUFDQSxNQUFJQyxPQUFPLElBQUlDLFVBQUosQ0FBVUosUUFBVixFQUE2QkYsTUFBN0IsRUFBcUNELFFBQVFNLElBQVIsQ0FBYUUsT0FBbEQsQ0FBWDtBQUNBRixPQUFLRyxJQUFMOztBQUNBLE1BQUcsQ0FBQ1QsT0FBRCxJQUFZLENBQUNBLFFBQVFVLE1BQXJCLElBQStCVixRQUFRVSxNQUFSLENBQWVDLFVBQWYsS0FBOEIsSUFBaEUsRUFBc0U7QUFDcEUsVUFBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNEOztBQUVEWixVQUFRVSxNQUFSLENBQWVDLFVBQWYsQ0FBMEJFLFlBQTFCLENBQXVDVixRQUF2QyxFQUFpREQsUUFBakQ7QUFFQSxTQUFPSSxJQUFQO0FBQ0QsQ0FYRDs7QUFhQSxJQUFNUSxVQUF5QjtBQUM3QjtBQUNBLFVBQTZCO0FBQzNCQyxjQUFVLElBRGlCO0FBRTNCQyxjQUFVLElBRmlCO0FBSTNCUCxRQUoyQixnQkFJdEJMLEVBSnNCLEVBSWxCO0FBQ1AsVUFBRyxDQUFDLEtBQUthLFVBQVQsRUFBcUI7QUFDbkIsYUFBS0EsVUFBTCxHQUFrQjtBQUNoQkMsbUJBQVM7QUFETyxTQUFsQjtBQUdEO0FBQ0YsS0FWMEI7QUFZM0JDLFVBWjJCLGtCQVlwQmYsRUFab0IsRUFZSDtBQUN0QixVQUFJLEtBQUthLFVBQUwsQ0FBZ0JDLE9BQXBCLEVBQTZCO0FBQzNCLFlBQUcsS0FBS3ZELElBQUwsS0FBYyxJQUFqQixFQUF1QjtBQUNyQixnQkFBTSxJQUFJaUQsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNEOztBQUNEUixXQUFHZ0IsbUJBQUgsQ0FBdUIsS0FBS3pELElBQUwsQ0FBVSxDQUFWLENBQXZCLEVBQXFDLEtBQUtzRCxVQUExQztBQUNEO0FBQ0YsS0FuQjBCO0FBcUIzQkksV0FyQjJCLG1CQXFCbkJqQixFQXJCbUIsRUFxQkZyRDtBQUFXO0FBckJULE1BcUJtQjtBQUM1QyxVQUFJLEtBQUtrRSxVQUFMLENBQWdCQyxPQUFwQixFQUE2QjtBQUMzQixZQUFHLEtBQUt2RCxJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsZ0JBQU0sSUFBSWlELEtBQUosQ0FBVSxjQUFWLENBQU47QUFDRDs7QUFDRFIsV0FBR2dCLG1CQUFILENBQXVCLEtBQUt6RCxJQUFMLENBQVUsQ0FBVixDQUF2QixFQUFxQyxLQUFLc0QsVUFBTCxDQUFnQkMsT0FBckQ7QUFDRDs7QUFFRCxXQUFLRCxVQUFMLENBQWdCQyxPQUFoQixHQUEwQixLQUFLSSxZQUFMLENBQWtCdkUsS0FBbEIsQ0FBMUI7O0FBQ0EsVUFBRyxLQUFLWSxJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsY0FBTSxJQUFJaUQsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNEOztBQUNEUixTQUFHbUIsZ0JBQUgsQ0FBb0IsS0FBSzVELElBQUwsQ0FBVSxDQUFWLENBQXBCLEVBQWtDLEtBQUtzRCxVQUFMLENBQWdCQyxPQUFsRDtBQUNEO0FBbEMwQixHQUZBO0FBdUM3QjtBQUNBLFlBQStCO0FBQzdCTSxXQUFPLElBRHNCO0FBRzdCUixjQUFVLElBSG1CO0FBSzdCUCxRQUw2QixnQkFLeEJMLEVBTHdCLEVBS1A7QUFDcEIsVUFBSSxDQUFDLEtBQUtNLE1BQVYsRUFBa0I7QUFDaEIsYUFBS0EsTUFBTCxHQUFjZSxTQUFTQyxhQUFULHNCQUFxQyxLQUFLQyxJQUExQyxPQUFkO0FBQ0EsYUFBS1YsVUFBTCxHQUFrQjtBQUNoQlcsb0JBQW1CO0FBREgsU0FBbEI7O0FBR0EsWUFBRyxDQUFDeEIsR0FBR08sVUFBUCxFQUFtQjtBQUNqQixnQkFBTSxJQUFJQyxLQUFKLENBQVUsaUJBQVYsQ0FBTjtBQUNEOztBQUNEUixXQUFHTyxVQUFILENBQWNFLFlBQWQsQ0FBMkIsS0FBS0gsTUFBaEMsRUFBd0NOLEVBQXhDO0FBQ0FBLFdBQUdPLFVBQUgsQ0FBY2tCLFdBQWQsQ0FBMEJ6QixFQUExQjtBQUNELE9BVkQsTUFVTztBQUNMLGFBQUthLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCOUQsT0FBekIsQ0FBaUMsVUFBQ3dDLElBQUQsRUFBaUI7QUFDaERBLGVBQUtHLElBQUw7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQXJCNEI7QUF1QjdCVSxVQXZCNkIsa0JBdUJ0QmYsRUF2QnNCLEVBdUJsQjtBQUNULFVBQUksS0FBS2EsVUFBTCxDQUFnQlcsUUFBcEIsRUFBOEI7QUFDNUIsYUFBS1gsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUI5RCxPQUF6QixDQUFpQyxVQUFDd0MsSUFBRCxFQUFnQjtBQUMvQ0EsZUFBS2EsTUFBTDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBN0I0QjtBQStCN0JFLFdBL0I2QixtQkErQnJCakIsRUEvQnFCLEVBK0JqQjBCLFVBL0JpQixFQStCTDtBQUFBOztBQUN0QixVQUFHLEtBQUtuRSxJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsY0FBTSxJQUFJaUQsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNEOztBQUNELFVBQUltQixZQUFZLEtBQUtwRSxJQUFMLENBQVUsQ0FBVixDQUFoQjtBQUNBbUUsbUJBQWFBLGNBQWMsRUFBM0IsQ0FMc0IsQ0FPdEI7O0FBQ0EsVUFBRyxDQUFDN0QsTUFBTStELE9BQU4sQ0FBY0YsVUFBZCxDQUFKLEVBQStCO0FBQzdCLGNBQU0sSUFBSWxCLEtBQUosQ0FBVSxVQUFVbUIsU0FBVixHQUFzQiw0Q0FBaEMsQ0FBTjtBQUNELE9BVnFCLENBWXRCOzs7QUFDQSxVQUFJRSxZQUFZN0IsR0FBRzhCLFlBQUgsQ0FBZ0IsZ0JBQWhCLEtBQXFDLEtBQUtDLGlCQUFMLENBQXVCSixTQUF2QixDQUFyRDtBQUVBRCxpQkFBV2hFLE9BQVgsQ0FBbUIsVUFBQ3NFLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUNuQyxZQUFJQyxRQUFhO0FBQUNDLG1CQUFTLE1BQUtqQyxJQUFMLENBQVVMO0FBQXBCLFNBQWpCO0FBQ0FxQyxjQUFNTCxTQUFOLElBQW1CSSxLQUFuQjtBQUNBQyxjQUFNUCxTQUFOLElBQW1CSyxLQUFuQjtBQUNBLFlBQUk5QixPQUFPLE1BQUtXLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCUyxLQUF6QixDQUFYOztBQUVBLFlBQUksQ0FBQy9CLElBQUwsRUFBVztBQUNULGNBQUlrQyxRQUFKOztBQUVBLGNBQUksTUFBS3ZCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCdkUsTUFBN0IsRUFBcUM7QUFDbkNtRix1QkFBVyxNQUFLdkIsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUIsTUFBS1gsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJ2RSxNQUF6QixHQUFrQyxDQUEzRCxFQUE4RG9GLEdBQTlELENBQWtFLENBQWxFLENBQVg7QUFDRCxXQUZELE1BRU8sSUFBRyxNQUFLL0IsTUFBUixFQUFnQjtBQUNyQjhCLHVCQUFXLE1BQUs5QixNQUFoQjtBQUNELFdBRk0sTUFFQTtBQUNMLGtCQUFNLElBQUlFLEtBQUosQ0FBVSxzQkFBVixDQUFOO0FBQ0Q7O0FBRUROLGlCQUFPUCxXQUFXLEtBQVgsRUFBaUJ1QyxLQUFqQixFQUF3QkUsU0FBU0UsV0FBakMsQ0FBUDs7QUFDQSxnQkFBS3pCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCckQsSUFBekIsQ0FBOEIrQixJQUE5QjtBQUNELFNBYkQsTUFhTztBQUNMLGNBQUlBLEtBQUtMLE1BQUwsQ0FBWThCLFNBQVosTUFBMkJLLEtBQS9CLEVBQXNDO0FBQ3BDO0FBQ0EsZ0JBQUlPLFVBQUosRUFBZ0JDLFFBQWhCOztBQUNBLGlCQUFLLElBQUlDLFlBQVlSLFFBQVEsQ0FBN0IsRUFBZ0NRLFlBQVksTUFBSzVCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCdkUsTUFBckUsRUFBNkV3RixXQUE3RSxFQUEwRjtBQUN4RkQseUJBQVcsTUFBSzNCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCaUIsU0FBekIsQ0FBWDs7QUFDQSxrQkFBSUQsU0FBUzNDLE1BQVQsQ0FBZ0I4QixTQUFoQixNQUErQkssS0FBbkMsRUFBMEM7QUFDeENPLDZCQUFhRSxTQUFiO0FBQ0E7QUFDRDtBQUNGOztBQUNELGdCQUFJRixlQUFlaEQsU0FBbkIsRUFBOEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQUtzQixVQUFMLENBQWdCVyxRQUFoQixDQUF5Qm5ELE1BQXpCLENBQWdDa0UsVUFBaEMsRUFBNEMsQ0FBNUM7O0FBQ0Esa0JBQUcsQ0FBQyxNQUFLakMsTUFBTixJQUFnQixDQUFDLE1BQUtBLE1BQUwsQ0FBWUMsVUFBaEMsRUFBNEM7QUFDMUMsc0JBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDs7QUFDRCxvQkFBS0YsTUFBTCxDQUFZQyxVQUFaLENBQXVCRSxZQUF2QixDQUFvQytCLFNBQVNILEdBQVQsQ0FBYSxDQUFiLENBQXBDLEVBQXFEbkMsS0FBS21DLEdBQUwsQ0FBUyxDQUFULENBQXJEOztBQUNBRyx1QkFBUzNDLE1BQVQsQ0FBZ0JnQyxTQUFoQixJQUE2QkksS0FBN0I7QUFDRCxhQVZELE1BVU87QUFDTDtBQUNBTyx5QkFBVzdDLFdBQVcsS0FBWCxFQUFpQnVDLEtBQWpCLEVBQXdCaEMsS0FBS21DLEdBQUwsQ0FBUyxDQUFULENBQXhCLENBQVg7QUFDRDs7QUFDRCxrQkFBS3hCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCbkQsTUFBekIsQ0FBZ0M0RCxLQUFoQyxFQUF1QyxDQUF2QyxFQUEwQ08sUUFBMUM7QUFDRCxXQXpCRCxNQXlCTztBQUNMdEMsaUJBQUtMLE1BQUwsQ0FBWWdDLFNBQVosSUFBeUJJLEtBQXpCO0FBQ0Q7QUFDRjtBQUNGLE9BakREOztBQW1EQSxVQUFJLEtBQUtwQixVQUFMLENBQWdCVyxRQUFoQixDQUF5QnZFLE1BQXpCLEdBQWtDeUUsV0FBV3pFLE1BQWpELEVBQXlEO0FBQ3ZEdUMsY0FBTSxLQUFLcUIsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJ2RSxNQUF6QixHQUFrQ3lFLFdBQVd6RSxNQUFuRCxFQUEyRCxZQUFNO0FBQy9ELGNBQUlpRCxPQUFPLE1BQUtXLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCa0IsR0FBekIsRUFBWDs7QUFDQXhDLGVBQUthLE1BQUw7O0FBQ0EsY0FBRyxDQUFDLE1BQUtULE1BQU4sSUFBZ0IsQ0FBQyxNQUFLQSxNQUFMLENBQVlDLFVBQWhDLEVBQTRDO0FBQzFDLGtCQUFNLElBQUlDLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsZ0JBQUtGLE1BQUwsQ0FBWUMsVUFBWixDQUF1QmtCLFdBQXZCLENBQW1DdkIsS0FBS21DLEdBQUwsQ0FBUyxDQUFULENBQW5DO0FBQ0QsU0FQRDtBQVFEOztBQUVELFVBQUlyQyxHQUFHMkMsUUFBSCxLQUFnQixRQUFoQixJQUE0QixLQUFLekMsSUFBTCxDQUFVMEMsUUFBMUMsRUFBb0Q7QUFDbEQsYUFBSzFDLElBQUwsQ0FBVTBDLFFBQVYsQ0FBbUJsRixPQUFuQixDQUEyQixVQUFDa0MsT0FBRCxFQUFzQjtBQUMvQyxjQUFJLE1BQUtVLE1BQUwsSUFBZ0JWLFFBQVFJLEVBQVIsS0FBZSxNQUFLTSxNQUFMLENBQVlDLFVBQTNDLElBQTJEWCxRQUFRMkIsSUFBUixLQUFpQixPQUFoRixFQUEwRjtBQUN4RjNCLG9CQUFRN0IsSUFBUjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0YsS0FuSDRCO0FBcUg3QjhFLFVBckg2QixrQkFxSHRCaEQsTUFySHNCLEVBcUhkO0FBQUE7O0FBQ2IsVUFBSWlELE9BQVksRUFBaEIsQ0FEYSxDQUdiOztBQUVBckcsYUFBT08sSUFBUCxDQUFZNkMsTUFBWixFQUFvQm5DLE9BQXBCLENBQTRCLGVBQU87QUFDakMsWUFBRyxPQUFLSCxJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsZ0JBQU0sSUFBSWlELEtBQUosQ0FBVSxjQUFWLENBQU47QUFDRDs7QUFDRCxZQUFJdUMsUUFBUSxPQUFLeEYsSUFBTCxDQUFVLENBQVYsQ0FBWixFQUEwQjtBQUN4QnVGLGVBQUtDLEdBQUwsSUFBWWxELE9BQU9rRCxHQUFQLENBQVo7QUFDRDtBQUNGLE9BUEQ7QUFTQSxXQUFLbEMsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUI5RCxPQUF6QixDQUFpQyxVQUFDd0MsSUFBRCxFQUFnQjtBQUMvQ0EsYUFBSzJDLE1BQUwsQ0FBWUMsSUFBWjtBQUNELE9BRkQ7QUFHRDtBQXRJNEIsR0F4Q0Y7QUFpTDdCO0FBQ0EsYUFBb0MsVUFBUzlDLEVBQVQsRUFBMEJyRCxLQUExQixFQUEwQztBQUM1RSxRQUFJcUcscUJBQWNoRCxHQUFHaUQsU0FBakIsTUFBSjs7QUFDQSxRQUFHLEtBQUsxRixJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsWUFBTSxJQUFJaUQsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNEOztBQUNELFFBQUk3RCxVQUFXcUcsUUFBUTlFLE9BQVIsWUFBb0IsS0FBS1gsSUFBTCxDQUFVLENBQVYsQ0FBcEIsVUFBdUMsQ0FBQyxDQUF2RCxFQUEyRDtBQUN6RCxVQUFJWixLQUFKLEVBQVc7QUFDVHFELFdBQUdpRCxTQUFILGFBQWtCakQsR0FBR2lELFNBQXJCLGNBQWtDLEtBQUsxRixJQUFMLENBQVUsQ0FBVixDQUFsQztBQUNELE9BRkQsTUFFTztBQUNMeUMsV0FBR2lELFNBQUgsR0FBZUQsUUFBUUUsT0FBUixZQUFvQixLQUFLM0YsSUFBTCxDQUFVLENBQVYsQ0FBcEIsUUFBcUMsR0FBckMsRUFBMEM0RixJQUExQyxFQUFmO0FBQ0Q7QUFDRjtBQUNGLEdBOUw0QjtBQWdNN0I7QUFDQUMsUUFBOEIsVUFBU3BELEVBQVQsRUFBMEJyRCxLQUExQixFQUF5QztBQUNyRXFELE9BQUdxRCxXQUFILEdBQWlCMUcsU0FBUyxJQUFULEdBQWdCQSxLQUFoQixHQUF3QixFQUF6QztBQUNELEdBbk00QjtBQXFNN0I7QUFDQTJHLFFBQThCLFVBQVN0RCxFQUFULEVBQTBCckQsS0FBMUIsRUFBeUM7QUFDckU0RyxZQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQnhELEVBQXBCLEVBQXdCckQsS0FBeEI7QUFDQXFELE9BQUd5RCxTQUFILEdBQWU5RyxTQUFTLElBQVQsR0FBZ0JBLEtBQWhCLEdBQXdCLEVBQXZDO0FBQ0QsR0F6TTRCO0FBMk03QjtBQUNBK0csUUFBK0IsVUFBUzFELEVBQVQsRUFBMEJyRCxLQUExQixFQUEwQztBQUN2RXFELE9BQUcyRCxLQUFILENBQVNDLE9BQVQsR0FBbUJqSCxRQUFRLEVBQVIsR0FBYSxNQUFoQztBQUNELEdBOU00QjtBQWdON0I7QUFDQWtILFFBQStCLFVBQVM3RCxFQUFULEVBQTBCckQsS0FBMUIsRUFBMEM7QUFDdkVxRCxPQUFHMkQsS0FBSCxDQUFTQyxPQUFULEdBQW1CakgsUUFBUSxNQUFSLEdBQWlCLEVBQXBDO0FBQ0QsR0FuTjRCO0FBcU43QjtBQUNBbUgsV0FBa0MsVUFBUzlELEVBQVQsRUFBZ0NyRCxLQUFoQyxFQUFnRDtBQUNoRnFELE9BQUcrRCxRQUFILEdBQWMsQ0FBQ3BILEtBQWY7QUFDRCxHQXhONEI7QUEwTjdCO0FBQ0FvSCxZQUFtQyxVQUFTL0QsRUFBVCxFQUFnQ3JELEtBQWhDLEVBQWdEO0FBQ2pGcUQsT0FBRytELFFBQUgsR0FBYyxDQUFDLENBQUNwSCxLQUFoQjtBQUNELEdBN040QjtBQStON0I7QUFDQTtBQUNBcUgsV0FBOEI7QUFDNUJDLGVBQVcsSUFEaUI7QUFFNUJyRCxjQUFVLElBRmtCO0FBSTVCUCxVQUFNLGNBQVNMLEVBQVQsRUFBYTtBQUNqQixVQUFJa0UsT0FBTyxJQUFYO0FBQ0EsV0FBS3JELFVBQUwsR0FBa0IsRUFBbEI7O0FBQ0EsVUFBSSxDQUFDLEtBQUtBLFVBQUwsQ0FBZ0IvQyxRQUFyQixFQUErQjtBQUM3QixhQUFLK0MsVUFBTCxDQUFnQi9DLFFBQWhCLEdBQTJCLFlBQVk7QUFDckNvRyxlQUFLQyxPQUFMO0FBQ0QsU0FGRDtBQUdEOztBQUNEbkUsU0FBR21CLGdCQUFILENBQW9CLFFBQXBCLEVBQThCLEtBQUtOLFVBQUwsQ0FBZ0IvQyxRQUE5QztBQUNELEtBYjJCO0FBZTVCaUQsWUFBUSxnQkFBU2YsRUFBVCxFQUFhO0FBQ25CQSxTQUFHZ0IsbUJBQUgsQ0FBdUIsUUFBdkIsRUFBaUMsS0FBS0gsVUFBTCxDQUFnQi9DLFFBQWpEO0FBQ0QsS0FqQjJCO0FBbUI1Qm1ELFdBbkI0QixtQkFtQnBCakIsRUFuQm9CLEVBbUJHckQsS0FuQkgsRUFtQlU7QUFDcEMsVUFBSXFELEdBQUd1QixJQUFILEtBQVksT0FBaEIsRUFBeUI7QUFDdkJ2QixXQUFHZ0UsT0FBSCxHQUFhM0UsVUFBVVcsR0FBR3JELEtBQWIsTUFBd0IwQyxVQUFVMUMsS0FBVixDQUFyQztBQUNELE9BRkQsTUFFTztBQUNMcUQsV0FBR2dFLE9BQUgsR0FBYSxDQUFDLENBQUNySCxLQUFmO0FBQ0Q7QUFDRjtBQXpCMkIsR0FqT0Q7QUE2UDdCO0FBQ0E7QUFDQUEsU0FBNEI7QUFDMUJzSCxlQUFXLElBRGU7QUFFMUJyRCxjQUFVLElBRmdCO0FBSTFCUCxRQUowQixnQkFJckJMLEVBSnFCLEVBSUM7QUFDekIsV0FBS2EsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFdBQUtBLFVBQUwsQ0FBZ0J1RCxPQUFoQixHQUEwQnBFLEdBQUdxRSxPQUFILEtBQWUsT0FBZixJQUEwQnJFLEdBQUd1QixJQUFILEtBQVksT0FBaEU7O0FBQ0EsVUFBSSxDQUFDLEtBQUtWLFVBQUwsQ0FBZ0J1RCxPQUFyQixFQUE4QjtBQUM1QixhQUFLdkQsVUFBTCxDQUFnQnlELEtBQWhCLEdBQXdCdEUsR0FBRzhCLFlBQUgsQ0FBZ0IsWUFBaEIsTUFBa0M5QixHQUFHcUUsT0FBSCxLQUFlLFFBQWYsR0FBMEIsUUFBMUIsR0FBcUMsT0FBdkUsQ0FBeEI7QUFFQSxZQUFJSCxPQUFPLElBQVg7O0FBQ0EsWUFBSSxDQUFDLEtBQUtyRCxVQUFMLENBQWdCL0MsUUFBckIsRUFBK0I7QUFDN0IsZUFBSytDLFVBQUwsQ0FBZ0IvQyxRQUFoQixHQUEyQixZQUFZO0FBQ3JDb0csaUJBQUtDLE9BQUw7QUFDRCxXQUZEO0FBR0Q7O0FBRURuRSxXQUFHbUIsZ0JBQUgsQ0FBb0IsS0FBS04sVUFBTCxDQUFnQnlELEtBQXBDLEVBQTJDLEtBQUt6RCxVQUFMLENBQWdCL0MsUUFBM0Q7QUFDRDtBQUNGLEtBbkJ5QjtBQXFCMUJpRCxVQXJCMEIsa0JBcUJuQmYsRUFyQm1CLEVBcUJmO0FBQ1QsVUFBSSxDQUFDLEtBQUthLFVBQUwsQ0FBZ0J1RCxPQUFyQixFQUE4QjtBQUM1QnBFLFdBQUdnQixtQkFBSCxDQUF1QixLQUFLSCxVQUFMLENBQWdCeUQsS0FBdkMsRUFBOEMsS0FBS3pELFVBQUwsQ0FBZ0IvQyxRQUE5RDtBQUNEO0FBQ0YsS0F6QnlCO0FBMkIxQm1ELFdBM0IwQixtQkEyQmxCakIsRUEzQmtCLEVBMkJ3QnJELEtBM0J4QixFQTJCK0I7QUFDdkQsVUFBSSxLQUFLa0UsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCdUQsT0FBdkMsRUFBZ0Q7QUFDOUNwRSxXQUFHdUUsWUFBSCxDQUFnQixPQUFoQixFQUF5QjVILEtBQXpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSXFELEdBQUd1QixJQUFILEtBQVksaUJBQVosSUFBaUN2QixjQUFjd0UsaUJBQW5ELEVBQXNFO0FBQ3BFLGNBQUk3SCxpQkFBaUJrQixLQUFyQixFQUE0QjtBQUMxQixpQkFBSyxJQUFJNkIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTSxHQUFHL0MsTUFBdkIsRUFBK0J5QyxHQUEvQixFQUFvQztBQUNsQyxrQkFBSStFLFNBQVN6RSxHQUFHTixDQUFILENBQWI7QUFDQStFLHFCQUFPQyxRQUFQLEdBQWtCL0gsTUFBTXVCLE9BQU4sQ0FBY3VHLE9BQU85SCxLQUFyQixJQUE4QixDQUFDLENBQWpEO0FBQ0Q7QUFDRjtBQUNGLFNBUEQsTUFPTyxJQUFJMEMsVUFBVTFDLEtBQVYsTUFBcUIwQyxVQUFVVyxHQUFHckQsS0FBYixDQUF6QixFQUE4QztBQUNuRHFELGFBQUdyRCxLQUFILEdBQVdBLFNBQVMsSUFBVCxHQUFnQkEsS0FBaEIsR0FBd0IsRUFBbkM7QUFDRDtBQUNGO0FBQ0Y7QUExQ3lCLEdBL1BDO0FBNFM3QjtBQUNBZ0ksTUFBeUI7QUFDdkJ2RCxXQUFPLElBRGdCO0FBRXZCUixjQUFVLElBRmE7QUFJdkJQLFFBSnVCLGdCQUlsQkwsRUFKa0IsRUFJTTtBQUMzQixXQUFLYSxVQUFMLEdBQWtCLEVBQWxCOztBQUNBLFVBQUksQ0FBQyxLQUFLUCxNQUFWLEVBQWtCO0FBQ2hCLFlBQU10QyxVQUFVLEtBQUs0RyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBYyxDQUFkLENBQWhCLEdBQW1DLEVBQW5EO0FBQ0EsYUFBS3RFLE1BQUwsR0FBY2UsU0FBU0MsYUFBVCxDQUF1QixnQkFBZ0IsS0FBS0MsSUFBckIsR0FBNEIsR0FBNUIsR0FBa0N2RCxPQUFsQyxHQUE0QyxHQUFuRSxDQUFkO0FBQ0EsYUFBSzZDLFVBQUwsQ0FBZ0JnRSxRQUFoQixHQUEyQixLQUEzQjs7QUFDQSxZQUFHLENBQUM3RSxHQUFHTyxVQUFQLEVBQW1CO0FBQ2pCLGdCQUFNLElBQUlDLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ0Q7O0FBQ0RSLFdBQUdPLFVBQUgsQ0FBY0UsWUFBZCxDQUEyQixLQUFLSCxNQUFoQyxFQUF3Q04sRUFBeEM7QUFDQUEsV0FBR08sVUFBSCxDQUFja0IsV0FBZCxDQUEwQnpCLEVBQTFCO0FBQ0QsT0FURCxNQVNPLElBQUssS0FBS2EsVUFBTCxDQUFnQmlFLEtBQWhCLEtBQTBCLEtBQTFCLElBQW9DLEtBQUtqRSxVQUFMLENBQWdCa0UsTUFBekQsRUFBaUU7QUFDckUsYUFBS2xFLFVBQUwsQ0FBZ0JrRSxNQUFoQixDQUF1QjFFLElBQXZCO0FBQ0Y7O0FBQ0EsV0FBS1EsVUFBTCxDQUFnQmlFLEtBQWhCLEdBQXdCLElBQXhCO0FBQ0YsS0FuQnNCO0FBcUJ2Qi9ELFVBckJ1QixvQkFxQmQ7QUFDUCxVQUFLLEtBQUtGLFVBQUwsQ0FBZ0JrRSxNQUFyQixFQUE2QjtBQUMxQixhQUFLbEUsVUFBTCxDQUFnQmtFLE1BQWhCLENBQXVCaEUsTUFBdkI7QUFDQSxhQUFLRixVQUFMLENBQWdCaUUsS0FBaEIsR0FBd0IsS0FBeEI7QUFDRjtBQUNGLEtBMUJzQjtBQTRCdkI3RCxXQTVCdUIsbUJBNEJmakIsRUE1QmUsRUE0QkVyRCxLQTVCRixFQTRCa0I7QUFDdkNBLGNBQVEsQ0FBQyxDQUFDQSxLQUFWOztBQUNBLFVBQUlBLFVBQVUsS0FBS2tFLFVBQUwsQ0FBZ0JnRSxRQUE5QixFQUF3QztBQUN0QyxZQUFJbEksS0FBSixFQUFXO0FBRVQsY0FBSSxDQUFFLEtBQUtrRSxVQUFMLENBQWdCa0UsTUFBdEIsRUFBOEI7QUFDM0IsaUJBQUtsRSxVQUFMLENBQWdCa0UsTUFBaEIsR0FBeUIsSUFBSTVFLFVBQUosQ0FBU0gsRUFBVCxFQUFhLEtBQUtFLElBQUwsQ0FBVUwsTUFBdkIsRUFBK0IsS0FBS0ssSUFBTCxDQUFVRSxPQUF6QyxDQUF6QjtBQUNBLGlCQUFLUyxVQUFMLENBQWdCa0UsTUFBaEIsQ0FBdUIxRSxJQUF2QjtBQUNGOztBQUNELGNBQUcsQ0FBQyxLQUFLQyxNQUFOLElBQWdCLENBQUMsS0FBS0EsTUFBTCxDQUFZQyxVQUFoQyxFQUE0QztBQUMxQyxrQkFBTSxJQUFJQyxLQUFKLENBQVUsMkJBQVYsQ0FBTjtBQUNEOztBQUNELGVBQUtGLE1BQUwsQ0FBWUMsVUFBWixDQUF1QkUsWUFBdkIsQ0FBb0NULEVBQXBDLEVBQXdDLEtBQUtNLE1BQUwsQ0FBWWdDLFdBQXBEO0FBQ0EsZUFBS3pCLFVBQUwsQ0FBZ0JnRSxRQUFoQixHQUEyQixJQUEzQjtBQUNELFNBWEQsTUFXTztBQUNMLGNBQUcsQ0FBQzdFLEdBQUdPLFVBQVAsRUFBbUI7QUFDakIsa0JBQU0sSUFBSUMsS0FBSixDQUFVLDRCQUFWLENBQU47QUFDRDs7QUFDRFIsYUFBR08sVUFBSCxDQUFja0IsV0FBZCxDQUEwQnpCLEVBQTFCO0FBQ0EsZUFBS2EsVUFBTCxDQUFnQmdFLFFBQWhCLEdBQTJCLEtBQTNCO0FBQ0Q7QUFDRjtBQUNGLEtBbERzQjtBQW9EdkJoQyxVQXBEdUIsa0JBb0RoQmhELE1BcERnQixFQW9EUjtBQUNiLFVBQUssS0FBS2dCLFVBQUwsQ0FBZ0JrRSxNQUFyQixFQUE2QjtBQUMxQixhQUFLbEUsVUFBTCxDQUFnQmtFLE1BQWhCLENBQXVCbEMsTUFBdkIsQ0FBOEJoRCxNQUE5QjtBQUNGO0FBQ0Y7QUF4RHNCO0FBN1NJLENBQS9COztlQTJXZWEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4YWY7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1zRSxpQkFBa0IsNENBQXhCO0FBQ0EsSUFBTUMsa0JBQWtCLEtBQXhCOztBQVVBOzs7O0FBSUEsU0FBU0MsYUFBVCxDQUF1QmxGLEVBQXZCLEVBQWlFO0FBQy9ELE1BQUltRixVQUFvQixFQUF4Qjs7QUFDQSxNQUFJbkYsR0FBR3VCLElBQUgsS0FBWSxVQUFoQixFQUE0QjtBQUMxQixXQUFRdkIsRUFBRCxDQUF5QmdFLE9BQWhDO0FBQ0QsR0FGRCxNQUVPLElBQUloRSxHQUFHdUIsSUFBSCxLQUFZLGlCQUFoQixFQUFtQztBQUN4QyxRQUFJbkIsVUFBaUNKLEVBQUQsQ0FBMEJJLE9BQTlEOztBQUVBLFNBQUssSUFBTTJDLElBQVgsSUFBa0IzQyxPQUFsQixFQUEyQjtBQUN6QixVQUFJQSxRQUFROUQsY0FBUixDQUF1QnlHLElBQXZCLENBQUosRUFBaUM7QUFDL0IsWUFBTTBCLFNBQVNyRSxRQUFRMkMsSUFBUixDQUFmOztBQUNBLFlBQUkwQixPQUFPQyxRQUFYLEVBQXFCO0FBQ25CUyxrQkFBUWhILElBQVIsQ0FBYXNHLE9BQU85SCxLQUFwQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxXQUFPd0ksT0FBUDtBQUNELEdBYk0sTUFhQTtBQUNMLFdBQU9uRixHQUFHckQsS0FBVjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7SUFHYXlJLE87OztBQUlYOzs7O0FBT0E7Ozs7QUFJQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFLQTs7Ozs7Ozs7Ozs7O0FBWUEsbUJBQVlsRixJQUFaLEVBQXdCRixFQUF4QixFQUF5Q3VCLElBQXpDLEVBQThEdkQsT0FBOUQsRUFBc0ZxSCxNQUF0RixFQUFrSDlILElBQWxILEVBQXlJK0gsVUFBekksRUFBc0s7QUFBQTs7QUFBQSx1Q0FuRDlJLEVBbUQ4STs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx3Q0F0QzVJLEVBc0M0STs7QUFBQSxzQ0FsQ2hKLEVBa0NnSjs7QUFBQTs7QUFBQSxtQ0ExQnpKLEVBMEJ5Sjs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDcEssU0FBS3BGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtGLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUt1QixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLOEQsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBSzlILElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUsrSCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsU0FBS3ZELEtBQUwsQ0FBVzVDLGdDQUFYLElBQW1DRyxTQUFuQztBQUNBLFNBQUtzQixVQUFMLEdBQWtCLEVBQWxCO0FBRUEwQyxZQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQixLQUFLakMsSUFBL0I7O0FBRUEsUUFBR3ZELFlBQVksSUFBZixFQUFxQjtBQUNuQixXQUFLNEcsUUFBTCxDQUFjeEYsZ0NBQWQsSUFBc0NwQixPQUF0QztBQUNELEtBRkQsTUFFTztBQUNMLFdBQUs0RyxRQUFMLENBQWN4RixnQ0FBZCxJQUFzQyxPQUF0QztBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7OzRCQUtRL0MsRyxFQUFVMkIsTyxFQUFpQkYsUSxFQUE0QztBQUM3RSxVQUFHQSxRQUFILEVBQWE7QUFDWCxlQUFPLElBQUkwSCxrQkFBSixDQUFhbkosR0FBYixFQUFrQjJCLE9BQWxCLEVBQTJCRixRQUEzQixDQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxJQUFJMEgsa0JBQUosQ0FBYW5KLEdBQWIsRUFBa0IyQixPQUFsQixFQUEyQixJQUEzQixDQUFQO0FBQ0Q7QUFFRjs7O2tDQUVhO0FBQ1osV0FBSyxJQUFNeUgsWUFBWCxJQUEyQixLQUFLYixRQUFoQyxFQUEwQztBQUN4QyxZQUFJLEtBQUtBLFFBQUwsQ0FBY3RJLGNBQWQsQ0FBNkJtSixZQUE3QixDQUFKLEVBQWdEO0FBQzlDLGNBQU16SCxVQUFVLEtBQUs0RyxRQUFMLENBQWNhLFlBQWQsQ0FBaEI7O0FBQ0EsY0FBR3pILE9BQUgsRUFBWTtBQUNWLGdCQUFJMEgsUUFBUSx3QkFBVTFILE9BQVYsQ0FBWjs7QUFDQSxnQkFBSTBILE1BQU1uRSxJQUFOLEtBQWVyQyxxQkFBbkIsRUFBOEI7QUFDNUIsbUJBQUt5RyxVQUFMLENBQWdCRixZQUFoQixJQUFnQ0MsTUFBTS9JLEtBQXRDO0FBQ0QsYUFGRCxNQUVPLElBQUcrSSxNQUFNbkUsSUFBTixLQUFlcEMsbUJBQWxCLEVBQTBCO0FBQy9CLG1CQUFLeUcsU0FBTCxDQUFlSCxZQUFmLElBQStCLEtBQUtJLE9BQUwsQ0FBYSxLQUFLM0YsSUFBTCxDQUFVTCxNQUF2QixFQUErQjdCLE9BQS9CLENBQS9CO0FBQ0EsbUJBQUtnRSxLQUFMLENBQVd5RCxZQUFYLElBQTJCLEtBQUtHLFNBQUwsQ0FBZUgsWUFBZixFQUE2QkssTUFBeEQ7QUFDRCxhQUhNLE1BR0E7QUFDTCxvQkFBTSxJQUFJdEYsS0FBSixDQUFVLHVCQUFWLENBQU47QUFDRDtBQUNGLFdBVkQsTUFVTztBQUNMLGlCQUFLbUYsVUFBTCxDQUFnQkYsWUFBaEIsSUFBZ0NsRyxTQUFoQztBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBRUQ7Ozs7Ozs7OztzQ0FNa0JvQyxTLEVBQW1CO0FBQ25DLGFBQU8sTUFBTUEsU0FBTixHQUFrQixHQUF6QjtBQUNEOzs7NENBRXVCcEUsSSxFQUFnQndJLGMsRUFBa0M7QUFBQTs7QUFDeEUsYUFBT3hJLEtBQ05GLEdBRE0sQ0FDRjJJLGtCQURFLEVBRU4zSSxHQUZNLENBRUYsZ0JBQWdCNEksRUFBaEIsRUFBdUI7QUFBQSxZQUFyQjFFLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLFlBQWY1RSxLQUFlLFFBQWZBLEtBQWU7O0FBQzFCLFlBQUk0RSxTQUFTckMscUJBQWIsRUFBd0I7QUFDdEIsY0FBTWdILGlCQUFpQnZKLEtBQXZCO0FBQ0EsaUJBQU91SixjQUFQO0FBQ0QsU0FIRCxNQUdPLElBQUkzRSxTQUFTcEMsbUJBQWIsRUFBc0I7QUFDM0I7QUFDQSxjQUFNbkIsVUFBV3JCLEtBQWpCOztBQUNBLGNBQUksQ0FBQyxNQUFLNEksa0JBQUwsQ0FBd0JRLGNBQXhCLENBQUwsRUFBOEM7QUFDNUMsa0JBQUtSLGtCQUFMLENBQXdCUSxjQUF4QixJQUEwQyxFQUExQztBQUNEOztBQUVELGNBQUlJLFdBQVcsTUFBS1osa0JBQUwsQ0FBd0JRLGNBQXhCLEVBQXdDRSxFQUF4QyxDQUFmOztBQUVBLGNBQUksQ0FBQ0UsUUFBTCxFQUFlO0FBQ2JBLHVCQUFXLE1BQUtOLE9BQUwsQ0FBYSxNQUFLM0YsSUFBTCxDQUFVTCxNQUF2QixFQUErQjdCLE9BQS9CLENBQVg7QUFDQSxrQkFBS3VILGtCQUFMLENBQXdCUSxjQUF4QixFQUF3Q0UsRUFBeEMsSUFBOENFLFFBQTlDO0FBQ0Q7O0FBQ0QsaUJBQU9BLFNBQVN4SixLQUFULEVBQVA7QUFDRCxTQWRNLE1BY0E7QUFDTCxnQkFBTSxJQUFJNkQsS0FBSixDQUFVLHVCQUFWLENBQU47QUFDRDtBQUNGLE9BdkJNLENBQVA7QUF3QkQ7QUFFRDs7Ozs7OzttQ0FJZTdELEssRUFBWTtBQUFBOztBQUN6QixVQUFHLEtBQUsySSxVQUFMLEtBQW9CLElBQXZCLEVBQTZCO0FBQzNCO0FBQ0EsZUFBTzNJLEtBQVA7QUFDRDs7QUFDRCxhQUFPLEtBQUsySSxVQUFMLENBQWdCYyxNQUFoQixDQUF1QixVQUFDQyxNQUFELEVBQTRCQyxXQUE1QixFQUFnRXJFLEtBQWhFLEVBQWtGO0FBQzlHLFlBQUkxRSxPQUFPK0ksWUFBWUMsS0FBWixDQUFrQnZCLGNBQWxCLENBQVg7O0FBQ0EsWUFBR3pILFNBQVMsSUFBWixFQUFrQjtBQUNoQixnQkFBTSxJQUFJaUQsS0FBSixDQUFVLHFDQUFWLENBQU47QUFDRDs7QUFDRCxZQUFJakUsS0FBS2dCLEtBQUtpSixLQUFMLEVBQVQ7O0FBQ0EsWUFBRyxDQUFDakssRUFBSixFQUFRO0FBQ04sZ0JBQU0sSUFBSWlFLEtBQUosQ0FBVSxxQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsWUFBSWlHLFlBQVksT0FBS3ZHLElBQUwsQ0FBVUUsT0FBVixDQUFrQmtGLFVBQWxCLENBQTZCL0ksRUFBN0IsQ0FBaEI7O0FBRUEsWUFBTW1LLGdCQUFnQixPQUFLQyx1QkFBTCxDQUE2QnBKLElBQTdCLEVBQW1DMEUsS0FBbkMsQ0FBdEI7O0FBRUEsWUFBSXdFLGFBQWNBLFVBQVVHLElBQVYsWUFBMEJDLFFBQTVDLEVBQXVEO0FBQ3JEUixtQkFBU0ksVUFBVUcsSUFBVixtQkFBZVAsTUFBZiw0QkFBMEJLLGFBQTFCLEdBQVQ7QUFDRCxTQUZELE1BRU8sSUFBSUQscUJBQXFCSSxRQUF6QixFQUFtQztBQUN4Q1IsbUJBQVNJLHlCQUFVSixNQUFWLDRCQUFxQkssYUFBckIsR0FBVDtBQUNEOztBQUNELGVBQU9MLE1BQVA7QUFDRCxPQW5CTSxFQW1CSjFKLEtBbkJJLENBQVA7QUFvQkQ7QUFFRDs7Ozs7O2lDQUdhUSxFLEVBQThDO0FBQUE7O0FBQ3pELFVBQUl5QyxVQUFVLElBQWQ7QUFDQSxVQUFJa0IsVUFBVWxCLFFBQVFNLElBQVIsQ0FBYUUsT0FBYixDQUFxQlUsT0FBbkM7QUFFQSxhQUFPLFVBQUNnRyxFQUFELEVBQVE7QUFDYixZQUFHLENBQUNoRyxPQUFKLEVBQWE7QUFDWCxnQkFBTSxJQUFJTixLQUFKLENBQVUsb0RBQVYsQ0FBTjtBQUNEOztBQUNETSxnQkFBUWlHLElBQVIsQ0FBYTVKLEVBQWIsRUFBaUIsTUFBakIsRUFBdUIySixFQUF2QixFQUEyQmxILE9BQTNCO0FBQ0QsT0FMRDtBQU1EO0FBRUQ7Ozs7Ozs7d0JBSUlqRCxLLEVBQWlEO0FBQUEsVUFBckM4SSxZQUFxQyx1RUFBdEJyRyxnQ0FBc0I7O0FBQ25ELFVBQUt6QyxpQkFBaUJrSyxRQUFsQixJQUErQixDQUFFLEtBQUt4QixNQUFOLENBQXFDMUUsUUFBekUsRUFBbUY7QUFDakZoRSxnQkFBU0EsS0FBVDtBQUNBQSxnQkFBUSxLQUFLcUssY0FBTCxDQUFvQnJLLE1BQU1vSyxJQUFOLENBQVcsS0FBSy9FLEtBQUwsQ0FBV3lELFlBQVgsQ0FBWCxDQUFwQixDQUFSO0FBQ0QsT0FIRCxNQUdPO0FBQ0w5SSxnQkFBU0EsS0FBVDtBQUNBQSxnQkFBUSxLQUFLcUssY0FBTCxDQUFvQnJLLEtBQXBCLENBQVI7QUFDRDs7QUFFRCxVQUFJc0ssU0FBSjs7QUFDQSxVQUFHLEtBQUs1QixNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQ3ZCLGNBQU0sSUFBSTdFLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBRyxLQUFLNkUsTUFBTCxDQUFZL0ksY0FBWixDQUEyQixTQUEzQixDQUFILEVBQTBDO0FBQ3hDLGFBQUsrSSxNQUFMLEdBQWdCLEtBQUtBLE1BQXJCO0FBQ0E0QixvQkFBWSxLQUFLNUIsTUFBTCxDQUFZcEUsT0FBeEI7QUFDRCxPQUhELE1BR087QUFDTCxhQUFLb0UsTUFBTCxHQUFnQixLQUFLQSxNQUFyQjtBQUNBNEIsb0JBQVksS0FBSzVCLE1BQWpCO0FBQ0Q7O0FBRUQsVUFBSTRCLHFCQUFxQkosUUFBekIsRUFBbUM7QUFDakNJLGtCQUFVRixJQUFWLENBQWUsSUFBZixFQUFxQixLQUFLL0csRUFBMUIsRUFBOEJyRCxLQUE5QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OzJCQUdPO0FBQ0wsV0FBSyxJQUFNOEksWUFBWCxJQUEyQixLQUFLRyxTQUFoQyxFQUEyQztBQUN6QyxZQUFJLEtBQUtBLFNBQUwsQ0FBZXRKLGNBQWYsQ0FBOEJtSixZQUE5QixDQUFKLEVBQWlEO0FBQy9DLGNBQU1VLFdBQVcsS0FBS1AsU0FBTCxDQUFlSCxZQUFmLENBQWpCOztBQUVBLGNBQUdVLFFBQUgsRUFBYTtBQUNYLGlCQUFLbkUsS0FBTCxDQUFXeUQsWUFBWCxJQUEyQlUsU0FBU0wsTUFBcEM7QUFDQSxpQkFBS3BILEdBQUwsQ0FBU3lILFNBQVN4SixLQUFULEVBQVQsRUFBMkI4SSxZQUEzQjtBQUNELFdBSEQsTUFHTztBQUNMLGdCQUFNeUIsWUFBWSxLQUFLdkIsVUFBTCxDQUFnQkYsWUFBaEIsQ0FBbEI7QUFDQSxpQkFBSy9HLEdBQUwsQ0FBU3dJLFNBQVQsRUFBb0J6QixZQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBRUQ7Ozs7Ozs4QkFHVTtBQUFBOztBQUNSLFVBQUksS0FBS0csU0FBVCxFQUFvQjtBQUNsQixZQUFHLEtBQUtOLFVBQUwsS0FBb0IsSUFBdkIsRUFBNkI7QUFDM0IsZ0JBQU0sSUFBSTlFLEtBQUosQ0FBVSxvQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsYUFBSyxJQUFNaUYsWUFBWCxJQUEyQixLQUFLRyxTQUFoQyxFQUEyQztBQUN6QyxjQUFJLEtBQUtBLFNBQUwsQ0FBZXRKLGNBQWYsQ0FBOEJtSixZQUE5QixDQUFKLEVBQWlEO0FBQy9DLGdCQUFNVSxXQUFXLEtBQUtQLFNBQUwsQ0FBZUgsWUFBZixDQUFqQjtBQUVBLGdCQUFJOUksUUFBUSxLQUFLMkksVUFBTCxDQUFnQjZCLFdBQWhCLENBQTRCLFVBQUNkLE1BQUQsRUFBNEJDLFdBQTVCLEVBQWdFckUsS0FBaEUsRUFBa0Y7QUFDeEgsa0JBQU0xRSxPQUFPK0ksWUFBWWMsS0FBWixDQUFrQm5DLGVBQWxCLENBQWI7QUFDQSxrQkFBTTFJLEtBQUtnQixLQUFLaUosS0FBTCxFQUFYOztBQUNBLGtCQUFHLENBQUNqSyxFQUFKLEVBQVE7QUFDTixzQkFBTSxJQUFJaUUsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDs7QUFDRCxrQkFBTWlHLFlBQVksT0FBS3ZHLElBQUwsQ0FBVUUsT0FBVixDQUFrQmtGLFVBQWxCLENBQTZCL0ksRUFBN0IsQ0FBbEI7O0FBQ0Esa0JBQU1tSyxnQkFBZ0IsT0FBS0MsdUJBQUwsQ0FBNkJwSixJQUE3QixFQUFtQzBFLEtBQW5DLENBQXRCOztBQUVBLGtCQUFJd0UsYUFBYUEsVUFBVXRDLE9BQTNCLEVBQW9DO0FBQ2xDa0MseUJBQVNJLFVBQVV0QyxPQUFWLG1CQUFrQmtDLE1BQWxCLDRCQUE2QkssYUFBN0IsR0FBVDtBQUNEOztBQUNELHFCQUFPTCxNQUFQO0FBQ0QsYUFiVyxFQWFULEtBQUtnQixRQUFMLENBQWUsS0FBS3JILEVBQXBCLENBYlMsQ0FBWjtBQWVBbUcscUJBQVNtQixRQUFULENBQWtCM0ssS0FBbEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUVEOzs7Ozs7OzsyQkFLTztBQUNMLFdBQUs0SyxXQUFMOztBQUVBLFVBQUksS0FBS2xDLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVkvSSxjQUFaLENBQTJCLE1BQTNCLENBQW5CLEVBQXVEO0FBQ3JELGFBQUsrSSxNQUFMLEdBQWUsS0FBS0EsTUFBcEI7O0FBQ0EsWUFBRyxDQUFDLEtBQUtBLE1BQUwsQ0FBWWhGLElBQWIsSUFBcUIsT0FBTyxLQUFLZ0YsTUFBTCxDQUFZaEYsSUFBbkIsS0FBNkIsVUFBckQsRUFBaUU7QUFDL0QsZ0JBQU0sSUFBSUcsS0FBSixDQUFVLG1DQUFWLENBQU47QUFDRDs7QUFDRCxhQUFLNkUsTUFBTCxDQUFZaEYsSUFBWixDQUFpQjBHLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLEtBQUsvRyxFQUFqQztBQUNEOztBQUVELFVBQUksS0FBS0UsSUFBTCxDQUFVRSxPQUFWLENBQWtCb0gsV0FBdEIsRUFBbUM7QUFDakMsYUFBS3pKLElBQUw7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs2QkFHUztBQUFBOztBQUNQLFVBQUcsS0FBS3NILE1BQUwsS0FBZ0IsSUFBbkIsRUFBeUI7QUFDdkIsY0FBTSxJQUFJN0UsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDs7QUFDRCxVQUFHLEtBQUs2RSxNQUFMLENBQVkvSSxjQUFaLENBQTJCLE1BQTNCLENBQUgsRUFBdUM7QUFDckMsYUFBSytJLE1BQUwsR0FBZ0IsS0FBS0EsTUFBckI7O0FBQ0EsWUFBSSxLQUFLQSxNQUFMLENBQVl0RSxNQUFoQixFQUF3QjtBQUN0QixlQUFLc0UsTUFBTCxDQUFZdEUsTUFBWixDQUFtQmdHLElBQW5CLENBQXdCLElBQXhCLEVBQThCLEtBQUsvRyxFQUFuQztBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxLQUFLNEYsU0FBVCxFQUFvQjtBQUNsQixhQUFLLElBQU1ILFlBQVgsSUFBMkIsS0FBS0csU0FBaEMsRUFBMkM7QUFDekMsY0FBSSxLQUFLQSxTQUFMLENBQWV0SixjQUFmLENBQThCbUosWUFBOUIsQ0FBSixFQUFpRDtBQUMvQyxnQkFBTVUsV0FBVyxLQUFLUCxTQUFMLENBQWVILFlBQWYsQ0FBakI7QUFDQVUscUJBQVNzQixTQUFUO0FBQ0Q7QUFDRjtBQUVGOztBQUVEaEwsYUFBT08sSUFBUCxDQUFZLEtBQUt1SSxrQkFBakIsRUFBcUM3SCxPQUFyQyxDQUE2QyxjQUFNO0FBQ2pELFlBQUlILE9BQU8sT0FBS2dJLGtCQUFMLENBQXdCbUMsRUFBeEIsQ0FBWDtBQUVBakwsZUFBT08sSUFBUCxDQUFZTyxJQUFaLEVBQWtCRyxPQUFsQixDQUEwQixjQUFNO0FBQzlCSCxlQUFLMEksRUFBTCxFQUFTd0IsU0FBVDtBQUNELFNBRkQ7QUFHRCxPQU5EO0FBUUEsV0FBS2xDLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0Q7QUFFRDs7Ozs7Ozs7NkJBS3lCO0FBQUEsVUFBbEIxRixNQUFrQix1RUFBSixFQUFJOztBQUN2QixVQUFJLEtBQUsrRixTQUFULEVBQW9CO0FBQ2xCLGFBQUssSUFBTUgsWUFBWCxJQUEyQixLQUFLRyxTQUFoQyxFQUEyQztBQUN6QyxjQUFJLEtBQUtBLFNBQUwsQ0FBZXRKLGNBQWYsQ0FBOEJtSixZQUE5QixDQUFKLEVBQWlEO0FBQy9DLGdCQUFNVSxXQUFXLEtBQUtQLFNBQUwsQ0FBZUgsWUFBZixDQUFqQjtBQUNBLGlCQUFLekQsS0FBTCxDQUFXeUQsWUFBWCxJQUEyQlUsU0FBU0wsTUFBcEMsQ0FGK0MsQ0FHL0M7QUFDRDtBQUNGO0FBRUY7O0FBQ0QsVUFBRyxLQUFLVCxNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQ3ZCLGNBQU0sSUFBSTdFLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBRyxLQUFLNkUsTUFBTCxDQUFZL0ksY0FBWixDQUEyQixRQUEzQixDQUFILEVBQXlDO0FBQ3ZDLGFBQUsrSSxNQUFMLEdBQWdCLEtBQUtBLE1BQXJCOztBQUNBLFlBQUksS0FBS0EsTUFBTCxDQUFZeEMsTUFBaEIsRUFBd0I7QUFDdEIsZUFBS3dDLE1BQUwsQ0FBWXhDLE1BQVosQ0FBbUJrRSxJQUFuQixDQUF3QixJQUF4QixFQUE4QmxILE1BQTlCO0FBQ0Q7QUFDRjtBQUNGO0FBRUQ7Ozs7Ozs7NkJBSVNHLEUsRUFBMEM7QUFDakQsVUFBRyxLQUFLcUYsTUFBTCxLQUFnQixJQUFuQixFQUF5QjtBQUN2QixjQUFNLElBQUk3RSxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtBQUNEOztBQUNELFVBQUcsS0FBSzZFLE1BQUwsQ0FBWS9JLGNBQVosQ0FBMkIsVUFBM0IsQ0FBSCxFQUEyQztBQUN6QyxhQUFLK0ksTUFBTCxHQUFnQixLQUFLQSxNQUFyQjs7QUFDQSxZQUFHLE9BQU8sS0FBS0EsTUFBTCxDQUFZZ0MsUUFBbkIsS0FBaUMsVUFBcEMsRUFBZ0Q7QUFDOUMsZ0JBQU0sSUFBSTdHLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ0Q7O0FBQ0QsZUFBTyxLQUFLNkUsTUFBTCxDQUFZZ0MsUUFBWixDQUFxQk4sSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0MvRyxFQUFoQyxDQUFQO0FBQ0QsT0FORCxNQU1PO0FBQ0wsZUFBT2tGLGNBQWNsRixFQUFkLENBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbGFIOztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTJILGNBQWMsU0FBZEEsV0FBYyxDQUFDN0IsTUFBRCxFQUFjekosR0FBZCxFQUEyQjtBQUM3QyxNQUFHQSxHQUFILEVBQVE7QUFDTkksV0FBT08sSUFBUCxDQUFZWCxHQUFaLEVBQWlCcUIsT0FBakIsQ0FBeUIsZUFBTztBQUM5QixVQUFJLENBQUNvSSxPQUFPL0MsR0FBUCxDQUFELElBQWdCK0MsT0FBTy9DLEdBQVAsTUFBZ0IsRUFBcEMsRUFBd0M7QUFDdEMrQyxlQUFPL0MsR0FBUCxJQUFjMUcsSUFBSTBHLEdBQUosQ0FBZDtBQUNEO0FBQ0YsS0FKRDtBQUtEOztBQUNELFNBQU8rQyxNQUFQO0FBQ0QsQ0FURDs7QUFlQTs7O0lBR2E4QixnQjs7Ozs7QUFNWDs7OztBQUlBOzs7O0FBUUE7Ozs7Ozs7O0FBUUEsNEJBQVkxSCxJQUFaLEVBQXdCRixFQUF4QixFQUF5Q3VCLElBQXpDLEVBQXVEO0FBQUE7O0FBQUE7O0FBQ3JELDBGQUFNckIsSUFBTixFQUFZRixFQUFaLEVBQWdCdUIsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEM7O0FBRHFEOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVGQWJqQyxFQWFpQzs7QUFBQTs7QUFBQSw0RkFWdkNzRyxtQkFBU0MsV0FVOEI7O0FBRXJELFVBQUs1SCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLRixFQUFMLEdBQVVBLEVBQVY7QUFDQSxVQUFLdUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS3dHLFNBQUwsR0FBaUI3SCxLQUFLRSxPQUFMLENBQWE0SCxVQUFiLENBQXdCLE1BQUt6RyxJQUE3QixDQUFqQjtBQUNBLFVBQUtvRSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixFQUFqQjs7QUFFQSxVQUFLMkIsV0FBTDs7QUFUcUQ7QUFVdEQ7Ozs7a0NBR2E7QUFDWjtBQUNBLFdBQUssSUFBSTdILElBQUksQ0FBUixFQUFXdUksTUFBTSxLQUFLakksRUFBTCxDQUFRa0ksVUFBUixDQUFtQmpMLE1BQXpDLEVBQWlEeUMsSUFBSXVJLEdBQXJELEVBQTBEdkksR0FBMUQsRUFBK0Q7QUFDN0QsWUFBSXlJLFlBQVksS0FBS25JLEVBQUwsQ0FBUWtJLFVBQVIsQ0FBbUJ4SSxDQUFuQixDQUFoQixDQUQ2RCxDQUc3RDs7QUFDQSxZQUFJeUksVUFBVUMsSUFBVixDQUFlbEssT0FBZixDQUF1QixLQUFLbUssYUFBNUIsTUFBK0MsQ0FBbkQsRUFBc0Q7QUFDcEQsY0FBSTVDLGVBQWUsS0FBSzZDLFNBQUwsQ0FBZUgsVUFBVUMsSUFBekIsQ0FBbkI7QUFDQSxjQUFJMUMsUUFBUSx3QkFBVXlDLFVBQVV4TCxLQUFwQixDQUFaOztBQUNGLGNBQUcrSSxNQUFNbkUsSUFBTixLQUFlckMscUJBQWxCLEVBQTZCO0FBQ3pCLGlCQUFLeUcsVUFBTCxDQUFnQkYsWUFBaEIsSUFBZ0NDLE1BQU0vSSxLQUF0QztBQUNELFdBRkgsTUFFUyxJQUFHK0ksTUFBTW5FLElBQU4sS0FBZXBDLG1CQUFsQixFQUEyQjtBQUNoQyxpQkFBS3lGLFFBQUwsQ0FBY2EsWUFBZCxJQUE4QjBDLFVBQVV4TCxLQUF4QztBQUNBLGlCQUFLaUosU0FBTCxDQUFlSCxZQUFmLElBQStCLEtBQUtJLE9BQUwsQ0FBYSxLQUFLM0YsSUFBTCxDQUFVTCxNQUF2QixFQUErQixLQUFLK0UsUUFBTCxDQUFjYSxZQUFkLENBQS9CLEVBQTRELElBQTVELENBQS9CO0FBQ0EsaUJBQUt6RCxLQUFMLENBQVd5RCxZQUFYLElBQTJCLEtBQUtHLFNBQUwsQ0FBZUgsWUFBZixFQUE2QkssTUFBeEQ7QUFDRCxXQUpNLE1BSUE7QUFDTCxrQkFBTSxJQUFJdEYsS0FBSixDQUFVLGtDQUFWLENBQU47QUFDRDtBQUNGO0FBQ0Y7QUFFRjtBQUVEOzs7Ozs7OzJCQUlPLENBQUU7QUFFVDs7Ozs7Ozs2QkFJUyxDQUFFO0FBRVg7Ozs7Ozs7OEJBSVUsQ0FBRTtBQUVaOzs7Ozs7NkJBR1M7QUFBQTs7QUFDUCxVQUFJNkYsU0FBYyxFQUFsQjtBQUVBNUosYUFBT08sSUFBUCxDQUFZLEtBQUsySSxVQUFqQixFQUE2QmpJLE9BQTdCLENBQXFDLGVBQU87QUFDMUMySSxlQUFPdEQsR0FBUCxJQUFjLE9BQUtpRSxjQUFMLENBQW9CLE9BQUtyQixVQUFMLENBQWdCNUMsR0FBaEIsQ0FBcEIsQ0FBZDtBQUNBc0QsZUFBT3RELEdBQVAsSUFBYyxPQUFLNEMsVUFBTCxDQUFnQjVDLEdBQWhCLENBQWQ7QUFDRCxPQUhEO0FBS0F0RyxhQUFPTyxJQUFQLENBQVksS0FBSzRJLFNBQWpCLEVBQTRCbEksT0FBNUIsQ0FBb0MsZUFBTztBQUN6QzJJLGVBQU90RCxHQUFQLElBQWMsT0FBSzZDLFNBQUwsQ0FBZTdDLEdBQWYsRUFBb0IrQyxNQUFsQztBQUNELE9BRkQ7QUFJQSxhQUFPTyxNQUFQO0FBQ0Q7QUFHRDs7Ozs7Ozs7OzhCQU1Va0MsTSxFQUFnQjtBQUN4QixhQUFPQSxPQUFPckYsT0FBUCxDQUFlLFdBQWYsRUFBNEIsbUJBQVc7QUFDNUMsZUFBT3NGLFFBQVEsQ0FBUixFQUFXQyxXQUFYLEVBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDs7O3VDQUVrQjtBQUNqQixVQUFJckksVUFBeUI7QUFDM0I7QUFDQU0saUJBQXlCakUsT0FBT2lNLE1BQVAsQ0FBYyxJQUFkLENBRkU7QUFHM0JwRCxvQkFBMEI3SSxPQUFPaU0sTUFBUCxDQUFjLElBQWQsQ0FIQztBQUkzQlYsb0JBQTBCdkwsT0FBT2lNLE1BQVAsQ0FBYyxJQUFkLENBSkM7QUFLM0JDLGtCQUFzQmxNLE9BQU9pTSxNQUFQLENBQWMsSUFBZDtBQUxLLE9BQTdCO0FBUUFmLGtCQUFZdkgsUUFBUU0sT0FBcEIsRUFBNkIsS0FBS3FILFNBQUwsQ0FBZXJILE9BQTVDO0FBQ0FpSCxrQkFBWXZILFFBQVFrRixVQUFwQixFQUFnQyxLQUFLeUMsU0FBTCxDQUFlekMsVUFBL0M7QUFDQXFDLGtCQUFZdkgsUUFBUTRILFVBQXBCLEVBQWdDLEtBQUtELFNBQUwsQ0FBZUMsVUFBL0M7QUFDQUwsa0JBQVl2SCxRQUFRdUksUUFBcEIsRUFBOEIsS0FBS1osU0FBTCxDQUFlWSxRQUE3QztBQUVBaEIsa0JBQVl2SCxRQUFRTSxPQUFwQixFQUE2QixLQUFLUixJQUFMLENBQVVFLE9BQVYsQ0FBa0JNLE9BQS9DO0FBQ0FpSCxrQkFBWXZILFFBQVFrRixVQUFwQixFQUFnQyxLQUFLcEYsSUFBTCxDQUFVRSxPQUFWLENBQWtCa0YsVUFBbEQ7QUFDQXFDLGtCQUFZdkgsUUFBUTRILFVBQXBCLEVBQWdDLEtBQUs5SCxJQUFMLENBQVVFLE9BQVYsQ0FBa0I0SCxVQUFsRDtBQUNBTCxrQkFBWXZILFFBQVF1SSxRQUFwQixFQUE4QixLQUFLekksSUFBTCxDQUFVRSxPQUFWLENBQWtCdUksUUFBaEQ7QUFFQXZJLGNBQVF3SSxNQUFSLEdBQWlCLEtBQUtiLFNBQUwsQ0FBZWEsTUFBZixHQUF3QixLQUFLYixTQUFMLENBQWVhLE1BQXZDLEdBQWdELEtBQUsxSSxJQUFMLENBQVVFLE9BQVYsQ0FBa0J3SSxNQUFuRjtBQUNBeEksY0FBUXlJLGtCQUFSLEdBQTZCLEtBQUtkLFNBQUwsQ0FBZWMsa0JBQWYsR0FBb0MsS0FBS2QsU0FBTCxDQUFlYyxrQkFBbkQsR0FBd0UsS0FBSzNJLElBQUwsQ0FBVUUsT0FBVixDQUFrQnlJLGtCQUF2SDtBQUNBekksY0FBUTBJLGFBQVIsR0FBd0IsS0FBS2YsU0FBTCxDQUFlZSxhQUFmLEdBQStCLEtBQUtmLFNBQUwsQ0FBZWUsYUFBOUMsR0FBOEQsS0FBSzVJLElBQUwsQ0FBVUUsT0FBVixDQUFrQjBJLGFBQXhHO0FBQ0ExSSxjQUFRb0gsV0FBUixHQUFzQixLQUFLTyxTQUFMLENBQWVQLFdBQWYsR0FBNkIsS0FBS08sU0FBTCxDQUFlUCxXQUE1QyxHQUEwRCxLQUFLdEgsSUFBTCxDQUFVRSxPQUFWLENBQWtCb0gsV0FBbEc7QUFDQXBILGNBQVFVLE9BQVIsR0FBa0IsS0FBS2lILFNBQUwsQ0FBZWpILE9BQWYsR0FBeUIsS0FBS2lILFNBQUwsQ0FBZWpILE9BQXhDLEdBQWtELEtBQUtaLElBQUwsQ0FBVUUsT0FBVixDQUFrQlUsT0FBdEY7QUFDQSxhQUFPVixPQUFQO0FBQ0Q7QUFFRDs7Ozs7OzsyQkFJTztBQUNMLFVBQUksQ0FBQyxLQUFLMkksYUFBVixFQUF5QjtBQUN2QixhQUFLL0ksRUFBTCxDQUFReUQsU0FBUixHQUFvQixLQUFLc0UsU0FBTCxDQUFlaEksUUFBZixDQUF3QmdILElBQXhCLENBQTZCLElBQTdCLENBQXBCO0FBQ0E7Ozs7QUFHQSxZQUFJN0UsUUFBUSxLQUFLNkYsU0FBTCxDQUFlaUIsVUFBZixDQUEwQmpDLElBQTFCLENBQStCLElBQS9CLEVBQXFDLEtBQUsvRyxFQUExQyxFQUE4QyxLQUFLaUosTUFBTCxFQUE5QyxDQUFaO0FBQ0EsYUFBS0YsYUFBTCxHQUFxQmxCLG1CQUFTeEgsSUFBVCxDQUFjeEMsTUFBTXFMLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCcEMsSUFBdEIsQ0FBMkIsS0FBSy9HLEVBQUwsQ0FBUW9KLFVBQW5DLENBQWQsRUFBOERsSCxLQUE5RCxFQUFxRSxLQUFLbUgsZ0JBQUwsRUFBckUsQ0FBckI7QUFDRCxPQVBELE1BT087QUFDTCxhQUFLTixhQUFMLENBQW1CMUksSUFBbkI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs2QkFHUztBQUFBOztBQUNQNUQsYUFBT08sSUFBUCxDQUFZLEtBQUs0SSxTQUFqQixFQUE0QmxJLE9BQTVCLENBQW9DLGVBQU87QUFDekMsZUFBS2tJLFNBQUwsQ0FBZTdDLEdBQWYsRUFBb0IwRSxTQUFwQjtBQUNELE9BRkQ7O0FBSUEsVUFBSSxLQUFLc0IsYUFBVCxFQUF3QjtBQUN0QixhQUFLQSxhQUFMLENBQW1CaEksTUFBbkIsQ0FBMEJnRyxJQUExQixDQUErQixJQUEvQjtBQUNEO0FBQ0Y7Ozs7RUF0S21DM0IsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJ0QyxJQUFNRSxhQUEwQixFQUFoQzs7O0FBRUFBLFdBQVdnRSxHQUFYLEdBQWlCLFVBQVUzTSxLQUFWLEVBQTBCO0FBQ3pDLFNBQU8sQ0FBQ0EsS0FBUjtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNTQTtBQUNBLFNBQVM0TSxRQUFULENBQWtCbE4sR0FBbEIsRUFBK0I7QUFDN0IsU0FBTyxRQUFPQSxHQUFQLE1BQWUsUUFBZixJQUEyQkEsUUFBUSxJQUExQztBQUNELEMsQ0FFRDs7O0FBQ0EsU0FBU21OLEtBQVQsQ0FBZUMsT0FBZixFQUFnQztBQUM5QixRQUFNLElBQUlqSixLQUFKLENBQVUsZ0JBQWdCaUosT0FBMUIsQ0FBTjtBQUNELEMsQ0FFRDs7O0FBQ0EsSUFBSWQsUUFBSjtBQUNBLElBQUllLFVBQUo7QUFDQSxJQUFJWixhQUFKOztJQUVhdEQsUTs7O0FBU1g7Ozs7OztBQU1BLG9CQUFZbkosR0FBWixFQUFzQjJCLE9BQXRCLEVBQXVDRixRQUF2QyxFQUF3RTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN0RSxTQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLRixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUs2TCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsUUFBTUMsY0FBYyxLQUFLQyxLQUFMLEVBQXBCO0FBQ0EsU0FBSzlHLEdBQUwsR0FBVzZHLFlBQVk3RyxHQUF2QjtBQUNBLFNBQUsrRyxNQUFMLEdBQWNGLFlBQVlFLE1BQTFCO0FBQ0EsU0FBS3pOLEdBQUwsR0FBVyxLQUFLME4sYUFBTCxDQUFtQjFOLEdBQW5CLENBQVg7QUFDQSxTQUFLeUosTUFBTCxHQUFjLEtBQUtrRSxPQUFMLEVBQWQ7O0FBQ0EsUUFBSVQsU0FBUyxLQUFLekQsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLFdBQUtwSCxHQUFMLENBQVMsSUFBVCxFQUFlLEtBQUtxRSxHQUFwQixFQUF5QixLQUFLK0MsTUFBOUIsRUFBc0MsS0FBS2hJLFFBQTNDO0FBQ0Q7QUFDRjs7Ozs7QUFpQ0Q7Ozs7NEJBSVE7QUFDTixVQUFJbU0sSUFBSjtBQUNBLFVBQUlDLElBQUo7O0FBRUEsVUFBSSxDQUFDUixXQUFXek0sTUFBaEIsRUFBd0I7QUFDdEJ1TSxjQUFNLDZDQUFOO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDLENBQUMsQ0FBQ0UsV0FBV3hMLE9BQVgsQ0FBbUIsS0FBS0YsT0FBTCxDQUFhLENBQWIsQ0FBbkIsQ0FBUCxFQUE0QztBQUMxQ2tNLGVBQU8sS0FBS2xNLE9BQUwsQ0FBYSxDQUFiLENBQVA7QUFDQWlNLGVBQU8sS0FBS2pNLE9BQUwsQ0FBYW1NLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUNELE9BSEQsTUFHTztBQUNMRCxlQUFPcEIsYUFBUDtBQUNBbUIsZUFBTyxLQUFLak0sT0FBWjtBQUNEOztBQUVELFdBQUs4TCxNQUFMLEdBQWN0RSxTQUFTNEUsUUFBVCxDQUFrQkgsSUFBbEIsRUFBd0JDLElBQXhCLENBQWQ7O0FBRUEsVUFBRyxDQUFDLEtBQUtKLE1BQUwsQ0FBWTdNLE1BQWhCLEVBQXdCO0FBQ3RCLGNBQU0sSUFBSXVELEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDs7QUFFRCxXQUFLdUMsR0FBTCxHQUFZLEtBQUsrRyxNQUFMLENBQVlwSCxHQUFaLEVBQVo7QUFFQSxhQUFPO0FBQ0xLLGFBQUssS0FBS0EsR0FETDtBQUVMK0csZ0JBQVEsS0FBS0E7QUFGUixPQUFQO0FBSUQ7QUFFRDs7Ozs7Ozs4QkFJVTtBQUNSLFVBQUlPLFVBQWUsS0FBS2hPLEdBQXhCO0FBQ0EsVUFBSWlPLFlBQVksQ0FBQyxDQUFqQjtBQUNBLFVBQUlDLElBQUo7QUFDQSxVQUFJN0UsS0FBSjs7QUFFQSxXQUFLLElBQUl6RCxRQUFRLENBQWpCLEVBQW9CQSxRQUFRLEtBQUs2SCxNQUFMLENBQVk3TSxNQUF4QyxFQUFnRGdGLE9BQWhELEVBQXlEO0FBQ3ZEeUQsZ0JBQVEsS0FBS29FLE1BQUwsQ0FBWTdILEtBQVosQ0FBUjs7QUFDQSxZQUFJc0gsU0FBU2MsT0FBVCxDQUFKLEVBQXVCO0FBQ3JCLGNBQUksT0FBTyxLQUFLVixVQUFMLENBQWdCMUgsS0FBaEIsQ0FBUCxLQUFrQyxXQUF0QyxFQUFtRDtBQUNqRCxnQkFBSW9JLGFBQWFFLE9BQU8sS0FBS1osVUFBTCxDQUFnQjFILEtBQWhCLENBQXBCLENBQUosRUFBaUQ7QUFDL0MsbUJBQUt2RCxHQUFMLENBQVMsS0FBVCxFQUFnQmdILEtBQWhCLEVBQXVCNkUsSUFBdkIsRUFBNkIsSUFBN0I7QUFDQSxtQkFBSzdMLEdBQUwsQ0FBUyxJQUFULEVBQWVnSCxLQUFmLEVBQXNCMkUsT0FBdEIsRUFBK0IsSUFBL0I7QUFDQSxtQkFBS1YsVUFBTCxDQUFnQjFILEtBQWhCLElBQXlCb0ksT0FBekI7QUFDRDtBQUNGLFdBTkQsTUFNTztBQUNMLGlCQUFLM0wsR0FBTCxDQUFTLElBQVQsRUFBZWdILEtBQWYsRUFBc0IyRSxPQUF0QixFQUErQixJQUEvQjtBQUNBLGlCQUFLVixVQUFMLENBQWdCMUgsS0FBaEIsSUFBeUJvSSxPQUF6QjtBQUNEOztBQUVEQSxvQkFBVSxLQUFLNUwsR0FBTCxDQUFTaUgsS0FBVCxFQUFnQjJFLE9BQWhCLENBQVY7QUFDRCxTQWJELE1BYU87QUFDTCxjQUFJQyxjQUFjLENBQUMsQ0FBbkIsRUFBc0I7QUFDcEJBLHdCQUFZckksS0FBWjtBQUNEOztBQUVELGNBQUlzSSxPQUFPLEtBQUtaLFVBQUwsQ0FBZ0IxSCxLQUFoQixDQUFYLEVBQW1DO0FBQ2pDLGlCQUFLdkQsR0FBTCxDQUFTLEtBQVQsRUFBZ0JnSCxLQUFoQixFQUF1QjZFLElBQXZCLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFVBQUlELGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQixhQUFLWCxVQUFMLENBQWdCdEwsTUFBaEIsQ0FBdUJpTSxTQUF2QjtBQUNEOztBQUVELGFBQU9ELE9BQVA7QUFDRDtBQUVEOzs7Ozs7MkJBR087QUFDTCxVQUFJRyxJQUFKLEVBQVVDLFFBQVYsRUFBb0I1TCxRQUFwQjs7QUFFQSxVQUFJLENBQUMyTCxPQUFPLEtBQUtSLE9BQUwsRUFBUixNQUE0QixLQUFLbEUsTUFBckMsRUFBNkM7QUFDM0MsWUFBSXlELFNBQVMsS0FBS3pELE1BQWQsQ0FBSixFQUEyQjtBQUN6QixlQUFLcEgsR0FBTCxDQUFTLEtBQVQsRUFBZ0IsS0FBS3FFLEdBQXJCLEVBQTBCLEtBQUsrQyxNQUEvQixFQUF1QyxLQUFLaEksUUFBNUM7QUFDRDs7QUFFRCxZQUFJeUwsU0FBU2lCLElBQVQsQ0FBSixFQUFvQjtBQUNsQixlQUFLOUwsR0FBTCxDQUFTLElBQVQsRUFBZSxLQUFLcUUsR0FBcEIsRUFBeUJ5SCxJQUF6QixFQUErQixLQUFLMU0sUUFBcEM7QUFDRDs7QUFFRDJNLG1CQUFXLEtBQUs5TixLQUFMLEVBQVg7QUFDQSxhQUFLbUosTUFBTCxHQUFjMEUsSUFBZDtBQUNBM0wsbUJBQVcsS0FBS2xDLEtBQUwsRUFBWDtBQUNBLFlBQUlrQyxhQUFhNEwsUUFBYixJQUF5QjVMLG9CQUFvQmdJLFFBQWpELEVBQTJELEtBQUsvSSxRQUFMLENBQWNDLElBQWQ7QUFDNUQsT0FiRCxNQWFPLElBQUl5TSxnQkFBZ0IzTSxLQUFwQixFQUEyQjtBQUNoQyxhQUFLQyxRQUFMLENBQWNDLElBQWQ7QUFDRDtBQUNGLEssQ0FFRDtBQUNBOzs7OzRCQUNRO0FBQ04sVUFBSXdMLFNBQVMsS0FBS3pELE1BQWQsQ0FBSixFQUEyQjtBQUN6QixlQUFPLEtBQUtySCxHQUFMLENBQVMsS0FBS3NFLEdBQWQsRUFBbUIsS0FBSytDLE1BQXhCLENBQVA7QUFDRDtBQUNGLEssQ0FFRDtBQUNBOzs7OzZCQUNTbkosSyxFQUFZO0FBQ25CLFVBQUk0TSxTQUFTLEtBQUt6RCxNQUFkLENBQUosRUFBMkI7QUFDekI2QyxpQkFBUyxLQUFLNUYsR0FBTCxDQUFTckQsQ0FBbEIsRUFBcUJoQixHQUFyQixDQUF5QixLQUFLb0gsTUFBOUIsRUFBc0MsS0FBSy9DLEdBQUwsQ0FBU2tILElBQS9DLEVBQXFEdE4sS0FBckQ7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7O3dCQUtJb0csRyxFQUFXMUcsRyxFQUFVO0FBQ3ZCLGFBQU9zTSxTQUFTNUYsSUFBSXJELENBQWIsRUFBZ0JqQixHQUFoQixDQUFvQnBDLEdBQXBCLEVBQXlCMEcsSUFBSWtILElBQTdCLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O3dCQU9JUyxNLEVBQWlCM0gsRyxFQUFXMUcsRyxFQUFVeUIsUSxFQUFpQztBQUN6RSxVQUFHNE0sTUFBSCxFQUFXO0FBQ1QvQixpQkFBUzVGLElBQUlyRCxDQUFiLEVBQWdCbUcsT0FBaEIsQ0FBd0J4SixHQUF4QixFQUE2QjBHLElBQUlrSCxJQUFqQyxFQUF1Q25NLFFBQXZDO0FBQ0QsT0FGRCxNQUVPO0FBQ0w2SyxpQkFBUzVGLElBQUlyRCxDQUFiLEVBQWdCK0gsU0FBaEIsQ0FBMEJwTCxHQUExQixFQUErQjBHLElBQUlrSCxJQUFuQyxFQUF5Q25NLFFBQXpDO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Z0NBR1k7QUFDVixVQUFJekIsR0FBSjtBQUNBLFVBQUlxSixLQUFKOztBQUVBLFdBQUssSUFBSXpELFFBQVEsQ0FBakIsRUFBb0JBLFFBQVEsS0FBSzZILE1BQUwsQ0FBWTdNLE1BQXhDLEVBQWdEZ0YsT0FBaEQsRUFBeUQ7QUFDdkR5RCxnQkFBUSxLQUFLb0UsTUFBTCxDQUFZN0gsS0FBWixDQUFSOztBQUNBLFlBQUk1RixNQUFNLEtBQUtzTixVQUFMLENBQWdCMUgsS0FBaEIsQ0FBVixFQUFrQztBQUNoQyxlQUFLdkQsR0FBTCxDQUFTLEtBQVQsRUFBZ0JnSCxLQUFoQixFQUF1QnJKLEdBQXZCLEVBQTRCLElBQTVCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJa04sU0FBUyxLQUFLekQsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLGFBQUtwSCxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFLcUUsR0FBckIsRUFBMEIsS0FBSytDLE1BQS9CLEVBQXVDLEtBQUtoSSxRQUE1QztBQUNEO0FBQ0YsSyxDQUNEO0FBQ0E7Ozs7a0NBQ2N6QixHLEVBQVU7QUFDdEIsVUFBSXNPLFFBQUosRUFBY04sT0FBZDs7QUFDQSxVQUFJLENBQUNoTyxJQUFJOEYsT0FBVCxFQUFrQjtBQUNoQixlQUFPOUYsR0FBUDtBQUNEOztBQUVELFVBQUksS0FBS3lOLE1BQUwsQ0FBWTdNLE1BQWhCLEVBQXdCO0FBQ3RCME4sbUJBQVcsS0FBS2IsTUFBTCxDQUFZLENBQVosRUFBZUcsSUFBMUI7QUFDRCxPQUZELE1BRU87QUFDTFUsbUJBQVcsS0FBSzVILEdBQUwsQ0FBU2tILElBQXBCO0FBQ0Q7O0FBRURJLGdCQUFVaE8sR0FBVjs7QUFDQSxhQUFPZ08sUUFBUWxJLE9BQVIsSUFBb0JrSSxRQUFRTSxRQUFSLE1BQXNCcEwsU0FBakQsRUFBNkQ7QUFDM0Q4SyxrQkFBVUEsUUFBUWxJLE9BQWxCO0FBQ0Q7O0FBRUQsYUFBT2tJLE9BQVA7QUFDRDs7Ozs7Ozs7Z0JBL09VN0UsUSxtQkE2QlksVUFBU3BGLE9BQVQsRUFBZ0M7QUFDckR1SSxhQUFXdkksUUFBUXVJLFFBQW5CO0FBQ0FlLGVBQWFqTixPQUFPTyxJQUFQLENBQVkyTCxRQUFaLENBQWI7QUFDQUcsa0JBQWdCMUksUUFBUTBJLGFBQXhCO0FBQ0QsQzs7Z0JBakNVdEQsUSxjQXVDTyxVQUFTeEgsT0FBVCxFQUEwQmtNLElBQTFCLEVBQXNDO0FBQ3RELE1BQUlKLFNBQWdCLEVBQXBCO0FBQ0EsTUFBSU8sVUFBZ0I7QUFBQzNLLE9BQUd3SyxJQUFKO0FBQVVELFVBQU07QUFBaEIsR0FBcEI7QUFDQSxNQUFJaEksS0FBSjtBQUNBLE1BQUkySSxHQUFKOztBQUVBLE9BQUszSSxRQUFRLENBQWIsRUFBZ0JBLFFBQVFqRSxRQUFRZixNQUFoQyxFQUF3Q2dGLE9BQXhDLEVBQWlEO0FBQy9DMkksVUFBTTVNLFFBQVE2TSxNQUFSLENBQWU1SSxLQUFmLENBQU47O0FBRUEsUUFBSSxDQUFDLENBQUMsQ0FBQ3lILFdBQVd4TCxPQUFYLENBQW1CME0sR0FBbkIsQ0FBUCxFQUFnQztBQUM5QmQsYUFBTzNMLElBQVAsQ0FBWWtNLE9BQVo7QUFDQUEsZ0JBQVU7QUFBQzNLLFdBQUdrTCxHQUFKO0FBQVNYLGNBQU07QUFBZixPQUFWO0FBQ0QsS0FIRCxNQUdPO0FBQ0xJLGNBQVFKLElBQVIsSUFBZ0JXLEdBQWhCO0FBQ0Q7QUFDRjs7QUFFRGQsU0FBTzNMLElBQVAsQ0FBWWtNLE9BQVo7QUFDQSxTQUFPUCxNQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUZIOztBQUVBLElBQU1nQixhQUFhLGVBQW5CLEMsQ0FBb0M7QUFFcEM7O0FBQ0EsSUFBTUMsT0FBTyxDQUFiO0FBQ0EsSUFBTUMsVUFBVSxDQUFoQixDLENBRUE7O0FBQ08sU0FBU0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBNkI7QUFDbEMsTUFBSTtBQUNGLFFBQU1DLE1BQU1DLEtBQUt2QixLQUFMLENBQVdxQixHQUFYLENBQVo7QUFDQSxXQUFRQyxlQUFldE4sS0FBZixJQUF3QnNOLGVBQWUxTyxNQUF4QyxHQUFrRCxJQUFsRCxHQUF5RCxLQUFoRTtBQUNELEdBSEQsQ0FJQSxPQUFPK00sS0FBUCxFQUFjO0FBQ1osV0FBTyxLQUFQO0FBQ0Q7QUFDRixDLENBRUQ7OztBQUNPLFNBQVN4RCxTQUFULENBQW1CdUMsTUFBbkIsRUFBb0M7QUFDekMsTUFBSWhILE9BQU9yQyxxQkFBWDtBQUNBLE1BQUl2QyxRQUFhNEwsTUFBakI7O0FBQ0EsTUFBRyxPQUFPQSxNQUFQLEtBQW1CLFdBQXRCLEVBQW1DO0FBQ2pDLFdBQU87QUFBQ2hILFlBQU1BLElBQVA7QUFBYTVFLGFBQU80QztBQUFwQixLQUFQO0FBQ0Q7O0FBQ0QsTUFBSXVMLFdBQVdPLElBQVgsQ0FBZ0I5QyxNQUFoQixDQUFKLEVBQTZCO0FBQzNCNUwsWUFBUTRMLE9BQU9ZLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBUjtBQUNELEdBRkQsTUFFTyxJQUFJWixXQUFXLE1BQWYsRUFBdUI7QUFDNUI1TCxZQUFRLElBQVI7QUFDRCxHQUZNLE1BRUEsSUFBSTRMLFdBQVcsT0FBZixFQUF3QjtBQUM3QjVMLFlBQVEsS0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJNEwsV0FBVyxNQUFmLEVBQXVCO0FBQzVCNUwsWUFBUSxJQUFSO0FBQ0QsR0FGTSxNQUVBLElBQUk0TCxXQUFXLFdBQWYsRUFBNEI7QUFDakM1TCxZQUFRNEMsU0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJLENBQUMrTCxNQUFNQyxPQUFPaEQsTUFBUCxDQUFOLENBQUwsRUFBNEI7QUFDakM1TCxZQUFRNE8sT0FBT2hELE1BQVAsQ0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJMEMsT0FBTzFDLE1BQVAsQ0FBSixFQUFvQjtBQUN6QjVMLFlBQVF5TyxLQUFLdkIsS0FBTCxDQUFXdEIsTUFBWCxDQUFSO0FBQ0QsR0FGTSxNQUVBO0FBQ0xoSCxXQUFPcEMsbUJBQVA7QUFDRDs7QUFDRCxTQUFPO0FBQUNvQyxVQUFNQSxJQUFQO0FBQWE1RSxXQUFPQTtBQUFwQixHQUFQO0FBQ0Q7O0FBUUQ7QUFDQTtBQUNBO0FBQ08sU0FBUzZPLGFBQVQsQ0FBdUJ6TCxRQUF2QixFQUF5QzBMLFVBQXpDLEVBQStEO0FBQ3BFLE1BQUkzQixTQUEyQixJQUEvQjtBQUNBLE1BQUk3TSxTQUFTOEMsU0FBUzlDLE1BQXRCO0FBQ0EsTUFBSWdGLFFBQVEsQ0FBWjtBQUNBLE1BQUl5SixZQUFZLENBQWhCO0FBQ0EsTUFBSUMsT0FBT0YsV0FBVyxDQUFYLENBQVg7QUFBQSxNQUEwQkcsUUFBUUgsV0FBVyxDQUFYLENBQWxDOztBQUVBLFNBQU9DLFlBQVl6TyxNQUFuQixFQUEyQjtBQUN6QmdGLFlBQVFsQyxTQUFTN0IsT0FBVCxDQUFpQnlOLElBQWpCLEVBQXVCRCxTQUF2QixDQUFSOztBQUVBLFFBQUl6SixRQUFRLENBQVosRUFBZTtBQUNiLFVBQUk2SCxNQUFKLEVBQVk7QUFDVkEsZUFBTzNMLElBQVAsQ0FBWTtBQUNWb0QsZ0JBQU13SixJQURJO0FBRVZwTyxpQkFBT29ELFNBQVNvSixLQUFULENBQWV1QyxTQUFmO0FBRkcsU0FBWjtBQUlEOztBQUVEO0FBQ0QsS0FURCxNQVNPO0FBQ0w1QixlQUFTQSxVQUFVLEVBQW5COztBQUNBLFVBQUk3SCxRQUFRLENBQVIsSUFBYXlKLFlBQVl6SixLQUE3QixFQUFvQztBQUNsQzZILGVBQU8zTCxJQUFQLENBQVk7QUFDVm9ELGdCQUFNd0osSUFESTtBQUVWcE8saUJBQU9vRCxTQUFTb0osS0FBVCxDQUFldUMsU0FBZixFQUEwQnpKLEtBQTFCO0FBRkcsU0FBWjtBQUlEOztBQUVEeUosa0JBQVl6SixRQUFRMEosS0FBSzFPLE1BQXpCO0FBQ0FnRixjQUFRbEMsU0FBUzdCLE9BQVQsQ0FBaUIwTixLQUFqQixFQUF3QkYsU0FBeEIsQ0FBUjs7QUFFQSxVQUFJekosUUFBUSxDQUFaLEVBQWU7QUFDYixZQUFJNEosWUFBWTlMLFNBQVNvSixLQUFULENBQWV1QyxZQUFZRSxNQUFNM08sTUFBakMsQ0FBaEI7QUFDQSxZQUFJNk8sWUFBWWhDLE9BQU9BLE9BQU83TSxNQUFQLEdBQWdCLENBQXZCLENBQWhCOztBQUVBLFlBQUk2TyxhQUFhQSxVQUFVdkssSUFBVixLQUFtQndKLElBQXBDLEVBQTBDO0FBQ3hDZSxvQkFBVW5QLEtBQVYsSUFBbUJrUCxTQUFuQjtBQUNELFNBRkQsTUFFTztBQUNML0IsaUJBQU8zTCxJQUFQLENBQVk7QUFDVm9ELGtCQUFNd0osSUFESTtBQUVWcE8sbUJBQU9rUDtBQUZHLFdBQVo7QUFJRDs7QUFFRDtBQUNEOztBQUVELFVBQUlsUCxTQUFRb0QsU0FBU29KLEtBQVQsQ0FBZXVDLFNBQWYsRUFBMEJ6SixLQUExQixFQUFpQ2tCLElBQWpDLEVBQVo7O0FBRUEyRyxhQUFPM0wsSUFBUCxDQUFZO0FBQ1ZvRCxjQUFNeUosT0FESTtBQUVWck8sZUFBT0E7QUFGRyxPQUFaO0FBS0ErTyxrQkFBWXpKLFFBQVEySixNQUFNM08sTUFBMUI7QUFDRDtBQUNGOztBQUVELFNBQU82TSxNQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xIRDs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQW1DQTtBQUNBLElBQU1uQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQzdCLE1BQUQsRUFBY3pKLEdBQWQsRUFBMkI7QUFDN0MsTUFBR0EsR0FBSCxFQUFRO0FBQ05JLFdBQU9PLElBQVAsQ0FBWVgsR0FBWixFQUFpQnFCLE9BQWpCLENBQXlCLGVBQU87QUFDOUIsVUFBSSxDQUFDb0ksT0FBTy9DLEdBQVAsQ0FBRCxJQUFnQitDLE9BQU8vQyxHQUFQLE1BQWdCLEVBQXBDLEVBQXdDO0FBQ3RDK0MsZUFBTy9DLEdBQVAsSUFBYzFHLElBQUkwRyxHQUFKLENBQWQ7QUFDRDtBQUNGLEtBSkQ7QUFLRDs7QUFDRCxTQUFPK0MsTUFBUDtBQUNELENBVEQ7O0FBV0EsSUFBTStCLFdBQVc7QUFDZjtBQUNBbkgsV0FBeUJBLGdCQUZWO0FBSWY7QUFDQXNILGNBQTBCLEVBTFg7QUFPZjtBQUNBMUMsY0FBMEJBLHNCQVJYO0FBVWY7QUFDQXFELFlBQXNCO0FBQ3BCLFNBQUsxSjtBQURlLEdBWFA7QUFlZjtBQUNBOE0sV0FBUyxJQWhCTTtBQWtCZmpFLGVBQWEsS0FsQkU7O0FBb0JmLE1BQUljLE1BQUosR0FBYztBQUNaLFdBQU8sS0FBS21ELE9BQVo7QUFDRCxHQXRCYzs7QUF3QmYsTUFBSW5ELE1BQUosQ0FBWWpNLEtBQVosRUFBbUI7QUFDakIsU0FBS29QLE9BQUwsR0FBZXBQLEtBQWY7QUFDQSxTQUFLbUwsV0FBTCxHQUFtQm5MLFFBQVEsR0FBM0I7QUFDRCxHQTNCYzs7QUE2QmY2TyxpQkFBZUEsc0JBN0JBO0FBK0JmeEYsYUFBV0Esa0JBL0JJO0FBaUNmO0FBQ0E2QyxzQkFBb0IsQ0FBQyxHQUFELEVBQU0sR0FBTixDQWxDTDtBQW9DZjtBQUNBQyxpQkFBZSxHQXJDQTtBQXVDZjtBQUNBdEIsZUFBYSxJQXhDRTs7QUEwQ2Y7Ozs7QUFJQTFHLFNBOUNlO0FBOENHO0FBQW1Ca0wsU0E5Q3RCLEVBOENvQ2xGLEVBOUNwQyxFQThDK0NsSCxPQTlDL0MsRUE4Q2lFO0FBQzlFO0FBQ0EsU0FBS21ILElBQUwsQ0FBVWlGLE9BQVYsRUFBbUJsRixFQUFuQixFQUF1QmxILFFBQVFNLElBQVIsQ0FBYUwsTUFBcEM7QUFDRCxHQWpEYzs7QUFtRGY7Ozs7QUFJQW9NLGdCQXZEZSwwQkF1RGVqTSxFQXZEZixFQXVEZ0NyRCxLQXZEaEMsRUF1RDRDO0FBQ3pELFFBQUcsQ0FBQyxLQUFLNEUsSUFBVCxFQUFlO0FBQ2IsWUFBTSxJQUFJZixLQUFKLENBQVUsOEJBQThCLEtBQUtlLElBQTdDLENBQU47QUFDRDs7QUFDRCxRQUFJNUUsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCcUQsU0FBR3VFLFlBQUgsQ0FBZ0IsS0FBS2hELElBQXJCLEVBQTJCNUUsS0FBM0I7QUFDRCxLQUZELE1BRU87QUFDTHFELFNBQUdrTSxlQUFILENBQW1CLEtBQUszSyxJQUF4QjtBQUNEO0FBQ0YsR0FoRWM7O0FBa0VmOzs7O0FBSUE0SyxXQXRFZSxxQkFzRUwvTCxPQXRFSyxFQXNFUztBQUFBOztBQUN0QixRQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaO0FBQ0Q7O0FBRUQzRCxXQUFPTyxJQUFQLENBQVlvRCxPQUFaLEVBQXFCMUMsT0FBckIsQ0FBNkIsa0JBQVU7QUFDckMsVUFBSWYsUUFBUXlELFFBQVFxRSxNQUFSLENBQVo7O0FBQ0EsY0FBT0EsTUFBUDtBQUNFLGFBQUssU0FBTDtBQUNFa0Qsc0JBQVksTUFBS2pILE9BQWpCLEVBQTBCL0QsS0FBMUI7QUFDRjs7QUFDQSxhQUFLLFlBQUw7QUFDRWdMLHNCQUFZLE1BQUtyQyxVQUFqQixFQUE2QjNJLEtBQTdCO0FBQ0Y7O0FBQ0EsYUFBSyxZQUFMO0FBQ0VnTCxzQkFBWSxNQUFLSyxVQUFqQixFQUE2QnJMLEtBQTdCO0FBQ0Y7O0FBQ0EsYUFBSyxVQUFMO0FBQ0VnTCxzQkFBWSxNQUFLZ0IsUUFBakIsRUFBMkJoTSxLQUEzQjtBQUNGOztBQUNBLGFBQUssU0FBTDtBQUNFZ0wsc0JBQVksTUFBS2dCLFFBQWpCLEVBQTJCaE0sS0FBM0I7QUFDRjs7QUFDQSxhQUFLLFFBQUw7QUFDRSxnQkFBS2lNLE1BQUwsR0FBY2pNLEtBQWQ7QUFDQTs7QUFDRixhQUFLLGVBQUw7QUFDRSxnQkFBSzZPLGFBQUwsR0FBcUI3TyxLQUFyQjtBQUNBOztBQUNGLGFBQUssV0FBTDtBQUNFLGdCQUFLcUosU0FBTCxHQUFpQnJKLEtBQWpCO0FBQ0E7O0FBQ0YsYUFBSyxRQUFMO0FBQ0UsZ0JBQUtpTSxNQUFMLEdBQWNqTSxLQUFkO0FBQ0E7O0FBQ0YsYUFBSyxvQkFBTDtBQUNFLGdCQUFLa00sa0JBQUwsR0FBMEJsTSxLQUExQjtBQUNBOztBQUNGLGFBQUssZUFBTDtBQUNFLGdCQUFLbU0sYUFBTCxHQUFxQm5NLEtBQXJCO0FBQ0E7O0FBQ0YsYUFBSyxhQUFMO0FBQ0UsZ0JBQUs2SyxXQUFMLEdBQW1CN0ssS0FBbkI7QUFDQTs7QUFDRjtBQUNFNEcsa0JBQVE2SSxJQUFSLENBQWEsc0JBQWIsRUFBcUMzSCxNQUFyQyxFQUE2QzlILEtBQTdDO0FBQ0Y7QUF2Q0Y7QUF5Q0QsS0EzQ0Q7QUE0Q0QsR0F2SGM7QUF5SGY7QUFDQTtBQUNBMFAsUUFBTSxjQUFDQyxZQUFELEVBQXVCdE0sRUFBdkIsRUFBc0Q7QUFBQSxRQUFkOEMsSUFBYyx1RUFBUCxFQUFPOztBQUMxRCxRQUFJLENBQUM5QyxFQUFMLEVBQVM7QUFDUEEsV0FBS3FCLFNBQVNrTCxhQUFULENBQXVCLEtBQXZCLENBQUw7QUFDRDs7QUFFRCxRQUFNeEUsWUFBWUYsU0FBU0csVUFBVCxDQUFvQnNFLFlBQXBCLENBQWxCO0FBQ0F0TSxPQUFHeUQsU0FBSCxHQUFlc0UsVUFBVWhJLFFBQVYsQ0FBbUJnSCxJQUFuQixDQUF3QmMsUUFBeEIsRUFBa0M3SCxFQUFsQyxDQUFmO0FBQ0EsUUFBSWtDLFFBQVE2RixVQUFVaUIsVUFBVixDQUFxQmpDLElBQXJCLENBQTBCYyxRQUExQixFQUFvQzdILEVBQXBDLEVBQXdDOEMsSUFBeEMsQ0FBWjtBQUVBLFFBQUk1QyxPQUFPMkgsU0FBU3hILElBQVQsQ0FBY0wsRUFBZCxFQUFrQmtDLEtBQWxCLENBQVg7QUFDQWhDLFNBQUtHLElBQUw7QUFDQSxXQUFPSCxJQUFQO0FBQ0QsR0F2SWM7QUF5SWY7QUFDQUcsUUFBTSxjQUFDTCxFQUFELEVBQWtCSCxNQUFsQixFQUErQk8sT0FBL0IsRUFBMkQ7QUFDL0QsUUFBSW9NLGNBQTRCO0FBQzlCO0FBQ0E5TCxlQUF5QmpFLE9BQU9pTSxNQUFQLENBQWMsSUFBZCxDQUZLO0FBRzlCcEQsa0JBQTBCN0ksT0FBT2lNLE1BQVAsQ0FBYyxJQUFkLENBSEk7QUFJOUJWLGtCQUEwQnZMLE9BQU9pTSxNQUFQLENBQWMsSUFBZCxDQUpJO0FBSzlCQyxnQkFBc0JsTSxPQUFPaU0sTUFBUCxDQUFjLElBQWQsQ0FMUTtBQU05QjtBQUNBK0QsbUJBQWFoUSxPQUFPaU0sTUFBUCxDQUFjLElBQWQsQ0FQaUI7QUFROUI7QUFDQUkscUJBQXNCck0sT0FBT2lNLE1BQVAsQ0FBYyxJQUFkO0FBVFEsS0FBaEM7QUFXQTdJLGFBQVNBLFVBQVVwRCxPQUFPaU0sTUFBUCxDQUFjLElBQWQsQ0FBbkIsQ0FaK0QsQ0FhL0Q7O0FBRUEsUUFBR3RJLE9BQUgsRUFBWTtBQUNWdUgsa0JBQVk2RSxZQUFZOUwsT0FBeEIsRUFBaUNOLFFBQVFNLE9BQXpDO0FBQ0FpSCxrQkFBWTZFLFlBQVlsSCxVQUF4QixFQUFvQ2xGLFFBQVFrRixVQUE1QztBQUNBcUMsa0JBQVk2RSxZQUFZeEUsVUFBeEIsRUFBb0M1SCxRQUFRNEgsVUFBNUM7QUFDQUwsa0JBQVk2RSxZQUFZN0QsUUFBeEIsRUFBa0N2SSxRQUFRdUksUUFBMUM7QUFDRDs7QUFFRDZELGdCQUFZNUQsTUFBWixHQUFxQnhJLFdBQVdBLFFBQVF3SSxNQUFuQixHQUE0QnhJLFFBQVF3SSxNQUFwQyxHQUE2Q2YsU0FBU2UsTUFBM0U7QUFDQTRELGdCQUFZM0Qsa0JBQVosR0FBaUN6SSxXQUFXQSxRQUFReUksa0JBQW5CLEdBQXdDekksUUFBUXlJLGtCQUFoRCxHQUFxRWhCLFNBQVNnQixrQkFBL0c7QUFDQTJELGdCQUFZMUQsYUFBWixHQUE0QjFJLFdBQVdBLFFBQVEwSSxhQUFuQixHQUFtQzFJLFFBQVEwSSxhQUEzQyxHQUEyRGpCLFNBQVNpQixhQUFoRztBQUNBMEQsZ0JBQVloRixXQUFaLEdBQTBCcEgsV0FBV0EsUUFBUW9ILFdBQW5CLEdBQWlDcEgsUUFBUW9ILFdBQXpDLEdBQXVESyxTQUFTTCxXQUExRjtBQUNBZ0YsZ0JBQVkxTCxPQUFaLEdBQXNCVixXQUFXQSxRQUFRVSxPQUFuQixHQUE2QlYsUUFBUVUsT0FBckMsR0FBK0MrRyxTQUFTL0csT0FBOUUsQ0ExQitELENBNEIvRDs7QUFDQTZHLGdCQUFZNkUsWUFBWTlMLE9BQXhCLEVBQWlDbUgsU0FBU25ILE9BQTFDO0FBQ0FpSCxnQkFBWTZFLFlBQVlsSCxVQUF4QixFQUFvQ3VDLFNBQVN2QyxVQUE3QztBQUNBcUMsZ0JBQVk2RSxZQUFZeEUsVUFBeEIsRUFBb0NILFNBQVNHLFVBQTdDO0FBQ0FMLGdCQUFZNkUsWUFBWTdELFFBQXhCLEVBQWtDZCxTQUFTYyxRQUEzQyxFQWhDK0QsQ0FrQy9EOztBQUNBNkQsZ0JBQVlDLFdBQVosR0FBMEJoUSxPQUFPTyxJQUFQLENBQVl3UCxZQUFZOUwsT0FBeEIsRUFBaUNnTSxNQUFqQyxDQUF3QyxVQUFVM0osR0FBVixFQUFlO0FBQy9FLGFBQU9BLElBQUk3RSxPQUFKLENBQVksR0FBWixJQUFtQixDQUExQjtBQUNELEtBRnlCLENBQTFCOztBQUlBc0gsdUJBQVNtSCxhQUFULENBQXVCSCxXQUF2Qjs7QUFFQSxRQUFJdE0sT0FBTyxJQUFJQyxVQUFKLENBQVNILEVBQVQsRUFBYUgsTUFBYixFQUFxQjJNLFdBQXJCLENBQVg7QUFDQXRNLFNBQUtHLElBQUw7QUFDQSxXQUFPSCxJQUFQO0FBQ0Q7QUF0TGMsQ0FBakI7O2VBMkxlMkgsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqUGY7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFRQSxJQUFNK0UsYUFBb0M7QUFDeEMzTCxXQUFTLGlCQUFDNEwsSUFBRCxFQUFxQmxRLEtBQXJCLEVBQXVDO0FBQzlDa1EsU0FBSy9KLElBQUwsR0FBYW5HLFNBQVMsSUFBVixHQUFrQkEsS0FBbEIsR0FBMEIsRUFBdEM7QUFDRDtBQUh1QyxDQUExQztBQU1BLElBQU1tUSxvQkFBb0IsOERBQTFCOztBQUVBLElBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDN00sSUFBRCxFQUFhMk0sSUFBYixFQUFvQztBQUNwRCxNQUFJekwsUUFBZ0IsS0FBcEIsQ0FEb0QsQ0FHcEQ7O0FBQ0F5TCxTQUFTQSxJQUFUOztBQUNBLE1BQUlBLEtBQUtHLFFBQUwsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsUUFBRyxDQUFDSCxLQUFLL0osSUFBVCxFQUFlO0FBQ2IsWUFBTSxJQUFJdEMsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDs7QUFDRCxRQUFJc0osU0FBUyw0QkFBYytDLEtBQUsvSixJQUFuQixFQUF5QitFLG1CQUFTZ0Isa0JBQWxDLENBQWI7O0FBRUEsUUFBSWlCLE1BQUosRUFBWTtBQUNWLFVBQUcsQ0FBQytDLEtBQUt0TSxVQUFULEVBQXFCO0FBQ25CLGNBQU0sSUFBSUMsS0FBSixDQUFVLHlCQUFWLENBQU47QUFDRDs7QUFDRCxXQUFLLElBQUlkLElBQUksQ0FBYixFQUFnQkEsSUFBSW9LLE9BQU83TSxNQUEzQixFQUFtQ3lDLEdBQW5DLEVBQXdDO0FBQ3RDLFlBQUlnRyxRQUFRb0UsT0FBT3BLLENBQVAsQ0FBWjtBQUNBLFlBQUkwRCxPQUFPL0IsU0FBUzRMLGNBQVQsQ0FBd0J2SCxNQUFNL0ksS0FBOUIsQ0FBWDtBQUNBa1EsYUFBS3RNLFVBQUwsQ0FBZ0JFLFlBQWhCLENBQTZCMkMsSUFBN0IsRUFBbUN5SixJQUFuQzs7QUFDQSxZQUFJbkgsTUFBTW5FLElBQU4sS0FBZSxDQUFuQixFQUFzQjtBQUNwQnJCLGVBQUtnTixZQUFMLENBQWtCOUosSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEJzQyxNQUFNL0ksS0FBcEMsRUFBMkNpUSxVQUEzQyxFQUF1RCxJQUF2RDtBQUNEO0FBQ0Y7O0FBQ0RDLFdBQUt0TSxVQUFMLENBQWdCa0IsV0FBaEIsQ0FBNEJvTCxJQUE1QjtBQUNEOztBQUNEekwsWUFBUSxJQUFSO0FBQ0QsR0FyQkQsTUFxQk8sSUFBSXlMLEtBQUtHLFFBQUwsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDOUI1TCxZQUFRbEIsS0FBS2lOLFFBQUwsQ0FBY04sSUFBZCxDQUFSO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDekwsS0FBTCxFQUFZO0FBQ1YsUUFBR3lMLEtBQUt6RCxVQUFSLEVBQW9CO0FBQ2xCLFdBQUssSUFBSTFKLEtBQUksQ0FBYixFQUFnQkEsS0FBSW1OLEtBQUt6RCxVQUFMLENBQWdCbk0sTUFBcEMsRUFBNEN5QyxJQUE1QyxFQUFpRDtBQUMvQ3FOLGtCQUFVN00sSUFBVixFQUFpQjJNLEtBQUt6RCxVQUFMLENBQWdCMUosRUFBaEIsQ0FBakI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixDQXJDRDs7QUF1Q0EsSUFBTTBOLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLENBQUQsRUFBYUMsQ0FBYixFQUE0QjtBQUNwRCxNQUFJQyxZQUFZRixFQUFFaEksTUFBRixHQUFhZ0ksRUFBRWhJLE1BQUgsQ0FBaUN6RSxRQUFqQyxJQUE2QyxDQUF6RCxHQUE4RCxDQUE5RTtBQUNBLE1BQUk0TSxZQUFZRixFQUFFakksTUFBRixHQUFhaUksRUFBRWpJLE1BQUgsQ0FBaUN6RSxRQUFqQyxJQUE2QyxDQUF6RCxHQUE4RCxDQUE5RTtBQUNBLFNBQU80TSxZQUFZRCxTQUFuQjtBQUNELENBSkQ7O0FBTUEsSUFBTUUsVUFBVSxTQUFWQSxPQUFVLENBQUN2QyxHQUFELEVBQWlCO0FBQy9CLFNBQU9BLElBQUkvSCxJQUFKLEVBQVA7QUFDRCxDQUZELEMsQ0FJQTs7O0lBQ2FoRCxJOzs7QUFRWDtBQUNBO0FBQ0E7QUFDQSxnQkFBWWtDLEdBQVosRUFBc0R4QyxNQUF0RCxFQUFtRU8sT0FBbkUsRUFBMEY7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSxzQ0FOcEUsRUFNb0U7O0FBQUEsMkNBTDdELElBSzZEOztBQUN4RixRQUFJaUMsZUFBZXhFLEtBQW5CLEVBQTBCO0FBQ3hCLFdBQUt3RSxHQUFMLEdBQVdBLEdBQVg7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLQSxHQUFMLEdBQVksQ0FBQ0EsR0FBRCxDQUFaO0FBQ0Q7O0FBQ0RrQixZQUFRQyxHQUFSLENBQVksY0FBWixFQUE0QnBELE9BQTVCO0FBQ0EsU0FBS1AsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS08sT0FBTCxHQUFlQSxPQUFmO0FBRUEsU0FBS3NOLEtBQUw7QUFDRDs7OztpQ0FFbUJiLEksRUFBMEJ0TCxJLEVBQXFCK0UsVyxFQUFxQmpCLE0sRUFBcUI5SCxJLEVBQXVCO0FBQ2xJLFVBQUlvUSxVQUFVckgsWUFBWUMsS0FBWixDQUFrQnVHLGlCQUFsQixDQUFkOztBQUNBLFVBQUdhLFlBQVksSUFBZixFQUFxQjtBQUNuQixjQUFNLElBQUluTixLQUFKLENBQVUsWUFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBSW9OLFFBQVFELFFBQVF0USxHQUFSLENBQVlvUSxPQUFaLENBQVo7QUFDQSxVQUFJelAsVUFBVTRQLE1BQU1wSCxLQUFOLE1BQWlCLElBQS9CO0FBQ0EsV0FBSzVELFFBQUwsQ0FBY3pFLElBQWQsQ0FBbUIsSUFBSWlILGdCQUFKLENBQWEsSUFBYixFQUE2QnlILElBQTdCLEVBQW1EdEwsSUFBbkQsRUFBeUR2RCxPQUF6RCxFQUFrRXFILE1BQWxFLEVBQTBFOUgsSUFBMUUsRUFBZ0ZxUSxLQUFoRixDQUFuQjtBQUNELEssQ0FFRDtBQUNBOzs7OzRCQUNRO0FBQ04sV0FBS2hMLFFBQUwsR0FBZ0IsRUFBaEI7QUFFQSxVQUFJaUwsV0FBVyxLQUFLeEwsR0FBcEI7QUFBQSxVQUF5QjNDLENBQXpCO0FBQUEsVUFBNEJ1SSxHQUE1Qjs7QUFDQSxXQUFLdkksSUFBSSxDQUFKLEVBQU91SSxNQUFNNEYsU0FBUzVRLE1BQTNCLEVBQW1DeUMsSUFBSXVJLEdBQXZDLEVBQTRDdkksR0FBNUMsRUFBaUQ7QUFDL0NxTixrQkFBVSxJQUFWLEVBQWlCYyxTQUFTbk8sQ0FBVCxDQUFqQjtBQUNEOztBQUVELFdBQUtrRCxRQUFMLENBQWNrTCxJQUFkLENBQW1CVixpQkFBbkI7QUFDRDs7OzZCQUVRUCxJLEVBQTZCO0FBQ3BDLFVBQUl4RSxnQkFBZ0JSLG1CQUFTQyxXQUE3QjtBQUNBLFVBQUkxRyxRQUFReUwsS0FBS2xLLFFBQUwsS0FBa0IsUUFBbEIsSUFBOEJrSyxLQUFLbEssUUFBTCxLQUFrQixPQUE1RDtBQUNBLFVBQUl1RixhQUFhMkUsS0FBSzNFLFVBQXRCO0FBQ0EsVUFBSTZGLFlBQVksRUFBaEI7QUFDQSxVQUFJdEIsY0FBYyxLQUFLck0sT0FBTCxDQUFhcU0sV0FBL0I7QUFDQSxVQUFJbEwsSUFBSixFQUFVOEQsTUFBVixFQUFrQjJJLFVBQWxCLEVBQThCelEsSUFBOUI7O0FBR0EsV0FBSyxJQUFJbUMsSUFBSSxDQUFSLEVBQVd1SSxNQUFNQyxXQUFXakwsTUFBakMsRUFBeUN5QyxJQUFJdUksR0FBN0MsRUFBa0R2SSxHQUFsRCxFQUF1RDtBQUNyRCxZQUFJeUksWUFBWUQsV0FBV3hJLENBQVgsQ0FBaEIsQ0FEcUQsQ0FFckQ7O0FBQ0EsWUFBSXlJLFVBQVVDLElBQVYsQ0FBZWxLLE9BQWYsQ0FBdUJtSyxhQUF2QixNQUEwQyxDQUE5QyxFQUFpRDtBQUMvQzlHLGlCQUFPNEcsVUFBVUMsSUFBVixDQUFlZSxLQUFmLENBQXFCZCxjQUFjcEwsTUFBbkMsQ0FBUDtBQUNBb0ksbUJBQVMsS0FBS2pGLE9BQUwsQ0FBYU0sT0FBYixDQUFxQmEsSUFBckIsQ0FBVDtBQUNBaEUsaUJBQU8sRUFBUDs7QUFFQSxjQUFJLENBQUM4SCxNQUFMLEVBQWE7QUFDWCxpQkFBSyxJQUFJMUgsSUFBSSxDQUFiLEVBQWdCQSxJQUFJOE8sWUFBWXhQLE1BQWhDLEVBQXdDVSxHQUF4QyxFQUE2QztBQUMzQ3FRLDJCQUFhdkIsWUFBWTlPLENBQVosQ0FBYjs7QUFDQSxrQkFBSTRELEtBQUs0SCxLQUFMLENBQVcsQ0FBWCxFQUFjNkUsV0FBVy9RLE1BQVgsR0FBb0IsQ0FBbEMsTUFBeUMrUSxXQUFXN0UsS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLENBQTdDLEVBQXNFO0FBQ3BFOUQseUJBQVMsS0FBS2pGLE9BQUwsQ0FBYU0sT0FBYixDQUFxQnNOLFVBQXJCLENBQVQ7QUFDQXpRLHFCQUFLWSxJQUFMLENBQVVvRCxLQUFLNEgsS0FBTCxDQUFXNkUsV0FBVy9RLE1BQVgsR0FBb0IsQ0FBL0IsQ0FBVjtBQUNBO0FBQ0Q7QUFDRjtBQUNGOztBQUVELGNBQUksQ0FBQ29JLE1BQUwsRUFBYTtBQUNYQSxxQkFBU3dDLG1CQUFTb0UsY0FBbEI7QUFDRDs7QUFFRCxjQUFLNUcsTUFBRCxDQUErQmpFLEtBQW5DLEVBQTBDO0FBQ3hDLGlCQUFLOEwsWUFBTCxDQUFrQkwsSUFBbEIsRUFBd0J0TCxJQUF4QixFQUE4QjRHLFVBQVV4TCxLQUF4QyxFQUErQzBJLE1BQS9DLEVBQXVEOUgsSUFBdkQ7QUFDQXNQLGlCQUFLWCxlQUFMLENBQXFCL0QsVUFBVUMsSUFBL0I7QUFDQSxtQkFBTyxJQUFQO0FBQ0Q7O0FBRUQyRixvQkFBVTVQLElBQVYsQ0FBZTtBQUFDOFAsa0JBQU05RixTQUFQO0FBQWtCOUMsb0JBQVFBLE1BQTFCO0FBQWtDOUQsa0JBQU1BLElBQXhDO0FBQThDaEUsa0JBQU1BO0FBQXBELFdBQWY7QUFDRDtBQUNGOztBQUVELFdBQUssSUFBSW1DLE1BQUksQ0FBYixFQUFnQkEsTUFBSXFPLFVBQVU5USxNQUE5QixFQUFzQ3lDLEtBQXRDLEVBQTJDO0FBQ3pDLFlBQUl3TyxXQUFXSCxVQUFVck8sR0FBVixDQUFmO0FBQ0EsYUFBS3dOLFlBQUwsQ0FBa0JMLElBQWxCLEVBQXdCcUIsU0FBUzNNLElBQWpDLEVBQXVDMk0sU0FBU0QsSUFBVCxDQUFjdFIsS0FBckQsRUFBNER1UixTQUFTN0ksTUFBckUsRUFBNkU2SSxTQUFTM1EsSUFBdEY7QUFDQXNQLGFBQUtYLGVBQUwsQ0FBcUJnQyxTQUFTRCxJQUFULENBQWM3RixJQUFuQztBQUNELE9BOUNtQyxDQWdEcEM7OztBQUNBLFVBQUksQ0FBQ2hILEtBQUwsRUFBWTtBQUNWRyxlQUFPc0wsS0FBS2xLLFFBQUwsQ0FBY3dMLFdBQWQsRUFBUDs7QUFFQSxZQUFJLEtBQUsvTixPQUFMLENBQWE0SCxVQUFiLENBQXdCekcsSUFBeEIsS0FBaUMsQ0FBQ3NMLEtBQUt1QixNQUEzQyxFQUFtRDtBQUNqRCxlQUFLeEwsUUFBTCxDQUFjekUsSUFBZCxDQUFtQixJQUFJeUosa0NBQUosQ0FBc0IsSUFBdEIsRUFBcUNpRixJQUFyQyxFQUEyQ3RMLElBQTNDLENBQW5CO0FBQ0FILGtCQUFRLElBQVI7QUFDRDtBQUNGOztBQUVELGFBQU9BLEtBQVA7QUFDRCxLLENBRUQ7Ozs7MkJBQ087QUFDTCxXQUFLd0IsUUFBTCxDQUFjbEYsT0FBZCxDQUFzQixtQkFBVztBQUMvQmtDLGdCQUFRUyxJQUFSO0FBQ0QsT0FGRDtBQUdELEssQ0FFRDs7Ozs2QkFDUztBQUNQLFVBQUd4QyxNQUFNK0QsT0FBTixDQUFjLEtBQUtnQixRQUFuQixDQUFILEVBQWlDO0FBQy9CLGFBQUtBLFFBQUwsQ0FBY2xGLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0JrQyxrQkFBUW1CLE1BQVI7QUFDRCxTQUZEO0FBR0Q7O0FBQ0QsVUFBRyxLQUFLZ0ksYUFBUixFQUF1QjtBQUNyQixhQUFLQSxhQUFMLENBQW1CaEksTUFBbkI7QUFDRDtBQUNGLEssQ0FFRDs7OzsyQkFDTztBQUNMLFdBQUs2QixRQUFMLENBQWNsRixPQUFkLENBQXNCLG1CQUFXO0FBQy9Ca0MsZ0JBQVE3QixJQUFSO0FBQ0QsT0FGRDtBQUdELEssQ0FFRDs7Ozs4QkFDVTtBQUNSLFdBQUs2RSxRQUFMLENBQWNsRixPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUlrQyxRQUFReUYsTUFBUixJQUFtQnpGLFFBQVF5RixNQUFULENBQXVDcEIsU0FBN0QsRUFBd0U7QUFDdEVyRSxrQkFBUXVFLE9BQVI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLLENBRUQ7Ozs7NkJBQ3lCO0FBQUE7O0FBQUEsVUFBbEJ0RSxNQUFrQix1RUFBSixFQUFJO0FBQ3ZCcEQsYUFBT08sSUFBUCxDQUFZNkMsTUFBWixFQUFvQm5DLE9BQXBCLENBQTRCLGVBQU87QUFDakMsY0FBS21DLE1BQUwsQ0FBWWtELEdBQVosSUFBbUJsRCxPQUFPa0QsR0FBUCxDQUFuQjtBQUNELE9BRkQ7QUFJQSxXQUFLSCxRQUFMLENBQWNsRixPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUlrQyxRQUFRaUQsTUFBWixFQUFvQjtBQUNsQmpELGtCQUFRaUQsTUFBUixDQUFlaEQsTUFBZjtBQUNEO0FBQ0YsT0FKRDtBQUtEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbnliaW5kLnRzXCIpO1xuIiwiaW1wb3J0IHsgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cbi8vIFRoZSBkZWZhdWx0IGAuYCBhZGFwdGVyIHRoYXQgY29tZXMgd2l0aCB0aW55YmluZC5qcy4gQWxsb3dzIHN1YnNjcmliaW5nIHRvXG4vLyBwcm9wZXJ0aWVzIG9uIHBsYWluIG9iamVjdHMsIGltcGxlbWVudGVkIGluIEVTNSBuYXRpdmVzIHVzaW5nXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cblxuY29uc3QgQVJSQVlfTUVUSE9EUyA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NwbGljZSdcbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlZiB7XG4gIGNhbGxiYWNrczogYW55W107XG4gIHBvaW50ZXJzOiBhbnlbXTtcbn1cblxuLyoqXG4gKiBUT0RPIEZvciB3aGF0IGlzIHRoaXM/XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJWQXJyYXkgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgX19ydjogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBZGFwdGVyRnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgd2Vha21hcDogYW55O1xuICB3ZWFrUmVmZXJlbmNlOiAob2JqOiBhbnkpID0+IGFueTsgLy8gPT4gX19ydiA/XG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlOiAocmVmOiBJUmVmLCBpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBzdHViRnVuY3Rpb246IChvYmo6IGFueSwgZm46IHN0cmluZykgPT4gYW55IC8vID0+IHJlc3BvbnNlID9cbiAgb2JzZXJ2ZU11dGF0aW9uczogKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICB1bm9ic2VydmVNdXRhdGlvbnM6IChvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICBvYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4gdm9pZDsgXG4gIHVub2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7XG4gIGdldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpID0+IGFueTtcbiAgc2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUFkYXB0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIGltcGxlbWVudHMgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXIgPSAwO1xuICB3ZWFrbWFwOmFueSA9IHt9O1xuXG4gIHdlYWtSZWZlcmVuY2Uob2JqOiBhbnkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnX19ydicpKSB7XG4gICAgICBsZXQgaWQgPSB0aGlzLmNvdW50ZXIrKztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcnYnLCB7XG4gICAgICAgIHZhbHVlOiBpZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndlYWttYXBbb2JqLl9fcnZdKSB7XG4gICAgICB0aGlzLndlYWttYXBbb2JqLl9fcnZdID0ge1xuICAgICAgICBjYWxsYmFja3M6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuICB9XG5cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2UocmVmOiBJUmVmLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyhyZWYuY2FsbGJhY2tzKS5sZW5ndGgpIHtcbiAgICAgIGlmICghKHJlZi5wb2ludGVycyAmJiBPYmplY3Qua2V5cyhyZWYucG9pbnRlcnMpLmxlbmd0aCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2Vha21hcFtpZF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3R1YkZ1bmN0aW9uKG9iajogYW55LCBmbjogc3RyaW5nKSB7XG4gICAgbGV0IG9yaWdpbmFsID0gb2JqW2ZuXTtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG4gICAgbGV0IHdlYWttYXAgPSB0aGlzLndlYWttYXA7XG5cbiAgICBvYmpbZm5dID0gKC4uLmFyZ3M6IGFueVtdKTogQWRhcHRlckZ1bmN0aW9uID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IG9yaWdpbmFsLmFwcGx5KG9iaiwgYXJncyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG1hcC5wb2ludGVycykuZm9yRWFjaChyID0+IHtcbiAgICAgICAgbGV0IGsgPSBtYXAucG9pbnRlcnNbcl07XG5cbiAgICAgICAgaWYgKHdlYWttYXBbcl0pIHtcbiAgICAgICAgICBpZiAod2Vha21hcFtyXS5jYWxsYmFja3Nba10gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgd2Vha21hcFtyXS5jYWxsYmFja3Nba10uZm9yRWFjaCgoY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjay5zeW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcbiAgfVxuXG4gIG9ic2VydmVNdXRhdGlvbnMob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdW5vYnNlcnZlTXV0YXRpb25zKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEFycmF5KSAmJiAob2JqLl9fcnYgIT0gbnVsbCkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGxldCBwb2ludGVycyA9IG1hcC5wb2ludGVyc1tyZWZdO1xuXG4gICAgICAgIGlmIChwb2ludGVycykge1xuICAgICAgICAgIGxldCBpZHggPSBwb2ludGVycy5pbmRleE9mKGtleXBhdGgpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5wb2ludGVyc1tyZWZdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWU6IGFueTtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaikuY2FsbGJhY2tzO1xuXG4gICAgaWYgKCFjYWxsYmFja3Nba2V5cGF0aF0pIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXSA9IFtdO1xuICAgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5cGF0aCk7XG5cbiAgICAgIGlmICghZGVzYyB8fCAhKGRlc2MuZ2V0IHx8IGRlc2Muc2V0IHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmpba2V5cGF0aF07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5cGF0aCwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKHZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYjogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNiLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhuZXdWYWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tzW2tleXBhdGhdLmluZGV4T2YoY2FsbGJhY2spID09PSAtMSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgfVxuXG4gIHVub2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG9ialtrZXlwYXRoXTtcbiAgfVxuXG4gIHNldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgb2JqW2tleXBhdGhdID0gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBuZXcgQWRhcHRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiLyoqXG4gKiBBdHRyaWJpdXRlIHR5b2VzXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNSVRJVkUgPSAwO1xuZXhwb3J0IGNvbnN0IEtFWVBBVEggPSAxO1xuXG5leHBvcnQgaW50ZXJmYWNlIElLZXlwYXRocyB7XG4gIFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHJpbWl0aXZlcyB7XG4gIFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9QUk9QRVJUWU5BTUUgPSAnX2JpbmRlcic7IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcblxuLyoqXG4gKiBPbmUgd2F5IGJpbmRlciBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IHR5cGUgSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+ID0gKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRvIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+IHtcbiAgcm91dGluZTogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuICBiaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1bmJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVwZGF0ZT86ICh0aGlzOiBCaW5kaW5nLCBtb2RlbDogYW55KSA9PiB2b2lkO1xuICBnZXRWYWx1ZT86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgYmxvY2s/OiBib29sZWFuO1xuICBmdW5jdGlvbj86IGJvb2xlYW47XG4gIHB1Ymxpc2hlcz86IGJvb2xlYW47XG4gIHByaW9yaXR5PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gc2F2ZSBjdXN0b20gZGF0YSBpbiB0aGlzIHVzZSB0aGlzIG9iamVjdFxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJpbmRlciBjYW4gYmUgYSBvbmUgd2F5IGJpbmRlciBvciBhIHR3byB3YXkgYmluZGVyXG4gKi9cbmV4cG9ydCB0eXBlIEJpbmRlcjxWYWx1ZVR5cGU+ID0gSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+IHwgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+XG5cbi8qKlxuICogQSBsaXN0IG9mIGJpbmRlcnMgd2l0aCBhbnkga2V5IG5hbWVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQmluZGVyczxWYWx1ZVR5cGU+IHtcbiAgW25hbWU6IHN0cmluZ106IEJpbmRlcjxWYWx1ZVR5cGU+O1xufVxuXG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG46IG51bWJlciwgY2I6KCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVZpZXcgPSAoYmluZGluZzogQmluZGluZywgbW9kZWxzOiBhbnksIGFuY2hvckVsOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSA9PiB7XG4gIGxldCB0ZW1wbGF0ZSA9IGJpbmRpbmcuZWwuY2xvbmVOb2RlKHRydWUpO1xuICBsZXQgdmlldyA9IG5ldyBWaWV3KCh0ZW1wbGF0ZSBhcyBOb2RlKSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZighYmluZGluZyB8fCAhYmluZGluZy5tYXJrZXIgfHwgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUgZm9yIGJpbmRpbmchJyk7XG4gIH1cblxuICBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yRWwpO1xuXG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzOiBJQmluZGVyczxhbnk+ID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55IC8qVE9ETyovKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1c3RvbURhdGEuaGFuZGxlciA9IHRoaXMuZXZlbnRIYW5kbGVyKHZhbHVlKTtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBpdGVyYXRlZDogPFZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpICA9PiB7XG4gICAgICAgICAgdmlldy5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbCwgY29sbGVjdGlvbikge1xuICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIHNjb3BlW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgc2NvcGVbbW9kZWxOYW1lXSA9IG1vZGVsO1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtpbmRleF07XG5cbiAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgbGV0IHByZXZpb3VzOiBDb21tZW50IHwgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXMgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCAtIDFdLmVsc1swXTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5tYXJrZXIpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5tYXJrZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2aWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgcHJldmlvdXMubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wdXNoKHZpZXcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aWV3Lm1vZGVsc1ttb2RlbE5hbWVdICE9PSBtb2RlbCkge1xuICAgICAgICAgICAgLy8gc2VhcmNoIGZvciBhIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBtb2RlbFxuICAgICAgICAgICAgbGV0IG1hdGNoSW5kZXgsIG5leHRWaWV3O1xuICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxOyBuZXh0SW5kZXggPCB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICAgICAgICBuZXh0VmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAobmV4dFZpZXcubW9kZWxzW21vZGVsTmFtZV0gPT09IG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBtb2RlbCBpcyBpbiBvdGhlciBwb3NpdGlvblxuICAgICAgICAgICAgICAvLyB0b2RvOiBjb25zaWRlciBhdm9pZGluZyB0aGUgc3BsaWNlIGhlcmUgYnkgc2V0dGluZyBhIGZsYWdcbiAgICAgICAgICAgICAgLy8gcHJvZmlsZSBwZXJmb3JtYW5jZSBiZWZvcmUgaW1wbGVtZW50aW5nIHN1Y2ggY2hhbmdlXG4gICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5zcGxpY2UobWF0Y2hJbmRleCwgMSk7XG4gICAgICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5leHRWaWV3LmVsc1swXSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgICBuZXh0Vmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9uZXcgbW9kZWxcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIHNjb3BlLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKGluZGV4LCAwLCBuZXh0Vmlldyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCA+IGNvbGxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgIHRpbWVzKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnBvcCgpO1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2aWV3LmVsc1swXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwubm9kZU5hbWUgPT09ICdPUFRJT04nICYmIHRoaXMudmlldy5iaW5kaW5ncykge1xuICAgICAgICB0aGlzLnZpZXcuYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZzogQmluZGluZykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm1hcmtlciAmJiAoYmluZGluZy5lbCA9PT0gdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkgJiYgKGJpbmRpbmcudHlwZSA9PT0gJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcblxuICAgICAgLy90b2RvOiBhZGQgdGVzdCBhbmQgZml4IGlmIG5lY2Vzc2FyeVxuXG4gICAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ICE9PSB0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgIHZpZXcudXBkYXRlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgb3IgZmFsc2UuXG4gICdjbGFzcy0qJzogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBsZXQgZWxDbGFzcyA9IGAgJHtlbC5jbGFzc05hbWV9IGA7XG4gICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT09IChlbENsYXNzLmluZGV4T2YoYCAke3RoaXMuYXJnc1swXX0gYCkgPiAtMSkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9ICR7dGhpcy5hcmdzWzBdfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbENsYXNzLnJlcGxhY2UoYCAke3RoaXMuYXJnc1swXX0gYCwgJyAnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB0ZXh0IHZhbHVlLlxuICB0ZXh0OiA8SU9uZVdheUJpbmRlcjxzdHJpbmc+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyBIVE1MIGNvbnRlbnQuXG4gIGh0bWw6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCdodG1sJywgZWwsIHZhbHVlKTtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gIH0sXG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYHNob3dgIGJpbmRlcikuXG4gIGhpZGU6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0sXG5cbiAgLy8gRW5hYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIGVuYWJsZWQ6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gISF2YWx1ZTtcbiAgfSxcblxuICAvLyBDaGVja3MgYSBjaGVja2JveCBvciByYWRpbyBpbnB1dCB3aGVuIHRoZSB2YWx1ZSBpcyB0cnVlLiBBbHNvIHNldHMgdGhlIG1vZGVsXG4gIC8vIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkICh0d28td2F5IGJpbmRlcikuXG4gIGNoZWNrZWQ6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDIwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBnZXRTdHJpbmcoZWwudmFsdWUpID09PSBnZXRTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB2YWx1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbCBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzXG4gIC8vICh0d28td2F5IGJpbmRlcikuXG4gIHZhbHVlOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAzMDAwLFxuXG4gICAgYmluZChlbDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbyA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3JhZGlvJztcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEgJiYgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJyAmJiBlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGVsW2ldO1xuICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0U3RyaW5nKHZhbHVlKSAhPT0gZ2V0U3RyaW5nKGVsLnZhbHVlKSkge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gSW5zZXJ0cyBhbmQgYmluZHMgdGhlIGVsZW1lbnQgYW5kIGl0J3MgY2hpbGQgbm9kZXMgaW50byB0aGUgRE9NIHdoZW4gdHJ1ZS5cbiAgaWY6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBibG9jazogdHJ1ZSxcbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxVbmtub3duRWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIGNvbnN0IGtleXBhdGggPSB0aGlzLmtleXBhdGhzID8gdGhpcy5rZXlwYXRoc1swXSA6ICcnO1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIGtleXBhdGggKyAnICcpO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLmN1c3RvbURhdGEuYm91bmQgPT09IGZhbHNlICYmICB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgIH1cbiAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB1bmJpbmQoKSB7XG4gICAgICBpZiAoIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQudW5iaW5kKCk7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCkge1xuICAgICAgICBpZiAodmFsdWUpIHtcblxuICAgICAgICAgIGlmICghIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkID0gbmV3IFZpZXcoZWwsIHRoaXMudmlldy5tb2RlbHMsIHRoaXMudmlldy5vcHRpb25zKTtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubWFya2VyLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGJpbmRlcnMgfTtcblxuZXhwb3J0IGRlZmF1bHQgYmluZGVycztcbiIsImltcG9ydCB7IHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgSU9ic2VydmVyU3luY0NhbGxiYWNrLCBJT2JzZXJ2ZXJzIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBCaW5kZXIsIElPbmVXYXlCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBQUklNSVRJVkUsIEtFWVBBVEgsIERFRkFVTFRfUFJPUEVSVFlOQU1FLCBJS2V5cGF0aHMsIElQcmltaXRpdmVzIH0gZnJvbSAnLi9hdHRyaWJ1dGVzJztcblxuY29uc3QgRk9STUFUVEVSX0FSR1MgPSAgL1teXFxzJ10rfCcoW14nXXwnW15cXHNdKSonfFwiKFteXCJdfFwiW15cXHNdKSpcIi9nO1xuY29uc3QgRk9STUFUVEVSX1NQTElUID0gL1xccysvO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBldmVudEhhbmRsZXJGdW5jdGlvbiA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbi8qKlxuICogVE9ETyBtb3ZlIHRvIHV0aWxzXG4gKiBAcGFyYW0gZWxcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGxldCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgIGxldCBvcHRpb25zOkhUTUxPcHRpb25zQ29sbGVjdGlvbiA9IChlbCBhcyBIVE1MU2VsZWN0RWxlbWVudCkub3B0aW9ucztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1trZXldO1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiAgQSBzaW5nbGUgYmluZGluZyBiZXR3ZWVuIGEgbW9kZWwgYXR0cmlidXRlIGFuZCBhIERPTSBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgQmluZGluZyB7XG4gIG9ic2VydmVyczogSU9ic2VydmVycyA9IHt9O1xuICB2aWV3OiBWaWV3O1xuICBlbDogSFRNTEVsZW1lbnQ7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBiaW5kZXIgd2l0aG91dCB0aGUgcHJlZml4XG4gICAqL1xuICB0eXBlOiBzdHJpbmcgfCBudWxsO1xuICBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbDtcbiAgZm9ybWF0dGVyczogc3RyaW5nW10gfCBudWxsO1xuICBmb3JtYXR0ZXJPYnNlcnZlcnM6IElGb3JtYXR0ZXJPYnNlcnZlcnM7XG4gIC8qKlxuICAgKiBzdGF0aWNzIHZhbHVlcyAoUFJJTUlUSVZFIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBwcmltaXRpdmVzOiBJUHJpbWl0aXZlcyA9IHt9O1xuICAvKipcbiAgICoga2V5cGF0aCB2YWx1ZXMgKEtFWVBBVEggQXR0cmlidXRlcylcbiAgICovXG4gIGtleXBhdGhzOiBJS2V5cGF0aHMgPSB7fTtcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBwYXJzZWQgZnJvbSBzdGFyIGJpbmRlcnMsIGUuZy4gb24gZm9vLSotKiBhcmdzWzBdIGlzIHRoZSBmaXJzdCBzdGFyLCBhcmdzWzFdIHRoZSBzZWNvbmQtXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXSB8IG51bGw7XG4gIC8qKlxuICAgKiBcbiAgICovXG4gIG1vZGVsOiBhbnkgPSB7fTtcbiAgLyoqXG4gICAqIEhUTUwgQ29tbWVudCB0byBtYXJrIGEgYmluZGluZyBpbiB0aGUgRE9NXG4gICAqL1xuICBtYXJrZXI/OiBDb21tZW50O1xuICAvKipcbiAgICogVXNlZCBpbiBjb21wb25lbnQgYmluZGluZ3MuIFRPRE8gZS5nLiBtb3ZlIHRvIENvbXBvbmVudEJpbmRpbmcgb3IgYmluZGVycz9cbiAgICovXG4gIF9ib3VuZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBqdXN0IHRvIGhhdmUgYSB2YWx1ZSB3aGVyZSB3ZSBjb3VsZCBzdG9yZSBjdXN0b20gZGF0YVxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcblxuICAvKipcbiAgICogQWxsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBiaW5kaW5nIGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvcjsgdGhlXG4gICAqIGNvbnRhaW5pbmcgdmlldywgdGhlIERPTSBub2RlLCB0aGUgdHlwZSBvZiBiaW5kaW5nLCB0aGUgbW9kZWwgb2JqZWN0IGFuZCB0aGVcbiAgICoga2V5cGF0aCBhdCB3aGljaCB0byBsaXN0ZW4gZm9yIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7Kn0gdmlldyBcbiAgICogQHBhcmFtIHsqfSBlbCBcbiAgICogQHBhcmFtIHsqfSB0eXBlIFxuICAgKiBAcGFyYW0geyp9IGtleXBhdGggXG4gICAqIEBwYXJhbSB7Kn0gYmluZGVyIFxuICAgKiBAcGFyYW0geyp9IGFyZ3MgVGhlIHN0YXJ0IGJpbmRlcnMsIG9uIGBjbGFzcy0qYCBhcmdzWzBdIHdpbCBiZSB0aGUgY2xhc3NuYW1lIFxuICAgKiBAcGFyYW0geyp9IGZvcm1hdHRlcnMgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZyB8IG51bGwsIGtleXBhdGg6IHN0cmluZyB8IG51bGwsIGJpbmRlcjogQmluZGVyPGFueT4gfCBudWxsLCBhcmdzOiBzdHJpbmdbXSB8IG51bGwsIGZvcm1hdHRlcnM6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbFtERUZBVUxUX1BST1BFUlRZTkFNRV0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jdXN0b21EYXRhID0ge307XG5cbiAgICBjb25zb2xlLmxvZygnbmV3IGJpbmRlcicsIHRoaXMudHlwZSk7XG5cbiAgICBpZihrZXlwYXRoICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmtleXBhdGhzW0RFRkFVTFRfUFJPUEVSVFlOQU1FXSA9IGtleXBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua2V5cGF0aHNbREVGQVVMVF9QUk9QRVJUWU5BTUVdID0gJ0ZJWE1FJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIG9iamVjdCBrZXlwYXRoXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKi9cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IElPYnNlcnZlclN5bmNDYWxsYmFjayk6IE9ic2VydmVyIHtcbiAgICBpZihjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmosIGtleXBhdGgsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmosIGtleXBhdGgsIHRoaXMpO1xuICAgIH1cbiAgICBcbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIHRoaXMua2V5cGF0aHMpIHtcbiAgICAgIGlmICh0aGlzLmtleXBhdGhzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgY29uc3Qga2V5cGF0aCA9IHRoaXMua2V5cGF0aHNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgaWYoa2V5cGF0aCkge1xuICAgICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShrZXlwYXRoKTtcbiAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbcHJvcGVydHlOYW1lXSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKXtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdLnRhcmdldDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgaW4gdG9rZW4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmltaXRpdmVzW3Byb3BlcnR5TmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIGl0ZXJhdGlvbiBhbGlhcywgdXNlZCBpbiB0aGUgaW50ZXJhdGlvbiBiaW5kZXJzIGxpa2UgYGVhY2gtKmBcbiAgICogQHBhcmFtIHsqfSBtb2RlbE5hbWUgXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wyNlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMTE3NVxuICAgKi9cbiAgZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gJyUnICsgbW9kZWxOYW1lICsgJyUnO1xuICB9XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJnczogc3RyaW5nW10sIGZvcm1hdHRlckluZGV4OiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIGFyZ3NcbiAgICAubWFwKHBhcnNlVHlwZSlcbiAgICAubWFwKCh7dHlwZSwgdmFsdWV9LCBhaSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJpbWl0aXZlVmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgLy8ga2V5cGF0aCBpcyBzdHJpbmdcbiAgICAgICAgY29uc3Qga2V5cGF0aCA9ICh2YWx1ZSBhcyBzdHJpbmcgKTtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0pIHtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV07XG5cbiAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIGtleXBhdGgpO1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhcmd1bWVudCB0eXBlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gICAqIGZvcm1hdHRlZCB2YWx1ZS5cbiAgICovXG4gIGZvcm1hdHRlZFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZih0aGlzLmZvcm1hdHRlcnMgPT09IG51bGwpIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcignZm9ybWF0dGVycyBpcyBudWxsJyk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlcnMucmVkdWNlKChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRlY2xhcmF0aW9uLm1hdGNoKEZPUk1BVFRFUl9BUkdTKTtcbiAgICAgIGlmKGFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhcmdzIG1hdGNoZWQgZnJvbSBGT1JNQVRURVJfQVJHUycpO1xuICAgICAgfVxuICAgICAgbGV0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgaWYoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaWQgZm91bmQgaW4gYXJncycpO1xuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuXG4gICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgIGlmIChmb3JtYXR0ZXIgJiYgKGZvcm1hdHRlci5yZWFkIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5yZWFkKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcihyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgYmluZGluZyBhcm91bmQgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZXZlbnRIYW5kbGVyKGZuOiBldmVudEhhbmRsZXJGdW5jdGlvbik6IChldjogRXZlbnQpID0+IGFueSB7XG4gICAgbGV0IGJpbmRpbmcgPSB0aGlzO1xuICAgIGxldCBoYW5kbGVyID0gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcjtcblxuICAgIHJldHVybiAoZXYpID0+IHtcbiAgICAgIGlmKCFoYW5kbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaGFuZGxlciBkZWZpbmVkIGluIGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXInKTtcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuY2FsbChmbiwgdGhpcywgZXYsIGJpbmRpbmcpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBiaW5kaW5nLiBUaGlzIEJhc2ljYWxseSBqdXN0IHJ1bnMgdGhlIGJpbmRpbmcgcm91dGluZVxuICAgKiB3aXRoIHRoZSBzdXBwbGllZCB2YWx1ZSBmb3JtYXR0ZWQuXG4gICAqL1xuICBzZXQodmFsdWU6IGFueSwgcHJvcGVydHlOYW1lID0gREVGQVVMVF9QUk9QRVJUWU5BTUUpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICEodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+ICkuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElPbmVXYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsW3Byb3BlcnR5TmFtZV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAodmFsdWUgYXMgSVR3b1dheUJpbmRlcjxhbnk+IClcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJvdXRpbmVGbjtcbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgncm91dGluZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyLnJvdXRpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJT25lV2F5QmluZGVyPGFueT4pO1xuICAgICAgcm91dGluZUZuID0gdGhpcy5iaW5kZXI7XG4gICAgfVxuXG4gICAgaWYgKHJvdXRpbmVGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByb3V0aW5lRm4uY2FsbCh0aGlzLCB0aGlzLmVsLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN5bmNzIHVwIHRoZSB2aWV3IGJpbmRpbmcgd2l0aCB0aGUgbW9kZWwuXG4gICAqL1xuICBzeW5jKCkge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIHRoaXMub2JzZXJ2ZXJzKSB7XG4gICAgICBpZiAodGhpcy5vYnNlcnZlcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV07XG5cbiAgICAgICAgaWYob2JzZXJ2ZXIpIHtcbiAgICAgICAgICB0aGlzLm1vZGVsW3Byb3BlcnR5TmFtZV0gPSBvYnNlcnZlci50YXJnZXQ7XG4gICAgICAgICAgdGhpcy5zZXQob2JzZXJ2ZXIudmFsdWUoKSwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwcmltaXRpdmUgPSB0aGlzLnByaW1pdGl2ZXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICB0aGlzLnNldChwcmltaXRpdmUsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVibGlzaGVzIHRoZSB2YWx1ZSBjdXJyZW50bHkgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGJhY2sgdG8gdGhlIG1vZGVsLlxuICAgKi9cbiAgcHVibGlzaCgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcnMpIHtcbiAgICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5vYnNlcnZlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV07XG5cbiAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmZvcm1hdHRlcnMucmVkdWNlUmlnaHQoKHJlc3VsdDogYW55LypjaGVjayB0eXBlKi8sIGRlY2xhcmF0aW9uOiBzdHJpbmcgLypjaGVjayB0eXBlKi8sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZighaWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpZCBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG4gICAgXG4gICAgICAgICAgICBpZiAoZm9ybWF0dGVyICYmIGZvcm1hdHRlci5wdWJsaXNoKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5wdWJsaXNoKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sIHRoaXMuZ2V0VmFsdWUoKHRoaXMuZWwgYXMgSFRNTElucHV0RWxlbWVudCkpKTtcbiAgICBcbiAgICAgICAgICBvYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYXQgdGhlIHNwZWNpZmllZCBrZXlwYXRoLiBCaS1kaXJlY3Rpb25hbFxuICAgKiByb3V0aW5lcyB3aWxsIGFsc28gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoZSBlbGVtZW50IHRvIHByb3BhZ2F0ZSB0aGVtIGJhY2tcbiAgICogdG8gdGhlIG1vZGVsLlxuICAgKi9cbiAgYmluZCgpIHtcbiAgICB0aGlzLnBhcnNlVGFyZ2V0KCk7XG5cbiAgICBpZiAodGhpcy5iaW5kZXIgJiYgdGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmKCF0aGlzLmJpbmRlci5iaW5kICYmIHR5cGVvZih0aGlzLmJpbmRlci5iaW5kKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBtZXRob2QgYmluZCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgdGhpcy5iaW5kZXIuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YSkge1xuICAgICAgdGhpcy5zeW5jKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHRoZSBtb2RlbCBhbmQgdGhlIGVsZW1lbnQuXG4gICAqL1xuICB1bmJpbmQoKSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZiAodGhpcy5iaW5kZXIudW5iaW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGVyLnVuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9ic2VydmVycykge1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gdGhpcy5vYnNlcnZlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzKS5mb3JFYWNoKGZpID0+IHtcbiAgICAgIGxldCBhcmdzID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZmldO1xuXG4gICAgICBPYmplY3Qua2V5cyhhcmdzKS5mb3JFYWNoKGFpID0+IHtcbiAgICAgICAgYXJnc1thaV0udW5vYnNlcnZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYmluZGluZydzIG1vZGVsIGZyb20gd2hhdCBpcyBjdXJyZW50bHkgc2V0IG9uIHRoZSB2aWV3LiBVbmJpbmRzXG4gICAqIHRoZSBvbGQgbW9kZWwgZmlyc3QgYW5kIHRoZW4gcmUtYmluZHMgd2l0aCB0aGUgbmV3IG1vZGVsLlxuICAgKiBAcGFyYW0ge2FueX0gbW9kZWxzIFxuICAgKi9cbiAgdXBkYXRlKG1vZGVsczogYW55ID0ge30pIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcnMpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIHRoaXMub2JzZXJ2ZXJzKSB7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgIHRoaXMubW9kZWxbcHJvcGVydHlOYW1lXSA9IG9ic2VydmVyLnRhcmdldDtcbiAgICAgICAgICAvLyB0aGlzLm1vZGVsID0gb2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3VwZGF0ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51cGRhdGUpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICAgKiBAcGFyYW0gZWwgXG4gICAqL1xuICBnZXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2dldFZhbHVlJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYodHlwZW9mKHRoaXMuYmluZGVyLmdldFZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFZhbHVlIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHRpbnliaW5kLCBJT3B0aW9uc1BhcmFtIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBJQmluZGVycyB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBJRm9ybWF0dGVycyB9IGZyb20gJy4vZm9ybWF0dGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElDb21wb25lbnQsIElDb21wb25lbnRzIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IElPYnNlcnZlcnMgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBQUklNSVRJVkUsIEtFWVBBVEgsIERFRkFVTFRfUFJPUEVSVFlOQU1FLCBJS2V5cGF0aHMsIElQcmltaXRpdmVzIH0gZnJvbSAnLi9hdHRyaWJ1dGVzJztcblxuY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIGlmKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0OyBcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgX2JvdW5kPzogYm9vbGVhblxufVxuXG4vKipcbiAqIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG4gIHZpZXc6IFZpZXc7XG4gIGNvbXBvbmVudFZpZXc/OiBWaWV3O1xuICBlbDogSUJvdW5kRWxlbWVudDtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IElDb21wb25lbnQ7XG4gIC8qKlxuICAgKiBzdGF0aWNzIHZhbHVlcyAoUFJJTUlUSVZFIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBwcmltaXRpdmVzOiBJUHJpbWl0aXZlcztcbiAgLyoqXG4gICAqIGtleXBhdGggdmFsdWVzIChLRVlQQVRIIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBrZXlwYXRoczogSUtleXBhdGhzID0ge307XG4gIG9ic2VydmVyczogSU9ic2VydmVycztcblxuICBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgY29tcG9uZW50IGJpbmRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgdmlldy4gVGhlIHJhdyBjb21wb25lbnRcbiAgICogZWxlbWVudCBpcyBwYXNzZWQgaW4gYWxvbmcgd2l0aCB0aGUgY29tcG9uZW50IHR5cGUuIEF0dHJpYnV0ZXMgYW5kIHNjb3BlXG4gICAqIGluZmxlY3Rpb25zIGFyZSBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSBjb21wb25lbnRzIGRlZmluZWQgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIHZpZXcgXG4gICAqIEBwYXJhbSBlbCBcbiAgICogQHBhcmFtIHR5cGUgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZykge1xuICAgIHN1cGVyKHZpZXcsIGVsLCB0eXBlLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdmlldy5vcHRpb25zLmNvbXBvbmVudHNbdGhpcy50eXBlXTtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSB7fTtcbiAgICB0aGlzLm9ic2VydmVycyA9IHt9O1xuXG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuICB9XG4gICAgXG5cbiAgcGFyc2VUYXJnZXQoKSB7XG4gICAgLy8gcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5lbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gdGhpcy5lbC5hdHRyaWJ1dGVzW2ldO1xuXG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIG5vdCB3aXRoIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2LVxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YodGhpcy5iaW5kaW5nUHJlZml4KSAhPT0gMCkge1xuICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gdGhpcy5jYW1lbENhc2UoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgIGlmKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHRoaXMucHJpbWl0aXZlc1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdLCB0aGlzKTtcbiAgICAgICAgICB0aGlzLm1vZGVsW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdLnRhcmdldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gICAqIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgICovXG4gIHN5bmMoKSB7fVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6cHVibGlzaGAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgICogdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgcHVibGlzaCgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICAgKi9cbiAgbG9jYWxzKCkge1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMucHJpbWl0aXZlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHRoaXMucHJpbWl0aXZlc1trZXldKTtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5wcmltaXRpdmVzW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS50YXJnZXQ7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAgIFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2FtZWwtY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLiBVc2VkIHdoZW4gdHJhbnNsYXRpbmcgYW5cbiAgICogZWxlbWVudCdzIGF0dHJpYnV0ZSBuYW1lIGludG8gYSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUuXG4gICAqIFRPRE8gbW92ZSB0byB1dGlsc1xuICAgKiBAcGFyYW0gc3RyaW5nIFxuICAgKi9cbiAgY2FtZWxDYXNlKHN0cmluZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRNZXJnZWRPcHRpb25zKCkge1xuICAgIHZhciBvcHRpb25zOiBJT3B0aW9uc1BhcmFtID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIFxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy5jb21wb25lbnQuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLmNvbXBvbmVudC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMuY29tcG9uZW50LmFkYXB0ZXJzKTtcblxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy52aWV3Lm9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMudmlldy5vcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMudmlldy5vcHRpb25zLmFkYXB0ZXJzKTtcblxuICAgIG9wdGlvbnMucHJlZml4ID0gdGhpcy5jb21wb25lbnQucHJlZml4ID8gdGhpcy5jb21wb25lbnQucHJlZml4IDogdGhpcy52aWV3Lm9wdGlvbnMucHJlZml4XG4gICAgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgPyB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aGlzLnZpZXcub3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnNcbiAgICBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPSB0aGlzLmNvbXBvbmVudC5yb290SW50ZXJmYWNlID8gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA6IHRoaXMudmlldy5vcHRpb25zLnJvb3RJbnRlcmZhY2VcbiAgICBvcHRpb25zLnByZWxvYWREYXRhID0gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgPyB0aGlzLmNvbXBvbmVudC5wcmVsb2FkRGF0YSA6IHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhXG4gICAgb3B0aW9ucy5oYW5kbGVyID0gdGhpcy5jb21wb25lbnQuaGFuZGxlciA/IHRoaXMuY29tcG9uZW50LmhhbmRsZXIgOiB0aGlzLnZpZXcub3B0aW9ucy5oYW5kbGVyXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OmJpbmRgIHRvIGJ1aWxkIGB0aGlzLmNvbXBvbmVudFZpZXdgIHdpdGggYSBsb2NhbGl6ZWRcbiAgICogbWFwIG9mIG1vZGVscyBmcm9tIHRoZSByb290IHZpZXcuIEJpbmQgYHRoaXMuY29tcG9uZW50Vmlld2Agb24gc3Vic2VxdWVudCBjYWxscy5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgICAqL1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgdGhpcy5nZXRNZXJnZWRPcHRpb25zKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcuYmluZCgpO1xuICAgIH1cbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0IGB0aW55YmluZC5CaW5kaW5nOjp1bmJpbmRgIHRvIGJlIGNhbGxlZCBvbiBgdGhpcy5jb21wb25lbnRWaWV3YC5cbiAgICovXG4gIHVuYmluZCgpIHsgICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlciB7XG4gICh2YWw6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnk7XG4gIHJlYWQ/OiAocmVzdWx0OiBzdHJpbmcsIC4uLnByb2Nlc3NlZEFyZ3M6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICBwdWJsaXNoPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiBJRm9ybWF0dGVyO1xufVxuXG5jb25zdCBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycyA9IHt9O1xuXG5mb3JtYXR0ZXJzLm5vdCA9IGZ1bmN0aW9uICh2YWx1ZTogYm9vbGVhbikge1xuICByZXR1cm4gIXZhbHVlO1xufTtcblxuZXhwb3J0IHsgZm9ybWF0dGVycyB9O1xuIiwiXG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiBPYnNlcnZlcjtcbn1cblxuZXhwb3J0IHR5cGUgT2JqID0gYW55O1xuXG5leHBvcnQgdHlwZSBSb290ID0gYW55O1xuXG4vLyBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCB0aGFuIGNhbiBiZSBvYnNlcnZlZC5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iajogT2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGxcbn1cblxuLy8gRXJyb3IgdGhyb3dlci5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1tPYnNlcnZlcl0gJyArIG1lc3NhZ2UpXG59XG5cbi8vIFRPRE9cbmxldCBhZGFwdGVyczogSUFkYXB0ZXJzO1xubGV0IGludGVyZmFjZXM6IHN0cmluZ1tdO1xubGV0IHJvb3RJbnRlcmZhY2U6IFJvb3Q7XG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZlciB7XG4gIGtleXBhdGg6IHN0cmluZztcbiAgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaztcbiAgb2JqZWN0UGF0aDogT2JqW107XG4gIG9iajogT2JqO1xuICB0YXJnZXQ6IE9iajtcbiAga2V5OiBJS2V5O1xuICB0b2tlbnM6IElLZXlbXTtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBrZXlwYXRoIG9ic2VydmVyIGFuZCBraWNrcyB0aGluZ3Mgb2ZmLlxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob2JqOiBPYmosIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMub2JqZWN0UGF0aCA9IFtdO1xuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMua2V5ID0gcGFyc2VSZXN1bHQua2V5O1xuICAgIHRoaXMudG9rZW5zID0gcGFyc2VSZXN1bHQudG9rZW5zO1xuICAgIHRoaXMub2JqID0gdGhpcy5nZXRSb290T2JqZWN0KG9iaik7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnJlYWxpemUoKTtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzO1xuICAgIGludGVyZmFjZXMgPSBPYmplY3Qua2V5cyhhZGFwdGVycyk7XG4gICAgcm9vdEludGVyZmFjZSA9IG9wdGlvbnMucm9vdEludGVyZmFjZTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gICAqIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZSA9IGZ1bmN0aW9uKGtleXBhdGg6IHN0cmluZywgcm9vdDogUm9vdCkge1xuICAgIHZhciB0b2tlbnM6IGFueVtdID0gW107XG4gICAgdmFyIGN1cnJlbnQ6IElLZXkgPSB7aTogcm9vdCwgcGF0aDogJyd9O1xuICAgIHZhciBpbmRleDogbnVtYmVyO1xuICAgIHZhciBjaHI6IHN0cmluZztcbiAgXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwga2V5cGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNociA9IGtleXBhdGguY2hhckF0KGluZGV4KTtcbiAgXG4gICAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKGNocikpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgICAgIGN1cnJlbnQgPSB7aTogY2hyLCBwYXRoOiAnJ307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50LnBhdGggKz0gY2hyO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuICAgKiBmb3IgdGhlIHRva2VuaXplZCBrZXlwYXRoIGFzIHdlbGwgYXMgdGhlIGVuZCBrZXkuXG4gICAqL1xuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBSZWFsaXplcyB0aGUgZnVsbCBrZXlwYXRoLCBhdHRhY2hpbmcgb2JzZXJ2ZXJzIGZvciBldmVyeSBrZXkgYW5kIGNvcnJlY3RpbmdcbiAgICogb2xkIG9ic2VydmVycyB0byBhbnkgY2hhbmdlZCBvYmplY3RzIGluIHRoZSBrZXlwYXRoLlxuICAgKi9cbiAgcmVhbGl6ZSgpIHtcbiAgICB2YXIgY3VycmVudDogT2JqID0gdGhpcy5vYmpcbiAgICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgICB2YXIgcHJldlxuICAgIHZhciB0b2tlblxuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmplY3RQYXRoW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCAhPT0gKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICB9XG4gIFxuICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodW5yZWFjaGVkID09PSAtMSkge1xuICAgICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMub2JqZWN0UGF0aC5zcGxpY2UodW5yZWFjaGVkKVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnRcbiAgfVxuICBcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgdmFyIG5leHQsIG9sZFZhbHVlLCBuZXdWYWx1ZVxuICBcbiAgICBpZiAoKG5leHQgPSB0aGlzLnJlYWxpemUoKSkgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgaWYgKGlzT2JqZWN0KG5leHQpKSB7XG4gICAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCBuZXh0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIG9sZFZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICB0aGlzLnRhcmdldCA9IG5leHRcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlIHx8IG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfSBlbHNlIGlmIChuZXh0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfVxuICB9XG4gIFxuICAvLyBSZWFkcyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIFJldHVybnMgdW5kZWZpbmVkIGlmXG4gIC8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUuXG4gIHZhbHVlKCkge1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLmtleSwgdGhpcy50YXJnZXQpXG4gICAgfVxuICB9XG4gIFxuICAvLyBTZXRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gQ2FsbGluZyBzZXRWYWx1ZSB3aGVuXG4gIC8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUgaXMgYSBuby1vcC5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIGFkYXB0ZXJzW3RoaXMua2V5LmldLnNldCh0aGlzLnRhcmdldCwgdGhpcy5rZXkucGF0aCwgdmFsdWUpXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0cyB0aGUgcHJvdmlkZWQga2V5IG9uIGFuIG9iamVjdC5cbiAgICogQHBhcmFtIGtleSBcbiAgICogQHBhcmFtIG9iaiBcbiAgICovXG4gIGdldChrZXk6IElLZXksIG9iajogT2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLyoqXG4gICAqIE9ic2VydmVzIG9yIHVub2JzZXJ2ZXMgYSBjYWxsYmFjayBvbiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBrZXkuXG4gICAqIEBwYXJhbSBhY3RpdmUgXG4gICAqIEBwYXJhbSBrZXkgXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBjYWxsYmFjayBcbiAgICovXG4gIHNldChhY3RpdmU6IGJvb2xlYW4sIGtleTogSUtleSwgb2JqOiBPYmosIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICBpZihhY3RpdmUpIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS5vYnNlcnZlKG9iaiwga2V5LnBhdGgsIGNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBhZGFwdGVyc1trZXkuaV0udW5vYnNlcnZlKG9iaiwga2V5LnBhdGgsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFVub2JzZXJ2ZXMgdGhlIGVudGlyZSBrZXlwYXRoLlxuICAgKi9cbiAgdW5vYnNlcnZlKCkge1xuICAgIHZhciBvYmo6IE9iajtcbiAgICB2YXIgdG9rZW47XG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAob2JqID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIG9iaiwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIC8vIHRyYXZlcnNlIHRoZSBzY29wZSBjaGFpbiB0byBmaW5kIHRoZSBzY29wZSB3aGljaCBoYXMgdGhlIHJvb3QgcHJvcGVydHlcbiAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBmb3VuZCBpbiBjaGFpbiwgcmV0dXJucyB0aGUgcm9vdCBzY29wZVxuICBnZXRSb290T2JqZWN0KG9iajogT2JqKSB7XG4gICAgdmFyIHJvb3RQcm9wLCBjdXJyZW50O1xuICAgIGlmICghb2JqLiRwYXJlbnQpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICByb290UHJvcCA9IHRoaXMudG9rZW5zWzBdLnBhdGhcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLmtleS5wYXRoXG4gICAgfVxuICBcbiAgICBjdXJyZW50ID0gb2JqO1xuICAgIHdoaWxlIChjdXJyZW50LiRwYXJlbnQgJiYgKGN1cnJlbnRbcm9vdFByb3BdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC4kcGFyZW50XG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUFJJTUlUSVZFLCBLRVlQQVRIIH0gZnJvbSAnLi9hdHRyaWJ1dGVzJztcblxuY29uc3QgUVVPVEVEX1NUUiA9IC9eJy4qJyR8XlwiLipcIiQvOyAvLyByZWdleCB0byB0ZXN0IGlmIHN0cmluZyBpcyB3cmFwcGVkIGluIFwiIG9yICdcblxuLy8gVXNlZCBpbiBwYXJzZXJzLnBhcnNlVGVtcGxhdGVcbmNvbnN0IFRFWFQgPSAwO1xuY29uc3QgQklORElORyA9IDE7XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBpc0pzb24oc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBQYXJzZXIgYW5kIHRva2VuaXplciBmb3IgZ2V0dGluZyB0aGUgdHlwZSBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR5cGUoc3RyaW5nPzogc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWU6IGFueSA9IHN0cmluZztcbiAgaWYodHlwZW9mKHN0cmluZykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdW5kZWZpbmVkfVxuICB9XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHN0cmluZykpKSB7XG4gICAgdmFsdWUgPSBOdW1iZXIoc3RyaW5nKTtcbiAgfSBlbHNlIGlmIChpc0pzb24oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShzdHJpbmcpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBLRVlQQVRIO1xuICB9XG4gIHJldHVybiB7dHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlfTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlbnMge1xuICB0eXBlOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSB7XG4gIHZhciB0b2tlbnM6IElUb2tlbnNbXSB8IG51bGwgPSBudWxsO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSwgcGFyc2VUeXBlIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzLCBmb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IGFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IGJpbmRlcnMsIElCaW5kZXJzIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IE9ic2VydmVyLCBSb290IH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJQ29tcG9uZW50cyB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMge1xuICAvLyBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlc1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy9QcmVsb2FkIHRlbXBsYXRlcyB3aXRoIGluaXRpYWwgZGF0YSBvbiBiaW5kXG4gIHByZWxvYWREYXRhPzogYm9vbGVhbjtcblxuICAvL1Jvb3Qgc2lnaHRnbGFzcyBpbnRlcmZhY2UgZm9yIGtleXBhdGhzXG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLy8gVGVtcGxhdGUgZGVsaW1pdGVycyBmb3IgdGV4dCBiaW5kaW5nc1xuICB0ZW1wbGF0ZURlbGltaXRlcnM/OiBBcnJheTxzdHJpbmc+XG5cbiAgLy8gQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXJcbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFeHRlbnNpb25zIHtcbiAgYmluZGVyczogSUJpbmRlcnM8YW55PjtcbiAgZm9ybWF0dGVyczogSUZvcm1hdHRlcnM7XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBhZGFwdGVyczogSUFkYXB0ZXJzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zUGFyYW0gZXh0ZW5kcyBJRXh0ZW5zaW9ucywgSU9wdGlvbnMge31cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld09wdGlvbnMgZXh0ZW5kcyBJT3B0aW9uc1BhcmFtIHtcbiAgc3RhckJpbmRlcnM6IGFueTtcbiAgLy8gc2lnaHRnbGFzc1xuICByb290SW50ZXJmYWNlOiBSb290O1xufVxuXG4vLyBUT0RPIG1vdmUgdG8gdWl0aWxzXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgaWYob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldID09PSB7fSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7IFxufTtcblxuY29uc3QgdGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiA8SUJpbmRlcnM8YW55Pj4gYmluZGVycyxcblxuICAvLyBHbG9iYWwgY29tcG9uZW50cy5cbiAgY29tcG9uZW50czogPElDb21wb25lbnRzPiB7fSxcblxuICAvLyBHbG9iYWwgZm9ybWF0dGVycy5cbiAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBmb3JtYXR0ZXJzLFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczogPElBZGFwdGVycz4ge1xuICAgICcuJzogYWRhcHRlcixcbiAgfSxcblxuICAvLyBEZWZhdWx0IGF0dHJpYnV0ZSBwcmVmaXguXG4gIF9wcmVmaXg6ICdydicsXG5cbiAgX2Z1bGxQcmVmaXg6ICdydi0nLFxuXG4gIGdldCBwcmVmaXggKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCAodmFsdWUpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgICB0aGlzLl9mdWxsUHJlZml4ID0gdmFsdWUgKyAnLSc7XG4gIH0sXG5cbiAgcGFyc2VUZW1wbGF0ZTogcGFyc2VUZW1wbGF0ZSxcblxuICBwYXJzZVR5cGU6IHBhcnNlVHlwZSxcblxuICAvLyBEZWZhdWx0IHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gIHRlbXBsYXRlRGVsaW1pdGVyczogWyd7JywgJ30nXSxcblxuICAvLyBEZWZhdWx0IHNpZ2h0Z2xhc3Mgcm9vdCBpbnRlcmZhY2UuXG4gIHJvb3RJbnRlcmZhY2U6ICcuJyxcblxuICAvLyBQcmVsb2FkIGRhdGEgYnkgZGVmYXVsdC5cbiAgcHJlbG9hZERhdGE6IHRydWUsXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgICogVE9ETyBpcyB0aGlzIHVzZWQ/XG4gICAqL1xuICBoYW5kbGVyKHRoaXM6IGFueSAvKiBUT0RPIENIRUNNRSAqLywgY29udGV4dDogYW55LCBldjogRXZlbnQsIGJpbmRpbmc6IEJpbmRpbmcpIHtcbiAgICAvLyBjb25zb2xlLndhcm4oJ3llcyBpdCBpcyB1c2VkJyk7XG4gICAgdGhpcy5jYWxsKGNvbnRleHQsIGV2LCBiaW5kaW5nLnZpZXcubW9kZWxzKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LiBJZiBubyBiaW5kZXIgYWJvdmUgaXMgbWF0Y2hlZCBpdCB3aWxsIGZhbGxcbiAgICogYmFjayB0byB1c2luZyB0aGlzIGJpbmRlci5cbiAgICovXG4gIGZhbGxiYWNrQmluZGVyKHRoaXM6IEJpbmRpbmcsIGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xuICAgIGlmKCF0aGlzLnR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBzZXQgYXR0dHJpYnV0ZSBvZiAnICsgdGhpcy50eXBlKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLnR5cGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHRoaXMudHlwZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNZXJnZXMgYW4gb2JqZWN0IGxpdGVyYWwgaW50byB0aGUgY29ycmVzcG9uZGluZyBnbG9iYWwgb3B0aW9ucy5cbiAgICogQHBhcmFtIG9wdGlvbnMgXG4gICAqL1xuICBjb25maWd1cmUob3B0aW9uczogYW55KSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgbGV0IHZhbHVlID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgICBjYXNlICdiaW5kZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmJpbmRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Zvcm1hdHRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuZm9ybWF0dGVycywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29tcG9uZW50cyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5jb21wb25lbnRzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGFwdGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5hZGFwdGVycywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRhcHRlcic6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5hZGFwdGVycywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgICAgICB0aGlzLnByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXJzZVRlbXBsYXRlJzpcbiAgICAgICAgICB0aGlzLnBhcnNlVGVtcGxhdGUgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFyc2VUeXBlJzpcbiAgICAgICAgICB0aGlzLnBhcnNlVHlwZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVmaXgnOlxuICAgICAgICAgIHRoaXMucHJlZml4ID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RlbXBsYXRlRGVsaW1pdGVycyc6XG4gICAgICAgICAgdGhpcy50ZW1wbGF0ZURlbGltaXRlcnMgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncm9vdEludGVyZmFjZSc6XG4gICAgICAgICAgdGhpcy5yb290SW50ZXJmYWNlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWxvYWREYXRhJzpcbiAgICAgICAgICB0aGlzLnByZWxvYWREYXRhID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdPcHRpb24gbm90IHN1cHBvcnRlZCcsIG9wdGlvbiwgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBvbiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgYW5kXG4gIC8vIHJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlx0XG4gIGluaXQ6IChjb21wb25lbnRLZXk6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50LCBkYXRhID0ge30pID0+IHtcbiAgICBpZiAoIWVsKSB7XG4gICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRpbnliaW5kLmNvbXBvbmVudHNbY29tcG9uZW50S2V5XTtcbiAgICBlbC5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aW55YmluZCwgZWwpO1xuICAgIGxldCBzY29wZSA9IGNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGlueWJpbmQsIGVsLCBkYXRhKTtcblxuICAgIGxldCB2aWV3ID0gdGlueWJpbmQuYmluZChlbCwgc2NvcGUpO1xuICAgIHZpZXcuYmluZCgpO1xuICAgIHJldHVybiB2aWV3O1xuICB9LFxuXG4gIC8vIEJpbmRzIHNvbWUgZGF0YSB0byBhIHRlbXBsYXRlIC8gZWxlbWVudC4gUmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXG4gIGJpbmQ6IChlbDogSFRNTEVsZW1lbnQsIG1vZGVsczogYW55LCBvcHRpb25zPzogSU9wdGlvbnNQYXJhbSkgPT4ge1xuICAgIGxldCB2aWV3T3B0aW9uczogSVZpZXdPcHRpb25zID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIC8vIG90aGVyXG4gICAgICBzdGFyQmluZGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIC8vIHNpZ2h0Z2xhc3NcbiAgICAgIHJvb3RJbnRlcmZhY2U6IDxSb290PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIH07XG4gICAgbW9kZWxzID0gbW9kZWxzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZihvcHRpb25zKSB7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCBvcHRpb25zLmJpbmRlcnMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgb3B0aW9ucy5hZGFwdGVycyk7XG4gICAgfVxuXG4gICAgdmlld09wdGlvbnMucHJlZml4ID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucHJlZml4IDogdGlueWJpbmQucHJlZml4XG4gICAgdmlld09wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID0gb3B0aW9ucyAmJiBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA/IG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzIDogdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzXG4gICAgdmlld09wdGlvbnMucm9vdEludGVyZmFjZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yb290SW50ZXJmYWNlID8gb3B0aW9ucy5yb290SW50ZXJmYWNlIDogdGlueWJpbmQucm9vdEludGVyZmFjZVxuICAgIHZpZXdPcHRpb25zLnByZWxvYWREYXRhID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWxvYWREYXRhID8gb3B0aW9ucy5wcmVsb2FkRGF0YSA6IHRpbnliaW5kLnByZWxvYWREYXRhXG4gICAgdmlld09wdGlvbnMuaGFuZGxlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVyID8gb3B0aW9ucy5oYW5kbGVyIDogdGlueWJpbmQuaGFuZGxlclxuXG4gICAgLy8gbWVyZ2UgZXh0ZW5zaW9uc1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIHRpbnliaW5kLmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIHRpbnliaW5kLmZvcm1hdHRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIHRpbnliaW5kLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCB0aW55YmluZC5hZGFwdGVycyk7XG5cbiAgICAvLyBnZXQgYWxsIHN0YXJCaW5kZXJzIGZyb20gYXZhaWxhYmxlIGJpbmRlcnNcbiAgICB2aWV3T3B0aW9ucy5zdGFyQmluZGVycyA9IE9iamVjdC5rZXlzKHZpZXdPcHRpb25zLmJpbmRlcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4ga2V5LmluZGV4T2YoJyonKSA+IDA7XG4gICAgfSk7XG5cbiAgICBPYnNlcnZlci51cGRhdGVPcHRpb25zKHZpZXdPcHRpb25zKTtcblxuICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIG1vZGVscywgdmlld09wdGlvbnMpO1xuICAgIHZpZXcuYmluZCgpO1xuICAgIHJldHVybiB2aWV3O1xuICB9LFxufTtcblxuZXhwb3J0IHsgdGlueWJpbmQgfTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBJQm91bmRFbGVtZW50IH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbmNvbnN0IHRyaW1TdHIgPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIFRoZSBET00gZWxlbWVudHMgYW5kIHRoZSBtb2RlbCBvYmplY3RzIGZvciBiaW5kaW5nIGFyZSBwYXNzZWQgaW50byB0aGVcbiAgLy8gY29uc3RydWN0b3IgYWxvbmcgd2l0aCBhbnkgbG9jYWwgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIHRocm91Z2hvdXQgdGhlXG4gIC8vIGNvbnRleHQgb2YgdGhlIHZpZXcgYW5kIGl0J3MgYmluZGluZ3MuXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCd2aWV3IG9wdGlvbnMnLCBvcHRpb25zKTtcbiAgICB0aGlzLm1vZGVscyA9IG1vZGVscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5idWlsZCgpO1xuICB9XG5cbiAgcHVibGljIGJ1aWxkQmluZGluZyhub2RlOiBIVE1MRWxlbWVudCB8IFRleHQsIHR5cGU6IHN0cmluZyB8IG51bGwsIGRlY2xhcmF0aW9uOiBzdHJpbmcsIGJpbmRlcjogQmluZGVyPGFueT4sIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIGxldCBtYXRjaGVzID0gZGVjbGFyYXRpb24ubWF0Y2goREVDTEFSQVRJT05fU1BMSVQpO1xuICAgIGlmKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbWF0Y2hlcycpO1xuICAgIH1cbiAgICBsZXQgcGlwZXMgPSBtYXRjaGVzLm1hcCh0cmltU3RyKTtcbiAgICBsZXQga2V5cGF0aCA9IHBpcGVzLnNoaWZ0KCkgfHwgbnVsbDtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIChub2RlIGFzIEhUTUxFbGVtZW50KSwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBwaXBlcykpO1xuICB9XG5cbiAgLy8gUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgLy8gYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbHMsIGksIGxlbjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHRoaXMsIChlbGVtZW50c1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRpbmdzLnNvcnQoYmluZGluZ0NvbXBhcmF0b3IpO1xuICB9XG5cbiAgdHJhdmVyc2Uobm9kZTogSUJvdW5kRWxlbWVudCk6IFRCbG9jayB7XG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBsZXQgYmxvY2sgPSBub2RlLm5vZGVOYW1lID09PSAnU0NSSVBUJyB8fCBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGxldCBiaW5kSW5mb3MgPSBbXTtcbiAgICBsZXQgc3RhckJpbmRlcnMgPSB0aGlzLm9wdGlvbnMuc3RhckJpbmRlcnM7XG4gICAgdmFyIHR5cGUsIGJpbmRlciwgaWRlbnRpZmllciwgYXJncztcblxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyB3aXRoIHRoZSBiaW5kaW5nIHByZWZpeC4gRS5nLiBydlxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgdHlwZSA9IGF0dHJpYnV0ZS5uYW1lLnNsaWNlKGJpbmRpbmdQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbdHlwZV07XG4gICAgICAgIGFyZ3MgPSBbXTtcblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3RhckJpbmRlcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBzdGFyQmluZGVyc1trXTtcbiAgICAgICAgICAgIGlmICh0eXBlLnNsaWNlKDAsIGlkZW50aWZpZXIubGVuZ3RoIC0gMSkgPT09IGlkZW50aWZpZXIuc2xpY2UoMCwgLTEpKSB7XG4gICAgICAgICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW2lkZW50aWZpZXJdO1xuICAgICAgICAgICAgICBhcmdzLnB1c2godHlwZS5zbGljZShpZGVudGlmaWVyLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBiaW5kZXIgPSB0aW55YmluZC5mYWxsYmFja0JpbmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PikuYmxvY2spIHtcbiAgICAgICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCB0eXBlLCBhdHRyaWJ1dGUudmFsdWUsIGJpbmRlciwgYXJncyk7XG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZEluZm9zLnB1c2goe2F0dHI6IGF0dHJpYnV0ZSwgYmluZGVyOiBiaW5kZXIsIHR5cGU6IHR5cGUsIGFyZ3M6IGFyZ3N9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJpbmRJbmZvID0gYmluZEluZm9zW2ldO1xuICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgYmluZEluZm8udHlwZSwgYmluZEluZm8uYXR0ci52YWx1ZSwgYmluZEluZm8uYmluZGVyLCBiaW5kSW5mby5hcmdzKTtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGJpbmRJbmZvLmF0dHIubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gYmluZCBjb21wb25lbnRzXG4gICAgaWYgKCFibG9jaykge1xuICAgICAgdHlwZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21wb25lbnRzW3R5cGVdICYmICFub2RlLl9ib3VuZCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IENvbXBvbmVudEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIG5vZGUsIHR5cGUpKTtcbiAgICAgICAgYmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIC8vIEJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgdW5iaW5kKCkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5iaW5kaW5ncykpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgYmluZGluZy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gIHN5bmMoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSB2aWV3IGJhY2sgdG8gdGhlIG1vZGVsIChyZXZlcnNlIHN5bmMpLlxuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiAoYmluZGluZy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSB2aWV3J3MgbW9kZWxzIGFsb25nIHdpdGggYW55IGFmZmVjdGVkIGJpbmRpbmdzLlxuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5tb2RlbHNba2V5XSA9IG1vZGVsc1trZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcudXBkYXRlKSB7XG4gICAgICAgIGJpbmRpbmcudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=