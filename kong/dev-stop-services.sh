#!/bin/bash


#stop all running docker containers
echo "Killing the containers..."
docker kill $(docker ps -q)


#remove all docker containers
#This command removes the stopped as well as the running containers
echo "Removing all the containers..."
docker rm $(docker ps -a -q)

#clear the database
echo "Clearing the database..."
rm -rf pg_data


#Remove all the docker images
#docker rmi $(docker images -q)
echo "Cleanup complete"