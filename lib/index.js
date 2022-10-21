#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var JS_SUFFIX, jsext;

JS_SUFFIX = '.js';

jsext = (specifier) => {
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
  return specifier;
};

export const resolve = (specifier, context, defaultResolve) => {
  return defaultResolve(jsext(specifier), context, defaultResolve);
};
