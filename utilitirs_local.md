# Useful Online Utilities for your local environment

In your local environment, we may have many GUI tools to create database schema and load data.
But, the utilities for cloud will work in your local environment too and they also provide 
consistance between cloud and your local testing environments.

1. environment setup
2. run_sql.js
3. run_sql_file.js
4. load_data_to_mysql.js

## environment setup

The utilities depend on one environment variable DATABASE_URL.
The DATABASE_URL requires the following format:

```
mysql2://user:passwd@host:port_number/db_name

For example:

set DATABASE_URL='mysql2://user:passwd@host:port_number/db_name'
```

## run_sql.js

With this run sql utility, you can run a sql query to a binded mysql database.

``` 
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

