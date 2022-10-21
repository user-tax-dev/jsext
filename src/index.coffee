> ./jsext.js

< resolve = (specifier, context, defaultResolve) =>
  defaultResolve(
    jsext(specifier,context), context, defaultResolve
  )


COMMONJS = {
  format: "commonjs",
  shortCircuit: true,
}

< load = (url, context, defaultLoad) =>
  if (url.endsWith(".node"))
    return COMMONJS
  return defaultLoad(url, context)
