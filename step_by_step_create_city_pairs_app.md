# Step by step guide to create this project on fr.cloud.gov

Special note to this project: In this project, not like other Sailsjs project, the database schema 
is predefined and the data is preloaded. We have developed tools to load schema and data.

1. create mysql database on the cloud.
2. create Sailjs application.
3. deploy application to cloud.
4. create database schema.
5. migrate data to database.

##Prerequisites:
Existing fr.cloud.gov account
Node.js is installed on machine
Steps taken from this document: 
Already created sample app on cloud following steps in create_sample_webapi_server_on_cloud.md

##Assumptions:
Using powershell on local machine


##Steps:
1. create mysql service on organization 'gsa-cto' and space 'sandbox'.
    1.a click the "Add a new service instance" button.
    1.b choose service plan "shared-mysql", and click "create service instance" button.
    1.c Enter name of this service. i.e. "cityPairsAPI". Choose space "sandbox". click "create service instance" button.
    1.d We will update manifest.yml with this service name later.
    
2. install sails.js command-line tool on your local computer in PowerShell windown. You may already installed it.
    npm -g install sails
    
3. create a new sails project under your project directory
    3.a create a new sails application.  "sails new prototype-city-pairs-api"
    3.b change directory to prototype-city-pairs-api.  "cd prototype-city-pairs-api"
    3.c start the application. "sails lift"
    3.d start your web browser to verify your installation. The url is “localhost:3000”.
    3.e add engines entry to file package.json.
```
 "engines": {
    "node": "7.x.x"
  },
```
   3.f add two node modules mysql2 and sails-mysql.
```
npm install --save mysql2
npm install --save sails-mysql 
``` 
4. prepare for cloud.gov.
    4.a In prototype-city-pairs-api directory, create file Procfile with one line in it.
        web: node app.js
    4.b create file manifest.yml.  
```
---
applications:
- name: cityPairsAPI
  memory: 512M  
env:  
  NODE_ENV: production
  DB_NAME: cityPairsDB
services:
- cityPairsDB
```

Here, we defined an invironment variable *DB_NAME*. Application will use this variable to find database to connect.
The services section indicates the database cityPairDB will bind to this application.
        
5. setup MySql database connection information in Sails.js.
    5.a open file config/connections.js
    5.b add the following code in the top of this file
```
//---------------------------------
function getDbConnObj(name) {
      var cred = JSON.parse(process.env.VCAP_SERVICES)
              ['aws-rds']
              .filter((e)=>{return e.name == name;})
              [0]
              .credentials;	

      return {
        adapter: 'sails-mysql',
        host: cred.host,
        user: cred.username,
        password: cred.password,
        database: cred.db_name,
        port: parseInt(cred.port)
      };
    };
  
  var db_name = process.env.DB_NAME;
  var db_cred = getDbConnObj(db_name);
//----------------------------------------
```

      5.c add the following line to the MySQL section of this file
```
//------------------------------------------------
cityPairsMySQL: db_cred
//-----------------------------------------------
```

      5.d setup default connection to file config/models.js
      5.e add the following line to file config/models.js before the line with 'migration'.
```
//----------------------------------------------------------
connection: 'cityPairsMySQL',
//----------------------------------------------------------
```

6. update config/models.js
We will create tables in a seperate process and load data in a seperate process too.
In this case, we need to turn off autoPK, autoCreatedAt, autoUpdatedAt flags.

```js
module.exports.models = {

  connection: 'cityPairsMySQL',
  migrate: 'safe',
  
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false
}
```

7. generate data model CityPairsMaster.
```
sails generate api CityPairsMaster
```  
This command generates two files, api/models/CityPairsMaster.js and api/controllers/CityPairsMasterController.js.
   
8. update file api/models/CityPairsMaster.js with the following code:
```js
module.exports = {
tableName: 'cityPairsMaster',
  
attributes: {
    ID : { type: 'integer' },
    ITEM_NUM : { type: 'string' },
    AWARD_YEAR : { type: 'string' },
    ORIGIN_AIRPORT_ABBREV : { type: 'string' },
    DESTINATION_AIRPORT_ABBREV : { type: 'string' },
    ORIGIN_CITY_NAME : { type: 'string' },
    ORIGIN_STATE : { type: 'string' },
    ORIGIN_COUNTRY : { type: 'string' }, 
    DESTINATION_CITY_NAME : { type: 'string'},
    DESTINATION_STATE : { type: 'string'},
    DESTINATION_COUNTRY	: { type: 'string'},
    AIRLINE_ABBREV : { type: 'string' },
    AWARDED_SERV : { type: 'string' },
    PAX_COUNT : { type: 'string' },
    YCA_FARE : { type: 'integer'},
    XCA_FARE : { type: 'integer'},
    BUSINESS_FARE : { type: 'integer'},
    ORIGIN_AIRPORT_LOCATION : { type: 'string'},
    DESTINATION_AIRPORT_LOCATION : { type: 'string'},
    ORIGIN_CITY_STATE_AIRPORT : { type: 'string'},
    DESTINATION_CITY_STATE_AIRPORT : { type: 'string'},
    EFFECTIVE_DATE : { type: 'date' },
    EXPIRATION_DATE : { type: 'date' }
  }
};

```

9. update file api/controllers/CityPairsMasterController.js with the following code:

```js
var util = require('util');

module.exports = {
	airfares: function(req, res) {
        var filter = {
            award_year: req.param('award_year'),
            origin_airport_abbrev: req.param('origin_airport_abbrev'),
            destination_airport_abbrev: req.param('destination_airport_abbrev')
        };
        
        for ( var k in filter) {
            if ( filter[k] == null || filter[k] == '') {
                return res.json({error:  
                    {
                        message: 'need all three parameters: award_year, origin_airport_abbrev, destination_airport_abbrev',
                        errcode: 'miss required parameters',
                        required_fields: 'award_year, origin_airport_abbrev, destination_airport_abbrev',
                        example: '/v0/citypairs/airfares?award_year=2015&origin_airport_abbrev=abq&destination_airport_abbrev=BWI'
                    }
                })
            } else {
                filter[k] = filter[k].toUpperCase();
            }
        };
        
        CityPairsMaster.find(filter).exec(
            function(err, results) {
                return res.json({result: results, error: err});
            }
        )
    }
};
```

10. create home page for this project
file name: views/welcome.ejs

```js
<h1>Welcome to Web CityPairs API demo page!</h1>

<p> current supported APIs </p>

<ul>
  <li>/v0/citypairs/airfares<li>
</ul>
<pre>
example: '/v0/citypairs/airfares?award_year=2015&origin_airport_abbrev=abq&destination_airport_abbrev=BWI'
</pre>
```

11. update file config/routes.js

```js
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'welcome'
  }
  
  , '/v0/citypairs/airfares': 'CityPairsMasterController.airfares' 


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
```

12. login to fr.cloud.gov
```
cf login -a api.fr.cloud.gov --sso
```

13. setup cloud.gov target.
```
cf target -o gsa-cto -s sandbox
```
          
14. push the application to the cloud
```
cf push
```

At this point, the database is not yet ready. We need to create schema and load data.
    
15. ## login to cloud bash console
```
cf org gsa-cto
cf login -a api.fr.cloud.gov --sso
cf ssh citypairsapi
```

16. in the cloud console, set environment first.

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

17. In cloud console, create tables cityPairsRawData and cityPairsMaster using utility code run_sql_file.js.

```
node run_sql_file.js cityPairsRawData_tables.sql
```

18. In cloud console, load data to table cityPairsRawData.

Before the load, we need to inspect the data integrity with spreedsheet.
The table names are case sensitive in Linux server.

```
node load_data_to_mysql.js cityPairsRawData award2015.csv
node load_data_to_mysql.js cityPairsRawData award2016.csv
node load_data_to_mysql.js cityPairsRawData award2017.csv
```

19. In cloud console, reformat the raw data and load to table cityPairsMaster.

```
node run_sql_file.js cityPairsMaster.sql
```

20. In cloud console, check how many rows have loaded.

```
vcap@79f0bf19-c8ce-402e-427a-eb2a92f20f6d:~/app$ 
node run_sql.js "select count(*) from cityPairsMaster"
select count(*) from cityPairsMaster
[ TextRow { 'count(*)': 33160 } ]
```

21. Test the web server with a web browser.