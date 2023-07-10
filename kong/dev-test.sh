#!/bin/bash

# grep -v '^#' .env | xargs

# grep -v '^#' .env
echo '--------------------------------'
export $(grep -v '^#' .env | xargs)
 
echo $ELASTIC_VERSION 
echo $ELASTIC_PASSWORD
echo $POSTGRES_VERSION

#Get the ip Address of the running container : 
#                                                                           #container-id
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' da8b4381b334

#List the networks 
docker network ls

#Inspect the network - Show which container is on this network
docker network inspect {container-name}

#update the plugin
curl -X PATCH http://localhost:8001/plugins/39e15614-d94e-43c7-9625-0c32f7745ac5 --data "name=tcp-log" --data "config.host=127.0.0.1" --data "config.port=50000" | json_pp



┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ #POSTGRES DATABSE BACKUP AND RESTORE FROM DOCKER CONTAINER COMMANDS                                              │
│                                                                                                                  │
│ #get database dump for kong admin api settings                                                                   │
│                #container-name                #username                                                          │
│ docker exec -t kong-database pg_dumpall -c -U kong > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql                        │
│                                                                                                                  │
│                                                                                                                  │
│ #restore database dump for kong admin api settings                                                               │
│     #dumpfilename                  #container-name       #username                                               │
│ cat my_dump.sql | docker exec -i kong-database psql -U kong                                                      │
│                                                                                                                  │
│                                                                                                                  │
│ #Drop a database inside docker container                                                                         │
│             #container-name       #user-name                     #database-name                                  │
│ docker exec kong-database psql -U kong -d postgres -c "DROP DATABASE kong WITH (FORCE);";                        │
│                                                                                                                  │
│                                                                                                                  │
│ #Create a new database inside docker container                                                                   │
│             #container-name       #user-name                           #database-name                            │
│ docker exec kong-database psql -U kong -d postgres -c "CREATE DATABASE kong;";                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────────┐
│ #NOT REQUIRED                                                            │
│ #view the volume mounted on the container                                │
│                                        #continer-id                      │
│ docker inspect -f '{{ json .Mounts }}' 8b6ea698304b                      │
│                                                                          │
│                                                                          │
│ #copy data from host machine to a docker container                       │
│           #file-path  #container-name:volume-path                        │
│ docker cp my_dump.sql kong-database:/var/lib/postgresql/data             │
└──────────────────────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────────────────┐
  │ #TCP WORKING SERVICE AND ROUTE WHEN stream_listen at 5555 ->             │
  │ #service                                                                 │
  │ {                                                                        │
  │   "host": "127.0.0.1",                                                   │
  │   "protocol": "tcp",                                                     │
  │   "name": "tcp-echo-server",                                             │
  │   "port": 8888,                                                          │
  │   "enabled": true                                                        │
  │ }                                                                        │
  │ #route                                                                   │
  │ {                                                                        │
  │   "name":"route-one",                                                    │
  │   "protocols":["tcp"],                                                   │
  │     "isPrivate":true,                                                    │
  │     "destinations":[{"port":5555}],                                      │
  │     "costPerRequest":22                                                  │
  │ }                                                                        │
  └──────────────────────────────────────────────────────────────────────────┘
