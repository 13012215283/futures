#!/bin/bash

set -o errexit

react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios/futures/Assets/ReactResources/index.ios.bundle \
    --assets-dest ios/futures/Assets/ReactResources/
