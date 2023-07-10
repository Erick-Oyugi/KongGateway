## Work to be done in the script
- [x] Deploy postgres database using docker image
- [x] Deploy kong using docker image
- [x] Deploy ELK stack using docker image
- [x] Setup plugin in kong to send logs to ELK stack
- [ ] Setup plugin in kong to send logs to the banking SEIM system
- [ ] Secure the admin API's by modifying the IPTables and adding authorization keys(TBD in staging and production environment)
- [*] Create a way to backup the pg_data at regular intervals to prevent data loss in case of faliures

>## Description
>The script starts the various docker containers in the docker-compose.yml file, in the sequence
>they are supposed to be started along with proper healthchecks.
>```


>## Running the script
>
>Run the script kong-setup.sh after giving it all the permissions required on the OS
>>```console
>>$ ./kong-setup.sh 


>## Stopping the script
>
>Run the script stop-services.sh after giving it all the permissions required on the OS
**Note :** Stopping the scripts will stop and delete all the docker containers
>>```console
>>$ ./stop-services.sh 
>>```
>>





>## ELK setup and running
>  
> Visit **http://localhost:5601** to view logs in kibana.
> 
>> List of exposed ports for working with ELK stack
>> * 5044: Logstash Beats input
>> * 50000: Logstash TCP input
>> * 9600: Logstash monitoring API
>> * 9200: Elasticsearch HTTP
>> * 9300: Elasticsearch TCP transport
>> * 5601: Kibana

>## Note 
> The scripts named **dev-{}.sh** are not to be used in production environments # KongGateway
# KongGateway
