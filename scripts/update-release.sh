#!/usr/bin/env bash
set -eou pipefail

VALUE=$(node -e 'console.log(require("./package.json").version)')

cat <<EOS > ./src/common/release.js
export const RELEASE_VERSION = '${VALUE}';
console.disableYellowBox = true;
EOS
