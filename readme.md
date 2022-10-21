<!-- EDIT /Users/z/user/node-loader/readme.md -->

nodejs loader for coffeescript

```
ni -D @iuser/node-loader
```

[→ test.sh](test.sh)

```sh
#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

bun run build

filepath=./test/test.coffee

exec node \
  --trace-uncaught \
  --experimental-fetch \
  --expose-gc \
  --loader "./lib/index.js" \
  --unhandled-rejections=strict $filepath
```


[→ test/test.coffee](test/test.coffee)

```coffee
#!/usr/bin/env coffee

> ./import:x
  utax/split

+ a

a = 1

console.log a


console.log x
```


[→ test/import.coffee](test/import.coffee)

```coffee
#!/usr/bin/env coffee

export default 2
```

