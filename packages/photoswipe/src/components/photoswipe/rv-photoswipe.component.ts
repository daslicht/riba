import { Component } from "@ribajs/core";

import template from "./rv-photoswipe.component.html";
import fullscreenTemplate from "./rv-photoswipe.fullscreen.component.html";

import PhotoSwipe from "photoswipe";
import PhotoSwipeUI from "../../services/photoswipe-ui.service";
import { Options, Item } from "../../types";

interface Scope {
  // Properties
  items: Item[];
  /** Current item */
  currItem?: Item;
  isFullscreen: boolean;
  isZoomed: boolean;
  isZoomAllowed: boolean;
  zoomLevel: number;

  // Methods
  open: PhotoswipeComponent["open"];
  openByIndex: PhotoswipeComponent["openByIndex"];
  close: PhotoswipeComponent["close"];
  next: PhotoswipeComponent["next"];
  prev: PhotoswipeComponent["prev"];
  toggleZoom: PhotoswipeComponent["openByIndex"];
  toggleFullscreen: PhotoswipeComponent["toggleFullscreen"];

  // Observed attributes
  openImageOnClick: boolean;
  fullscreenContainerSelector: string;
  itemsSelector: string;

  controlNextIconShow: boolean;
  controlPrevIconShow: boolean;
  controlCloseIconShow: boolean;
  controlZoomInIconShow: boolean;
  controlZoomOutIconShow: boolean;
  controlFullscreenOnIconShow: boolean;
  controlFullscreenOffIconShow: boolean;
  controlShareIconShow: boolean;

  controlNextIconSrc: string;
  controlPrevIconSrc: string;
  controlCloseIconSrc: string;
  controlZoomInIconSrc: string;
  controlZoomOutIconSrc: string;
  controlFullscreenOnIconSrc: string;
  controlFullscreenOffIconSrc: string;
  controlShareIconSrc: string;

  controlNextIconSize: number;
  controlPrevIconSize: number;
  controlCloseIconSize: number;
  controlZoomInIconSize: number;
  controlZoomOutIconSize: number;
  controlFullscreenOnIconSize: number;
  controlFullscreenOffIconSize: number;
  controlShareIconSize: number;
}

export class PhotoswipeComponent extends Component {
  public static tagName = "rv-photoswipe";

  protected autobind = true;

  protected pswp?: PhotoSwipe<Options, PhotoSwipeUI>;

  protected pswpElement: HTMLElement | null = null;

  protected images: HTMLImageElement[] = [];

  protected listeners = {
    items: [],
  };

  protected options: Options = {
    // optionName: 'option value'
    getThumbBoundsFn: this.getThumbBoundsFn.bind(this),

    // Buttons/elements
    captionEl: false,
    counterEl: false,
    preloaderEl: true,

    closeElClasses: [], // 'item', 'caption', 'zoom-wrap', 'ui', 'top-bar'
  };

  static get observedAttributes() {
    return [
      "open-image-on-click",
      "fullscreen-container-selector",
      "items-selector",
      // Show icons
      "control-next-icon-show",
      "control-prev-icon-show",
      "control-close-icon-show",
      "control-zoom-in-icon-show",
      "control-zoom-out-icon-show",
      "control-fullscreen-on-icon-show",
      "control-fullscreen-off-icon-show",
      "control-share-icon-show",
      // Icon sources
      "control-next-icon-src",
      "control-prev-icon-src",
      "control-close-icon-src",
      "control-zoom-in-icon-src",
      "control-zoom-out-icon-src",
      "control-fullscreen-on-icon-src",
      "control-fullscreen-off-icon-src",
      "control-share-icon-src",
      // Icon sizes
      "control-next-icon-size",
      "control-prev-icon-size",
      "control-close-icon-size",
      "control-zoom-in-icon-size",
      "control-zoom-out-icon-size",
      "control-fullscreen-on-icon-size",
      "control-fullscreen-off-icon-size",
      "control-share-icon-size",
    ];
  }

  protected scope: Scope = {
    // Properties
    items: [],
    isFullscreen: false,
    isZoomed: false,
    isZoomAllowed: false,
    zoomLevel: 0,

    // Methods
    open: this.open,
    openByIndex: this.openByIndex,
    close: this.close,
    next: this.next,
    prev: this.prev,
    toggleZoom: this.toggleZoom,
    toggleFullscreen: this.toggleFullscreen,

    // Observed attribute default values
    openImageOnClick: false,
    fullscreenContainerSelector: ".pswp",
    itemsSelector: "img",

    controlNextIconShow: true,
    controlPrevIconShow: true,
    controlCloseIconShow: true,
    controlZoomInIconShow: true,
    controlZoomOutIconShow: true,
    controlFullscreenOnIconShow: true,
    controlFullscreenOffIconShow: true,
    controlShareIconShow: false,

    controlNextIconSrc: "",
    controlPrevIconSrc: "",
    controlCloseIconSrc: "",
    controlZoomInIconSrc: "",
    controlZoomOutIconSrc: "",
    controlFullscreenOnIconSrc: "",
    controlFullscreenOffIconSrc: "",
    controlShareIconSrc: "",

    controlNextIconSize: 32,
    controlPrevIconSize: 32,
    controlCloseIconSize: 32,
    controlZoomInIconSize: 32,
    controlZoomOutIconSize: 32,
    controlFullscreenOnIconSize: 32,
    controlFullscreenOffIconSize: 32,
    controlShareIconSize: 16,
  };

  constructor(element?: HTMLElement) {
    super(element);
    // console.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PhotoswipeComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected getThumbBoundsFn(index: number) {
    if (!this.images) {
      return { x: 0, y: 0, w: 0 };
    }
    const image = this.images[index];
    const pageYScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const rect = image.getBoundingClientRect();
    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
  }

  protected async beforeBind() {
    // console.debug("beforeBind", this.scope);
    return await super.beforeBind();
  }

  protected closeShare() {
    const bs4ShareComponent = this.el.querySelector("bs4-share");
    bs4ShareComponent?.dispatchEvent(new CustomEvent("close"));
  }

  protected openShare() {
    const bs4ShareComponent = this.el.querySelector("bs4-share");
    bs4ShareComponent?.dispatchEvent(new CustomEvent("open"));
  }

  // Event handlers

  /**
   * Before slides change before the content is changed, but after navigation)
   * Update UI here (like "1 of X" indicator)
   */
  protected onBeforeChange() {
    // console.debug("onBeforeChange", this.pswp?.currItem);
    this.closeShare();
  }

  /**
   * After slides change
   * (after content changed)
   */
  protected onAfterChange() {
    this.scope.currItem = this.pswp?.currItem;
    // console.debug("onAfterChange", this.scope.currItem);
    setTimeout(() => {
      this.scope.isZoomAllowed = this.isZoomAllowed();
    }, 0);
  }

  /**
   * Image loaded
   * @param index index of a slide that was loaded
   * @param item slide object
   */
  protected onImageLoadComplete(/*index: number, item: Item*/) {
    // console.debug("imageLoadComplete", index, item);
  }

  /**
   * Viewport size changed
   */
  protected onResize() {
    // console.debug("onResize", this.pswp?.currItem);
    this.scope.isZoomAllowed = this.isZoomAllowed();
  }

  /**
   * Triggers when PhotoSwipe "reads" slide object data,
   * which happens before content is set, or before lazy-loading is initiated.
   * Use it to dynamically change properties
   * @param index index of a slide that was loaded
   * @param item slide object
   */
  protected onGettingData(/*index: number, item: Item*/) {
    // console.debug("onGettingData", index, item);
  }

  protected onMouseUsed() {
    // console.debug("onMouseUsed");
  }
  /**
   * Opening zoom in animation starting
   */
  protected onInitialZoomIn() {
    // console.debug("onInitialZoomIn");
  }

  /**
   * Opening zoom in animation finished
   */
  protected onInitialZoomInEnd() {
    // console.debug("onInitialZoomInEnd");
  }

  /**
   * Closing zoom out animation started
   */
  protected onInitialZoomOut() {
    // console.debug("onInitialZoomOut");
  }

  /**
   * Closing zoom out animation finished
   */
  protected onInitialZoomOutEnd() {
    // console.debug("onInitialZoomOutEnd");
  }

  protected onParseVerticalMargin() {
    // console.debug("onParseVerticalMargin");
  }

  /**
   * Gallery unbinds events
   * (triggers before closing animation)
   */
  protected onUnbindEvents() {
    // console.debug("onUnbindEvents");
    this.closeShare();
  }

  /**
   * Gallery starts closing
   */
  protected onClose() {
    // console.debug("onClose");
    this.pswp?.ui?.getFullscreenAPI()?.exit();
    this.closeShare();
    this.scope.isZoomAllowed = false;
  }

  /**
   * After gallery is closed and closing animation finished.
   * lean up your stuff here.
   */
  protected onDestroy() {
    // console.debug("onDestroy");
    this.closeShare();
  }

  /**
   * Called when the page scrolls.
   * The callback is passed an offset with properties {x: number, y: number}.
   *
   * PhotoSwipe uses the offset to determine the top-left of the template,
   * which by default is the top-left of the viewport. When using modal: false,
   * you should listen to this event (before calling .init()) and modify the offset
   * with the template's getBoundingClientRect().
   *
   * Look at the "Implementing inline gallery display" FAQ section for more info.
   */
  protected onUpdateScrollOffset() {
    // console.debug("onUpdateScrollOffset");
  }

  /**
   * Allow to call preventDefault on down and up events
   * @param e original event
   * @param isDown true = drag start, false = drag release
   * @param preventObj
   */
  protected onPreventDragEvent(e: Event, isDown: boolean, preventObj: any) {
    // console.debug("onPreventDragEvent", e, isDown, preventObj);

    // e - original event
    // isDown - true = drag start, false = drag release

    // Line below will force e.preventDefault() on:
    // touchstart/mousedown/pointerdown events
    // as well as on:
    // touchend/mouseup/pointerup events
    preventObj.prevent = true;
  }

  // Scope methods

  public openByIndex(index: number) {
    return this.open(this.scope.items[index]);
  }

  public close() {
    this.pswp?.close();
  }

  public next() {
    this.pswp?.next();
  }

  public prev() {
    this.pswp?.prev();
  }

  public toggleZoom() {
    this.pswp?.toggleDesktopZoom();
    this.scope.zoomLevel = this.pswp?.getZoomLevel() || 1;
    this.scope.isZoomed = this.scope.zoomLevel < 1;
    // console.debug("toggleZoom", this.scope.zoomLevel);
  }

  public toggleFullscreen() {
    const fullscrenAPI = this.pswp?.ui?.getFullscreenAPI();
    if (!fullscrenAPI) {
      console.error("fullscrenAPI not found");
      return;
    }
    if (fullscrenAPI.isFullscreen()) {
      fullscrenAPI.exit();
      this.scope.isFullscreen = false;
    } else {
      fullscrenAPI.enter();
      this.scope.isFullscreen = true;
    }
    (this.pswp?.ui as any).updateFullscreen();
  }

  public openWithoutAnimation(item: Item) {
    const oldAnimationDuration = this.options.showAnimationDuration;
    this.options.showAnimationDuration = 0;
    this.open(item);
    if (oldAnimationDuration) {
      this.options.showAnimationDuration = oldAnimationDuration;
    } else {
      delete this.options.showAnimationDuration;
    }
  }

  public open(item: Item) {
    // console.debug("open", item, this.scope.items);
    if (!this.pswpElement) {
      console.error(
        `Element with selector "${this.scope.fullscreenContainerSelector}" not found`
      );
      return;
    }
    const index = this.scope.items.indexOf(item);
    if (index >= 0) {
      this.options.index = index;

      this.scope.isFullscreen = false;
      this.scope.isZoomed = false;

      this.pswp = new PhotoSwipe<Options, PhotoSwipeUI>(
        this.pswpElement,
        PhotoSwipeUI,
        this.scope.items,
        this.options
      );
      this.addPswpEventListeners();
      this.pswp.init();

      this.scope.isZoomAllowed = this.isZoomAllowed();
      this.scope.currItem = this.pswp?.currItem;

      console.debug("isZoomAllowed", this.scope.isZoomAllowed);

      //add listener
    } else {
      console.error("[rv-photoswipe] failed to get index of item ", item);
    }
  }

  protected addPswpEventListeners() {
    this.pswp?.listen("beforeChange", this.onBeforeChange.bind(this));
    this.pswp?.listen("afterChange", this.onAfterChange.bind(this));
    this.pswp?.listen("imageLoadComplete", this.onImageLoadComplete.bind(this));
    this.pswp?.listen("resize", this.onResize.bind(this));
    this.pswp?.listen("gettingData", this.onGettingData.bind(this));
    this.pswp?.listen("mouseUsed", this.onMouseUsed.bind(this));
    this.pswp?.listen("mouseUsed", this.onMouseUsed.bind(this));
    this.pswp?.listen("initialZoomIn", this.onInitialZoomIn.bind(this));
    this.pswp?.listen("initialZoomInEnd", this.onInitialZoomInEnd.bind(this));
    this.pswp?.listen("initialZoomOut", this.onInitialZoomOut.bind(this));
    this.pswp?.listen("initialZoomOutEnd", this.onInitialZoomOutEnd.bind(this));
    this.pswp?.listen(
      "parseVerticalMargin",
      this.onParseVerticalMargin.bind(this)
    );
    this.pswp?.listen("onUnbindEvents", this.onUnbindEvents.bind(this));
    this.pswp?.listen("close", this.onClose.bind(this));
    this.pswp?.listen("destroy", this.onDestroy.bind(this));
    this.pswp?.listen(
      "updateScrollOffset",
      this.onUpdateScrollOffset.bind(this)
    );
  }

  protected isZoomAllowed() {
    return !!this.pswpElement?.classList.contains("pswp--zoom-allowed");
  }

  protected removeEventListeners() {
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].removeEventListener(
        "click",
        this.openByIndex.bind(this, i)
      );
    }
  }

  protected setItems() {
    this.images = Array.from(
      this.el.querySelectorAll(this.scope.itemsSelector)
    );

    for (let i = 0; i < this.images.length; i++) {
      if (this.scope.openImageOnClick) {
        this.images[i].addEventListener(
          "click",
          this.openByIndex.bind(this, i)
        );
      }

      const src =
        this.images[i].dataset.fsSrc ||
        this.images[i].currentSrc ||
        this.images[i].src;
      const width =
        this.images[i].dataset.fsWidth ||
        this.images[i].width ||
        this.images[i].naturalWidth;
      const height =
        this.images[i].dataset.fsHeight ||
        this.images[i].height ||
        this.images[i].naturalHeight;
      if (!src || !width || !height) {
        console.warn(
          "[rv-photoswipe] image element found without src, width or height. Ignoring.."
        );
        continue;
      }

      this.scope.items.push({
        src: src,
        msrc: this.images[i].currentSrc || this.images[i].src || src,
        w: Number(width),
        h: Number(height),
      });
    }
  }

  protected initFullscreenTemplate() {
    this.pswpElement = this.el.querySelector<HTMLElement>(
      this.scope.fullscreenContainerSelector
    );
  }

  protected async afterBind() {
    console.debug("afterBind", this.scope);
    await super.afterBind();

    this.setItems();

    this.initFullscreenTemplate();

    const hashData = this.parseHash();
    if (hashData.pid && hashData.gid) {
      //Todo check for bounds
      this.openWithoutAnimation(this.scope.items[hashData.pid - 1]);
    }
  }

  protected parseHash() {
    const hash = window.location.hash.substring(1),
      params: { gid?: number; pid?: number } = {};

    if (hash.length < 5) {
      // pid=1
      return params;
    }

    const vars = hash.split("&");
    for (let i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      const pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0] as "gid" | "pid"] = parseInt(pair[1], 10);
    }

    return params;
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected template() {
    // Only set the component template if there no childs already<rv-photswipe>serhsehsehjiu </>
    if (this.el.hasChildNodes()) {
      return (this.el as HTMLElement).innerHTML + fullscreenTemplate;
    } else {
      return template + fullscreenTemplate;
    }
  }
}
