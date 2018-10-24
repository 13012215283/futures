#!/bin/bash

set -o errexit

cd ./android

adb push ./app/src/main/assets/index.android.bundle /storage/emulated/0/echoesnet/futures/index.android.bundle
adb push ./app/src/main/assets/index.android.bundle.meta /storage/emulated/0/echoesnet/futures/index.android.bundle.meta
