import { Debug, JQuery } from '@ribajs/core';
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
class Dom {
  /**
   * The name of the data attribute on the container
   *
   * @default
   */
  public dataNamespace = 'namespace';

  /**
   * Class name used to identify the containers
   *
   * @default
   */
  public containerSelector: string;

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   */
  public currentHTML?: string;

  private _$wrapper: JQuery<Element>;

  private parseTitle: boolean;

  private debug = Debug('router:Dom');

  constructor($wrapper: JQuery<Element>, containerSelector = '[data-namespace]', parseTitle: boolean) {
    this._$wrapper = $wrapper;
    this.containerSelector = containerSelector;
    this.parseTitle = parseTitle;
  }

  /**
   * Parse the responseText obtained from the xhr call
   * @see https://stackoverflow.com/a/41038197/1465919
   */
  public parseResponse(responseText: string): JQuery<Element> {
    this.currentHTML = responseText;

    const wrapper = document.createElement('template') as HTMLTemplateElement;
    wrapper.innerHTML = responseText;

    const titleEl = wrapper.querySelector('title');

    if (titleEl && titleEl.textContent) {
      document.title = titleEl.textContent;
    }

    return this.getContainer(wrapper);
    // this.currentHTML = responseText;
    // const $newPage = JQuery( responseText );

    // if (this.parseTitle === true) {
    //   const $title = $newPage.filter('title');
    //   if ($title.length) {
    //     document.title = $title.text();
    //   }
    // }
    // return this.getContainer($newPage);
  }

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   */
  public getWrapper(): JQuery<Element> {
    return this._$wrapper;
  }

  /**
   * Get the container on the current DOM,
   * or from an Element passed via argument
   */
  public getContainer(element?: HTMLElement | HTMLTemplateElement | JQuery<HTMLElement | HTMLTemplateElement>): JQuery<Element> {

    if (!element) {
      throw new Error('Barba.js: [getContainer] No element to get container from!');
    }

    let el: HTMLElement | HTMLTemplateElement ;

    if ((element as JQuery<Node>).jquery) {
      el = (element as JQuery<HTMLElement | HTMLTemplateElement>)[0];
    } else {
      el = element as HTMLTemplateElement | HTMLElement;
    }

    if (!el) {
      throw new Error('Barba.js: [getContainer] DOM not ready!');
    }

    const container = this.parseContainer(el);

    if (!container) {
      throw new Error('[DOM] No container found');
    }

    return JQuery(container);

    // if (!$newPage) {
    //   $newPage = JQuery(document.body);
    // }
    // if (!$newPage) {
    //   throw new Error('[DOM] DOM not ready!');
    // }
    // const $container = this.parseContainer($newPage[0] as Element);
    // if (!$container) {
    //   throw new Error('[DOM] No container found');
    // }
    // this.debug('getContainer', $container);
    // return $container;
  }

  /**
   * Get the namespace of the container
   */
  public getNamespace($element: JQuery<Element>): string {
    if ($element && $element.data()) {
      return $element.data('namespace');
    } else {
      throw new Error('[DOM] Missing data-namespace attribute');
    }
  }

  /**
   * Put the container on the page
   */
  public putContainer(element: HTMLElement | JQuery<Element>) {
    this.debug('putContainer', element);
    if ((element as JQuery<Element>).jquery) {
      element = element as JQuery<Element>;
      element.css('visibility', 'hidden');
      const wrapper = this.getWrapper()[0];
      wrapper.appendChild(element[0]);
    } else {
      element = element as HTMLElement;
      element.style.visibility = 'hidden';
      const wrapper = this.getWrapper()[0];
      wrapper.appendChild(element);
    }

  }

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param element
   */
  public parseContainer(newPage: HTMLTemplateElement | HTMLElement): Element  {
    if (!newPage) {
      throw new Error(`No container with selector "${this.containerSelector}" found!`);
    }

    let result: Element | null;

    if ((newPage as HTMLTemplateElement).content) {
      result = (newPage as HTMLTemplateElement).content.querySelector(this.containerSelector);
    } else {
      result = newPage.querySelector(this.containerSelector);
    }

    if (!result) {
      throw new Error(`No container with selector "${this.containerSelector}" found! ${newPage.tagName}`);
    }

    return result;
    // const $container = $newPage.find(this.containerSelector);
    // if (!$container.length) {
    //   this.debug(`No container with selector "${this.containerSelector}" found!`, $newPage);
    //   throw new Error(`No container with selector "${this.containerSelector}" found!`);
    // }
    // return $container;
  }
}

export { Dom };