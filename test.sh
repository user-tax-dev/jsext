#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

bun run build

filepath=./test/test.js

exec node \
  --trace-uncaught \
  --experimental-fetch \
  --expose-gc \
  --loader "./lib/index.js" \
  --experimental-import-meta-resolve \
  --unhandled-rejections=strict $filepath
