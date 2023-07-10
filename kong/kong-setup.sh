#!/bin/bash

#exporting the .env file variables as variables in the main script
export $(grep -v '^#' .env | xargs)

echo "Starting kong-database..."

docker compose up -d kong-database

STATUS="starting"

while [ "$STATUS" != "healthy" ]
do
    STATUS=$(docker inspect --format {{.State.Health.Status}} kong-database)
    echo "kong-database state = $STATUS"
    sleep 5
done


echo "Running database migrations..."

docker compose run --rm kong kong migrations bootstrap --vv

echo "Starting kong..."

docker compose up kong --build -d

echo "Kong admin running http://127.0.0.1:8001/"
echo "Kong proxy running http://127.0.0.1/"

docker compose up eclectics --build -d
echo "Sleeping for 20 seconds"
sleep 20


echo ""
echo "=========================================================================="
echo ""
echo "Setting up TCP logging plugin and configuring it to send logs to logstash at port 50000..."
echo "bero important $LOGSTASH_BASE_URL"
curl -X POST http://localhost:8001/plugins/ --data "name=tcp-log" --data "config.host=$LOGSTASH_URL" --data "config.port=$LOGSTASH_PORT"

echo ""
echo "=========================================================================="
echo ""
echo "Enabling CORS for kong api gateway"
curl -X POST http://localhost:8001/plugins/ --data "name=cors"  --data "config.origins=*"


echo ""
echo "=========================================================================="
echo ""
echo "Setting up mock service and route for testing..."
#adding service using kong's admin api
curl -i -s -X POST http://localhost:8001/services --data name=example_service --data url='http://mockbin.org' | json_pp

#adding route using kong's admin api
curl -i -X POST http://localhost:8001/services/example_service/routes --data 'paths[]=/mock' --data name=example_route

echo ""
echo "=========================================================================="
echo ""


echo "Visit http://localhost:8000/mock/requests to see kong proxy in action"


