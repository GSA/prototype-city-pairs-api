# Useful Online Utilities

1. setnodepath
2. run_sql.js
3. run_sql_file.js
4. load_data_to_mysql.js

## login to cloud bash console
```
cf ssh citypairsapi
```

## setnodepath

In the cloud ssh shell, you need to source file "setnodepath" to set shell invironment variable of PATH.

```
source setnodepath
```

## run_sql.js

With this run sql utility, you can run a sql query to a binded mysql database.

```
vcap@79f0bf19-c8ce-402e-427a-eb2a92f20f6d:~/app$ 
node run_sql.js "select count(*) from cityPairsMaster"
select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]
```

## run_sql_file.js

With this utility, you can run multiple sql queries in a file.

```
node run_sql_file.js a_sql_query_file
```

### load_data_to_mysql.js
With this utility, you can load csv data to a table.

```
node load_data_to_mysql.js table_name csv_data_file_name
```

