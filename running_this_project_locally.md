## Running this project locally

1. Install mySQL on local machine.


2. Setup database and user with password.
`INSERT STEP HERE`

3. OPTIONAL: Create package.json file (not sure why this would have to be repeated?)

4. Change to /database setup directory in project.

4. Update node libraries in local package

`npm update`

5. Install additional needed libraries for local development

`npm install mysql2 -save`
`npm install csv-string -save`

6. Set up environment variables for MySQL to run.

`export PATH=$PATH:/usr/local/mysql/bin`

7. Set up environment variable for local database:

`export DATABASE_URL=mysql2://{user}:{password}@localhost:3306/citypairsdb`

8. Verify MySQL is running and you can connect to local console:

`mysql -u {user} -p`

Enter password to database when prompted.

9. Run query inside local console:

`mysql> select now();`

The command should run successfully.

Exit MySQL console

`exit`

6. Test function of run_sql.js command

`node run_sql.js "select now();"`

The command should run successfully.

7. Run script to create raw and master database tables:

`node run_sql_file.js cityPairsRawData_tables.sql`

You should receive these results:

`cityPairsRawData_tables.sql
[ ResultSetHeader {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 10,
    warningStatus: 0 },
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0 } ]
`

8. Run command to load 2015 data into raw tables:

`node load_data_to_mysql.js cityPairsRawData award2015.csv`

You should receive these results:

`sql insert into cityPairsRawData ( ITEM_NUM,AWARD_YEAR,ORIGIN_AIRPORT_ABBREV,DESTINATION_AIRPORT_ABBREV,ORIGIN_CITY_NAME,ORIGIN_STATE,ORIGIN_COUNTRY,DESTINATION_CITY_NAME,DESTINATION_STATE,DESTINATION_COUNTRY,AIRLINE_ABBREV,AWARDED_SERV,PAX_COUNT,YCA_FARE,XCA_FARE,BUSINESS_FARE,ORIGIN_AIRPORT_LOCATION,DESTINATION_AIRPORT_LOCATION,ORIGIN_CITY_STATE_AIRPORT,DESTINATION_CITY_STATE_AIRPORT,EFFECTIVE_DATE,EXPIRATION_DATE) values ?
rows affected: 1697 1697
rows affected: 3393 1696
rows affected: 5092 1699
rows affected: 6790 1698
rows affected: 8487 1697
rows affected: 10184 1697
rows affected: 11881 1697
rows affected: 13578 1697
rows affected: 15038 1460
{ table: 'cityPairsRawData',
  file: 'award2015.csv',
  affected_rows: 15038 }
Done Data Loading!
`
9. Repeat data loading for 2016, 2017 data files.

10. Run database scripts to load from raw to master tables:

`node run_sql_file.js cityPairsMaster.sql`

You should receive these results:

`ResultSetHeader {
  fieldCount: 0,
  affectedRows: 33160,
  insertId: 1,
  info: 'Records: 33160  Duplicates: 0  Warnings: 0',
  serverStatus: 34,
  warningStatus: 0 }
`

11. Count the rows in master table:

`node run_sql.js "select count(*) from cityPairsMaster"`

You should get these results:

`select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]`

**At this point, your local database is configured and ready to run with the API locally.**


### Sails version
(do stuff above for cloud version)

1. Go to the /sails directory
2. `sails lift`
3. Test that it is running

### Express version
(do stuff above for cloud version)

1. Go to /express directory
2. `set DEBUG=cityPairsAPI_express:* & npm start`
3. Test that it is running

