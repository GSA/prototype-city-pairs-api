# Step by step guide to create this project on fr.cloud.gov

Special note to this project: In this project, not like other Sailsjs project, the database schema 
is predefined and the data is preloaded. We have developed tools to load schema and data.

1. create MySql database on the cloud.
2. create Sailjs application.
3. deploy application to cloud.
4. [create database schema.](database_setup#4-in-cloud-console-load-data-to-table-citypairsrawdata)
5. [migrate data to database.](https://github.com/GSA/prototype-city-pairs-api/tree/master/database_setup#5-in-cloud-console-reformat-the-raw-data-and-load-to-table-citypairsmaster)

## Prerequisites:
Existing fr.cloud.gov account
Node.js is installed on machine
Steps taken from this document: 
Already created sample app on cloud following steps in [create_sample_webapi_server_on_cloud.md](create_sailjs_webserver_on_cloud.md)

## Assumptions:
Using powershell on local machine


## Steps:
### 1. create mysql service on organization 'gsa-cto' and space 'sandbox'.

1. click the "Add a new service instance" button.
1. choose service plan "shared-mysql", and click "create service instance" button.
1. Enter name of this service. i.e. "cityPairsAPI". Choose space "sandbox". click "create service instance" button.
1. We will update manifest.yml with this service name later.
    
### 2. install sails.js command-line tool on your local computer in PowerShell windown. You may already installed it.
```
    npm -g install sails
```  
### 3. create a new sails project under your project directory
1. create a new sails application.  "sails new prototype-city-pairs-api"
1. change directory to prototype-city-pairs-api.  "cd prototype-city-pairs-api"
1. start the application. "sails lift"
1. start your web browser to verify your installation. The url is “localhost:3000”.
1. add engines entry to file package.json.

    ```
    "engines": {
        "node": "7.x.x"
    },
    ```
1. add two node modules mysql2 and sails-mysql.

    ```
    npm install --save mysql2
    npm install --save sails-mysql
    ```

### 4. prepare for cloud.gov.

1. In prototype-city-pairs-api directory, create file *Procfile* with one line in it.

    ```
    web: node app.js
    ```
1. create file *manifest.yml*.  

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
        
### 5. setup MySql database connection information in Sails.js.

1. open file config/connections.js
1. add the following connection entry.

```
    ,cityPairsDB: ( function () {
      var db_url;
      if('DATABASE_URL' in process.env) {
          db_url = process.env.DATABASE_URL;
      } else {
          db_url = '';
          throw new Error('environment variable DATABASE_URL was not found!');
          return {};
      }

      // db_url example:  "mysql2://user:pass@localhost:3306/dbname";
      var url_reg = /(mysql.*):\/\/(.*):(.*)@(.*):(.*)\/(.*)/;

      var usr_obj = db_url.match(url_reg);
      if( usr_obj == null) {
          throw new Error('environment variable DATABASE_URL was malformed!');
          return {};
      }

      var db = {
        adapter : 'sails-mysql',
        user : usr_obj[2],
        password : usr_obj[3],
        host : usr_obj[4],
        port : parseInt(usr_obj[5]),
        database : usr_obj[6]
      };
      
      console.log(db);
      return db;
  })()
```

1. setup default connection to file config/models.js
1. add the following line to file config/models.js before the line with 'migration'.

```
    //----------------------------------------------------------
    connection: 'cityPairsDB',
    //----------------------------------------------------------
```

### 6. update config/models.js
We will create tables in a seperate process and load data in a seperate process too.
In this case, we need to turn off autoPK, autoCreatedAt, autoUpdatedAt flags.

```
module.exports.models = {

connection: 'cityPairsDB',
migrate: 'safe',

autoPK: false,
autoCreatedAt: false,
autoUpdatedAt: false
}
```

### 7. generate data model CityPairsMaster.

```
sails generate api CityPairsMaster
```  

This command generates two files, api/models/CityPairsMaster.js and api/controllers/CityPairsMasterController.js.
   
### 8. update file api/models/CityPairsMaster.js with the following code:

```
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


### 9. update file api/controllers/CityPairsMasterController.js with the following code:

```
var util = require('util');

module.exports = {
    	airfares: function(req, res) {
        res.set({'Content-Type': 'application/json; charset=utf-8'});
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        var award_year = req.param('award_year');
        var origin_airport_abbrev =  req.param('origin_airport_abbrev');
        var destination_airport_abbrev = req.param('destination_airport_abbrev');
        
        var errMsg = "";
        var error = 0;
        var filter = {};
        var flag_ori = 0;
        var flag_des = 0;
        
        if(award_year == null || award_year == '') {
            error = 1;
            errMsg = "require parameter award_year; ";
        } else {                
            filter.award_year = award_year;
        }
        
        if(origin_airport_abbrev != null && origin_airport_abbrev != '') {
            filter.origin_airport_abbrev = origin_airport_abbrev;
            flag_ori = 1;
        }
        
        if(destination_airport_abbrev != null && destination_airport_abbrev != ''){
            filter.destination_airport_abbrev = destination_airport_abbrev;
            flag_des = 1;
        }

        if( flag_ori == 0 && flag_des == 0) {
            errMsg = errMsg + "at least one of parameter(origin_airport_abbrev or destination_airport_abbrev) should be provided."
            error ++;
        }
        
        if( error > 0) {
                res.status(400); // 400 Bad Request
                return res.json({error:  
                    {
                        message: errMsg,
                        // errcode: 'miss required parameters',
                        required_fields: 'award_year, one_of(origin_airport_abbrev, destination_airport_abbrev)',
                        example: '/v0/citypairs/airfares?award_year=2015&origin_airport_abbrev=abq&destination_airport_abbrev=BWI'
                    }
                })
        }

        CityPairsMaster.find(filter).exec(
            function(err, results) {
                return res.json({result: results, error: err});
            }
        )
    },
     airfares_with_id: function(req, res) {

        console.log('Entering airfares_with_id');   
        res.set({'Content-Type': 'application/json; charset=utf-8'});
        res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        //if there is no ID
        if ( req.param('id') == null ||  req.param('id') == '') {
        //put the other parameters in the filter
            var filter = {
                award_year: req.param('award_year').toUpperCase(),
                origin_airport_abbrev: req.param('origin_airport_abbrev').toUpperCase(),
                destination_airport_abbrev: req.param('destination_airport_abbrev').toUpperCase()
            };

        }
        //if there ID an ID
        else {
            //put the ID alone in the filter
            //todo: determine what happens if ID is sent with other parms
            console.log('The value of ID = ' + req.param('id')); 
                    
            /*var filter = {
                //yca_fare: parseInt(req.param('id')) //this worked -- think it is just the primary key that's a problem
                id: req.param('id')
            };*/

        }

             console.log('Running query command'); 
            CityPairsMaster.query('Select * from cityPairsMaster where ID = ?',[req.param('id')],
            function(err, rawResult) {
                
                return res.json({result: rawResult, error: err});
            }
        )
    }
};

```

### 10. create home page for this project

file name: views/welcome.ejs

```
<h1>Welcome to Web CityPairs API demo page!</h1>

<p> current supported APIs </p>

<ul>
<li>/v0/citypairs/airfares<li>
</ul>
<pre>
example: 
'/travel/citypairs/v0/airfares?award_year=2015&origin_airport_abbrev=abq&destination_airport_abbrev=BWI'
'/travel/citypairs/v0/airfares/10'
    </pre>
```

### 11. update file config/routes.js

```
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
  
  , '/travel/citypairs/v0/airfares': 'CityPairsMasterController.airfares' 
  , '/travel/citypairs/v0/airfares/:id': 'CityPairsMasterController.airfares_with_id' 

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
    
### 12. update config/cors.js

```
module.exports.cors = {

  /***************************************************************************
  *                                                                          *
  * Allow CORS on all routes by default? If not, you must enable CORS on a   *
  * per-route basis by either adding a "cors" configuration object to the    *
  * route config, or setting "cors:true" in the route config to use the      *
  * default settings below.                                                  *
  *                                                                          *
  ***************************************************************************/

  allRoutes: true,

  /***************************************************************************
  *                                                                          *
  * Which domains which are allowed CORS access? This can be a               *
  * comma-delimited list of hosts (beginning with http:// or https://) or    *
  * "*" to allow all domains CORS access.                                    *
  *                                                                          *
  ***************************************************************************/

  origin: '*',

  /***************************************************************************
  *                                                                          *
  * Allow cookies to be shared for CORS requests?                            *
  *                                                                          *
  ***************************************************************************/

  credentials: false

  /***************************************************************************
  *                                                                          *
  * Which methods should be allowed for CORS requests? This is only used in  *
  * response to preflight requests (see article linked above for more info)  *
  *                                                                          *
  ***************************************************************************/

  // methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',

  /***************************************************************************
  *                                                                          *
  * Which headers should be allowed for CORS requests? This is only used in  *
  * response to preflight requests.                                          *
  *                                                                          *
  ***************************************************************************/

  // headers: 'content-type'

};
```

### 13. login to fr.cloud.gov

```
 cf login -a api.fr.cloud.gov --sso
```

### 14. setup cloud.gov target.

```
cf target -o gsa-cto -s sandbox
```
          
### 15. push the application to the cloud

```
cf push
```

### 16 Setup database schema and load data.

At this point, the database is not yet ready. We need to create schema and load data.
    
Please refer to [How to setup database from cloud.gov console window](database_setup/readme.md) for the setup details.

### 17. Test the web server with a web browser.
