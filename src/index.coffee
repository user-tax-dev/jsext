> ./jsext

< resolve = (specifier, context, defaultResolve) =>
  return defaultResolve(
    jsext(specifier), context, defaultResolve
  )


COMMONJS = {
  format: "commonjs",
  shortCircuit: true,
}

< load = (url, context, defaultLoad) =>
  if (url.endsWith(".node"))
    return COMMONJS
  return defaultLoad(url, context)
