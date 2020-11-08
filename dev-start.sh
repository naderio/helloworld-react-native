#!/usr/bin/env bash
set -eou pipefail -x

cp package.template.json package.json

cp package-lock.template.json package-lock.json

cp yarn.template.lock yarn.lock

npm install
