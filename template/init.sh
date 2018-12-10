#!/usr/bin/env bash

cd cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../

cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../../

echo 'init [fixbug] finish.'