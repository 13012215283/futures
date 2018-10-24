#!/bin/bash

set +o errexit

git status candlestick-chart | grep 'nothing to commit'

if [ $? != 0 ]
then
    cd candlestick-chart 
    git checkout -- .
    git pull
    yarn build  
    cd ..
else
    echo 'candle chart not modified'
fi

if [ ! -d './candlestick-chart/build' ]
then
    yarn chart:build
else
    echo 'build path exist'
fi



set -o errexit
