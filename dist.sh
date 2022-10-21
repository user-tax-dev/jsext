#!/usr/bin/env bash

_DIR=$(
  cd "$(dirname "$0")"
  pwd
)

cd $_DIR

set -ex

version=$(cat package.json | jq -r '.version')

mdi

add() {
  git add -u
  git commit -m v$version || true
}

git pull
nr build
npm set unsafe-perm true
add
npm version patch
add
git push
npm publish --access=public
