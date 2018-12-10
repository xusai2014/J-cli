#!/usr/bin/env node
var shell = require('shelljs');

shell.cp('-R','template/ios/PROJECT_NAME/Images.xcassets','tmp')