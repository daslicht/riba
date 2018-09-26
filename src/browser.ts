import './polyfills';
import JQuery from 'jquery';

import {
  Tinybind,

  // formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,

  // binders
  basicBindersWrapper,
  routerBinders,

  // classes
  EventDispatcher,
  Pjax,
  Prefetch,
} from './index';

// Global tinybind object
const tinybind = new Tinybind();

// regist formatters
tinybind.formatterService.regists(compareFormatters);
tinybind.formatterService.regists(mathFormatters);
tinybind.formatterService.regists(propertyFormatters);
tinybind.formatterService.regists(specialFormatters);
tinybind.formatterService.regists(stringFormatters);

// regist binders
tinybind.binderService.regists(basicBindersWrapper(JQuery));
tinybind.binderService.regists(routerBinders);

/** Additional global exports */
// (window as any).dispatcher = new EventDispatcher('main');
(window as any).prefetch = new Prefetch();

export default tinybind;
