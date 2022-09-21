#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

bun run build

filepath=./test/test.coffee

exec node  --trace-warnings \
  --es-module-specifier-resolution=node \
  --trace-uncaught \
  --experimental-fetch \
  --expose-gc \
  --loader "./lib/index.js" \
  --unhandled-rejections=strict $filepath
