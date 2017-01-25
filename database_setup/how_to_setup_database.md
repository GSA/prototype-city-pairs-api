#How to setup database from cloud.gov console window

During the development phase of a project, the database schema and referrential data are build gradully.
When a project is ready to release to production, you either have an empty database or a non-empty database.
In this case, you have to perform database migration manually.
In this project, the data is predefined. Before this application on live, we need to creat database schema and load data first.


##What we have
1. datafiles:
    award2015.csv
    award2016.csv
    award2017.csv
1. utility programs:
    run_sql_file.js
    run_sql.js
    load_data_to_mysql.js

###1. login to cloud bash console
```
cf org gsa-cto
cf login -a api.fr.cloud.gov --sso
cf ssh citypairsapi
```

###2. in the cloud console, set environment first.

In the cloud ssh shell, you need to source file "setnodepath" to set shell invironment variable of PATH.

entry and run the following Linux commands in the cloud console.

```
cd app
source setnodepath
node --version
```

The contents of setnodepath is as following.
```
#!/bin/bash
export PATH=$PATH:$(find `pwd` -name node|grep 'bin/node'|sed 's/\/node$//')
```

###3. In cloud console, create tables cityPairsRawData and cityPairsMaster using utility code run_sql_file.js.

```
node run_sql_file.js cityPairsRawData_tables.sql
```

###4. In cloud console, load data to table cityPairsRawData.

Before the load, we need to inspect the data integrity with spreedsheet.
The table names are case sensitive in Linux server.

```
node load_data_to_mysql.js cityPairsRawData award2015.csv
node load_data_to_mysql.js cityPairsRawData award2016.csv
node load_data_to_mysql.js cityPairsRawData award2017.csv
```

###5. In cloud console, reformat the raw data and load to table cityPairsMaster.

```
node run_sql_file.js cityPairsMaster.sql
```

###6. In cloud console, check how many rows have loaded.

```
vcap@79f0bf19-c8ce-402e-427a-eb2a92f20f6d:~/app$ 
node run_sql.js "select count(*) from cityPairsMaster"
select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]
```
