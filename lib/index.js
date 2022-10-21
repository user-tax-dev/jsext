#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var JS_SUFFIX;

JS_SUFFIX = '.js';

export const resolve = (specifier, context, defaultResolve) => {
  if (specifier.includes('/') && !specifier.endsWith(JS_SUFFIX)) {
    specifier += JS_SUFFIX;
  }
  return defaultResolve(specifier, context, defaultResolve);
};

export const load = (url, context, defaultLoad) => {
  return defaultLoad(url, context, defaultLoad);
};
