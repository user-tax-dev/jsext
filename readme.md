<!-- EDIT /Users/z/user/jsext/readme.md -->

nodejs loader for coffeescript

```
ni -D @iuser/jsext
```

[→ test.sh](test.sh)

```sh
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
  --unhandled-rejections=strict $filepath
```


> ./test/test.coffee

> ./test/import.coffee
