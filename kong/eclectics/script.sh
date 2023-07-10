#!/bin/sh

echo "This is a script, run by cron!"
echo "this is something else bero"

function mock_curl_response(){
    echo '{"success":true,"token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNsaWVudElkIjoiZ2Fwc3RhY2sifSwiand0aWQiOiJNWjFMRDdVS0pVRiIsImlhdCI6MTY3NDQyMDIyNiwiZXhwIjoxNjc0NDIzODI2fQ.J1WnUZkqyqoGXCgsya8cDRNXZ4WhsEM5tT_A4fufXxoTUdAxQdI8iy6HoWUbh8FvjierY-AugogrbP5LJGmLBg"}'
}

api_key=NSQTTY0-T2NMYG6-HMGP35A-2B0TYRT
clientId=gapstack

# token=$( mock_curl_response | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

token=$(curl -L -X POST 'https://testopenapi.creditbank.co.ke:4000/auth' -H 'Content-Type: application/json' --data '{
    "clientId":"'"$clientId"'",
    "api_key":"'"$api_key"'"
}' | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

echo $token > /home/token.txt
echo $clientId > /home/clientId.txt
echo $api_key > /home/api_key.txt
echo $token
echo $clientId
echo $api_key
echo `date`