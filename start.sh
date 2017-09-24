#!/bin/bash
cd /opt/LMT
git pull >> /root/gitlog/update.log 2>&1
git push >> /root/gitlog/update.log 2>&1
service mongod restart

int=$(ps aux | grep 'node server/server.js' | wc -l)
if [ $int -ne 1 ];
then
    pkill node
fi
/usr/local/bin/npm install > /dev/null 2>&1
/usr/local/bin/npm start >> system.log 2>&1 &

