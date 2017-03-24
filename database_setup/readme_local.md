# How to setup database in your local environment

During the development phase of a project, the database schema and referential data are build gradually.
When a project is ready to release to production, you either have an empty database or a non-empty database.
In this case, you have to perform database migration manually.
In this project, the data is predefined. Before this application is live, we need to create database schema and load data first.


## What we have
1. datafiles:

```
    award2015.csv
    award2016.csv
    award2017.csv
```
2. utility programs:

```
    run_sql_file.js
    run_sql.js
    load_data_to_mysql.js
```

3. SQL files:
```
cityPairsRawData_tables.sql
cityPairsMaster.sql
```

## Steps to create database 
For this step, the MySQL database will be created on a development server accessible to the local development environment.

1. In database console, create database 'citypairsdb'. 

`create database 'citypairsdb';`

2. Create application user and password (if not created).

3. Grant the application user access to citypairsdb 

4. Open the command console (e.g. CMD or Terminal), and set up environment variable `DATABASE_URL`

The utilities depend on one environment variable DATABASE_URL.
The DATABASE_URL requires the following format:

```
mysql2://user:passwd@host:port_number/db_name

For example:

set DATABASE_URL='mysql2://user:passwd@host:port_number/db_name'

or

export DATABASE_URL=mysql2://{user}:{password}@exampleserver:3306/citypairsdb`

```
5. In the command console, change to the database_setup directory of the cloned repository.

`cd prototype-city-pairs-api/database_setup`

6. Update node libraries in local package

`npm update`

7. Test function of run_sql.js command

`node run_sql.js "select now();"`

8. In command console, create tables cityPairsRawData and cityPairsMaster using utility code run_sql_file.js.

```
node run_sql_file.js cityPairsRawData_tables.sql
```

9. In command console, load data to table cityPairsRawData.

Before the load, we need to inspect the data integrity with spreedsheet.
The table names are case sensitive in Linux server.

```
node load_data_to_mysql.js cityPairsRawData award2015.csv
node load_data_to_mysql.js cityPairsRawData award2016.csv
node load_data_to_mysql.js cityPairsRawData award2017.csv
```

10. In command console, reformat the raw data and load to table cityPairsMaster.

```
node run_sql_file.js cityPairsMaster.sql
```

11. In command console, check how many rows have loaded.

```
node run_sql.js "select count(*) from cityPairsMaster"
select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]
```
