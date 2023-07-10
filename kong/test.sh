#!/bin/bash

# echo "running crond"
# crond 
# echo "running test.sh script"
# ./docker-entrypoint.sh


  
# turn on bash's job control
# set -m

echo "running test script"
  
# Start the primary process and put it in the background
# ./docker-entrypoint.sh &
  
# Start the helper process
crond
  
# the my_helper_process might need to know how to wait on the
# primary process to start before it does its work and returns
  
  
# now we bring the primary process back into the foreground
# and leave it there
# fg %1