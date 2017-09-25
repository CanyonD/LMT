#!/bin/bash
cd /opt/LMT
git pull >> /root/gitlog/update.log 2>&1
git push >> /root/gitlog/update.log 2>&1
service mongod restart

int=$(ps aux | grep node | wc -l)
if [ $int -ne 1 ];
then
    /usr/bin/pkill node
    /usr/bin/pkill npm
fi
 sudo /usr/local/bin/npm install > /dev/null 2>&1
 sudo /usr/local/bin/npm start >> /opt/LMT/system.log 2>&1 &