# How to setup database in your local environment

During the development phase of a project, the database schema and referrential data are build gradully.
When a project is ready to release to production, you either have an empty database or a non-empty database.
In this case, you have to perform database migration manually.
In this project, the data is predefined. Before this application on live, we need to create database schema and load data first.


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
1. Install MySQL on your local machine. This will create the root user. Record the temporary password set for root.

2. Open terminal and configure any necessary environment variables.

For example:
`export PATH=$PATH:/usr/local/mysql/bin`

3. Start the MySQL console from the terminal

`mysql -u root -p`

Enter the temporary password assigned to root.

4. Reset the temporary password for root.

`alter user root identified by {new password}`


5. Create database 'citypairsdb'. (Still in MySQL console.)

`create database 'citypairsdb';`

6. Create application user and password (Still in MySQL console.)

`create user {new user} identified by {new password};`

7. Grant access to database 

`grant all privileges on citypairsdb.* to {new user}@'%';`

Exit MySQL console.

`exit`

8. Open MySQL console as new user.
`mysql -u {new user} -p`

9. Run query inside MySQL console:

`select now();`


Exit MySQL console

`exit`


10. Environment setup

The utilities depend on one environment variable DATABASE_URL.
The DATABASE_URL requires the following format:

```
mysql2://user:passwd@host:port_number/db_name

For example:

set DATABASE_URL='mysql2://user:passwd@host:port_number/db_name'

or

export DATABASE_URL=mysql2://{user}:{password}@localhost:3306/citypairsdb`

```
11. (if not done previously) Change to 'database setup' directory in city pairs API project.

12. Update node libraries in local package

`npm update`

13. Test function of run_sql.js command

`node run_sql.js "select now();"`

14. In command console, create tables cityPairsRawData and cityPairsMaster using utility code run_sql_file.js.

```
node run_sql_file.js cityPairsRawData_tables.sql
```

15. In command console, load data to table cityPairsRawData.

Before the load, we need to inspect the data integrity with spreedsheet.
The table names are case sensitive in Linux server.

```
node load_data_to_mysql.js cityPairsRawData award2015.csv
node load_data_to_mysql.js cityPairsRawData award2016.csv
node load_data_to_mysql.js cityPairsRawData award2017.csv
```

16. In command console, reformat the raw data and load to table cityPairsMaster.

```
node run_sql_file.js cityPairsMaster.sql
```

17. In command console, check how many rows have loaded.

```
node run_sql.js "select count(*) from cityPairsMaster"
select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]
```
