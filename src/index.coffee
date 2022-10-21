#!/usr/bin/env coffee

JS_SUFFIX = '.js'

export resolve = (specifier, context, defaultResolve) =>
  if specifier.includes('/') and not specifier.endsWith(JS_SUFFIX)
    specifier+=JS_SUFFIX
  return defaultResolve(specifier, context, defaultResolve)

export load = (url, context, defaultLoad)=>
  return defaultLoad(url, context, defaultLoad)

