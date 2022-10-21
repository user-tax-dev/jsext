#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var JS_SUFFIX;

JS_SUFFIX = '.js';

export const resolve = (specifier, context, defaultResolve) => {
  var begin, pos;
  if (specifier.startsWith('@')) {
    begin = specifier.indexOf('/', 1) + 1;
  } else {
    begin = 1;
  }
  pos = specifier.indexOf('/', begin);
  if (pos > 0 && !specifier.slice(pos + 1).split('/').pop().includes('.')) {
    specifier += JS_SUFFIX;
  }
  return defaultResolve(specifier, context, defaultResolve);
};

export const load = (url, context, defaultLoad) => {
  return defaultLoad(url, context, defaultLoad);
};
