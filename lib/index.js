#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var baseURL, compile, getPackageType, not_coffee;

import {
  readFile
} from "fs/promises";

import {
  readFileSync,
  existsSync
} from "fs";

import {
  createRequire
} from "module";

import {
  dirname,
  normalize,
  extname,
  join,
  resolve as resolvePath
} from "path";

import {
  cwd
} from "process";

import {
  fileURLToPath,
  pathToFileURL
} from "url";

import CoffeeScript from "coffeescript";

import {
  coffee_plus
} from 'coffee_plus';

compile = coffee_plus(CoffeeScript);

baseURL = pathToFileURL(`${cwd}/`).href;

not_coffee = (specifier) => {
  return specifier.slice(specifier.lastIndexOf(".") + 1) !== 'coffee';
};

export const resolve = (specifier, context, defaultResolve) => {
  var file, fp, parentURL, prefix, ref;
  ({parentURL = baseURL} = context);
  if (not_coffee(specifier)) {
    $ : {
      while (true) {
        if (parentURL.startsWith('file://')) {
          ref = ['./', '../'];
          for (prefix of ref) {
            if (specifier.startsWith(prefix)) {
              file = specifier + '.coffee';
              fp = normalize(join(dirname(parentURL.slice(7)), file));
              if (existsSync(fp)) {
                specifier = fp;
                break $;
              }
            }
          }
        }
        return defaultResolve(specifier, context, defaultResolve);
      }
    }
  }
  return {
    shortCircuit: true,
    url: new URL(specifier, parentURL).href
  };
};

export const load = async(url, context, defaultLoad) => {
  var format, rawSource, transformedSource;
  if (not_coffee(url)) {
    return defaultLoad(url, context, defaultLoad);
  }
  format = (await getPackageType(url));
  if (format === "commonjs") {
    return {format};
  }
  ({
    source: rawSource
  } = (await defaultLoad(url, {format})));
  transformedSource = compile(rawSource.toString(), {
    bare: true,
    filename: url,
    inlineMap: true
  });
  return {
    format,
    source: transformedSource
  };
};

getPackageType = async(url) => {
  var dir, isFilePath, packagePath, type;
  isFilePath = !!extname(url);
  dir = isFilePath ? dirname(fileURLToPath(url)) : url;
  packagePath = resolvePath(dir, "package.json");
  type = (await readFile(packagePath, {
    encoding: "utf8"
  }).then((filestring) => {
    return JSON.parse(filestring).type;
  }).catch((err) => {
    if ((err != null ? err.code : void 0) !== "ENOENT") {
      return console.error(err);
    }
  }));
  if (type) {
    return type;
  }
  return dir.length > 1 && getPackageType(resolvePath(dir, ".."));
};
