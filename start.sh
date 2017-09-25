#!/bin/bash
cd /opt/LMT
git pull >> /root/gitlog/update.log 2>&1
git push >> /root/gitlog/update.log 2>&1
service mongod restart

int=$(ps aux | grep 'node server/server.js' | wc -l)
if [ $int -ne 2 ];
then
    echo $int >> system.log 2>&1
    /usr/bin/pkill node
    /usr/bin/pkill npm
fi
<<<<<<< HEAD
 echo 'npm starting...' >> /opt/LMT/system.log 2>&1
 sudo /usr/local/bin/npm start >> /opt/LMT/system.log 2>&1 &
 
=======
/usr/local/bin/npm install > /dev/null 2>&1
/usr/local/bin/npm start >> system.log 2>&1 &

>>>>>>> c2ccd7f10e9059829e6226bc6e3cadfe208e1938
