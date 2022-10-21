var COMMONJS;

import jsext from './jsext';

export const resolve = (specifier, context, defaultResolve) => {
  return defaultResolve(jsext(specifier), context, defaultResolve);
};

COMMONJS = {
  format: "commonjs",
  shortCircuit: true
};

export const load = (url, context, defaultLoad) => {
  if (url.endsWith(".node")) {
    return COMMONJS;
  }
  return defaultLoad(url, context);
};
