#!/bin/sh
# 执行基础库js合并
echo "begin base compile"
cp ./dom/Q.js ./Q.js;find . -name "*.js" | grep -v ./Q.js | grep -v ./Q.all.js | grep -v ./dom/Q.js | grep -v ./util/ | grep -v ./ui/ | grep -v ./effect/ | xargs cat  >> ./Q.js
# 执行所有js合并
echo "begin all compile"
cp ./dom/Q.js ./Q.all.js;find . -name "*.js" | grep -v ./Q.js | grep -v ./Q.all.js | grep -v ./dom/Q.js | grep -v ./ui/ | xargs cat  >> ./Q.all.js
