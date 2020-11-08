#!/usr/bin/env bash
set -eou pipefail

cd ./ios

xcodebuild -alltargets clean

rm -fr ios/build/*

rm -fr ./Pods/*
