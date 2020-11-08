#!/usr/bin/env bash
set -eou pipefail -x

source $(dirname $0)/config.sh

$(dirname $0)/update-release.sh

cd ./android

./gradlew clean assembleRelease

cd ..

cp ./android/app/build/outputs/apk/release/app-release.apk ./build/app-release.apk

echo -e '\n ==> ./build/app-release.apk'
