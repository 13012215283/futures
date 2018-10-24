#!/bin/bash

set -o errexit

cd ./ios

xcodebuild archive \
    -workspace futures.xcworkspace \
    -scheme futures \
    -configuration Debug \
    -archivePath ~/Desktop/debug_ios/futures

xcodebuild \
    -exportArchive \
    -archivePath ~/Desktop/debug_ios/futures.xcarchive \
    -exportPath ~/Desktop/debug_ios/achive \
    -exportOptionsPlist exprotOptionsPlistDev.plist
