#!/bin/sh

#create the tokens initially
./script.sh

# start cron
/usr/sbin/crond -f -l 8