#!/usr/bin/env coffee

JS_SUFFIX = '.js'

jsext = (specifier)=>
  if specifier.startsWith '@'
    begin = specifier.indexOf('/',1)+1
  else
    begin = 1

  pos = specifier.indexOf('/',begin)
  if pos > 0 and not specifier[pos+1..].split('/').pop().includes('.')
    specifier+=JS_SUFFIX

  specifier

export resolve = (specifier, context, defaultResolve) =>
  return defaultResolve(
    jsext(specifier), context, defaultResolve
  )


