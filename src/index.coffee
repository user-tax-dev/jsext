#!/usr/bin/env coffee

JS_SUFFIX = '.js'

export resolve = (specifier, context, defaultResolve) =>
  if specifier.startsWith '@'
    begin = specifier.indexOf('/',1)+1
  else
    begin = 1

  if specifier.indexOf('/',begin) > 0 and not specifier.endsWith(JS_SUFFIX)
    specifier+=JS_SUFFIX
  return defaultResolve(specifier, context, defaultResolve)

export load = (url, context, defaultLoad)=>
  return defaultLoad(url, context, defaultLoad)

