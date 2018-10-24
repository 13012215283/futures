#!/bin/bash

set -o errexit

cd ./ios

xcodebuild archive \
    -workspace futures.xcworkspace \
    -scheme futures \
    -configuration Release \
    -archivePath ~/Desktop/release_ios/futures
    
xcodebuild \
    -exportArchive \
    -archivePath ~/Desktop/release_ios/futures.xcarchive \
    -exportPath ~/Desktop/release_ios/achive \
    -exportOptionsPlist exprotOptionsPlist.plist
