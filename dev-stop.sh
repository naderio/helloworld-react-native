#!/usr/bin/env bash
set -eou pipefail -x

cp package.json package.template.json
cat <<EOS > package.json
{
  "private": true,
  "name": "helloworld-react-native",
  "version": "0.1.0"
}
EOS

cp package-lock.json package-lock.template.json
rm package-lock.json

cp yarn.lock yarn.template.lock
rm yarn.lock

