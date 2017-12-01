# HOW DOES CITY PAIRS IMPLEMENT THE GSA API STANDARDS?
This document describes how this project demonstrates the [GSA API Standards](https://github.com/GSA/api-standards).

This will be updated as more functionality is implemented.

The headings and items are from the standards. 

_How this project implements is in italics._




## Overall Considerations



## Developers Are Your End Users

### Provide Documentation
_We have fully implemented a set of documentation for this API using the documentation template. You can see the documentation repo here: [https://github.com/GSA/prototype-city-pairs-api-documentation](https://github.com/GSA/prototype-city-pairs-api-documentation)_



### Point of contact

_For this API, we are demonstrating an approach of having [issues posted in the github repo](https://github.com/GSA/p[crototype-city-pairs-api/issues) as the primary method of providing support, and providing a GSA email address as as alternate. This is implemented on the [Contact Us page](https://gsa.github.io/prototype-city-pairs-api-documentation/api-docs/contact_us.html)._


### Avoid Breaking Changes

_Not specifically addressing this, since it is just a prototype with "v0". Our approach to this would be as recommended in the standards, keeping a single version with any non-breaking changes and incrementing the version if a breaking change occurs._

## Design Considerations

### API Endpoints

The URL path should follow this pattern if possible for a collection of items:
(path)/{business_function}/{application_name}/{version}/{plural_noun}

_Following this with A URL Structure of: travel/citypairs/v0/airfares._ 

* {business_function}: `travel`
* {application_name}: `citypairs`
* {version}: `V0`
* {plural_noun}: `airfares`

_In the code, this is configured as follows:_

* {business_function}/{application_name}/{version} -- This is configured in [/express/app.js ](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/app.js):

`app.use('/travel/citypairs/v0', cityPairsV0); //point base path to router`

* {plural_noun} -- This is configured in [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js).

`router.get('/airfares', airfares);`

The URL path for an individual item in this collection would default to:
(path)/{business_function}/{application_name}/{version}/{plural_noun}/{identifier}

_Following this with a URL structure of: travel/citypairs/v0/airfares/:id. See endpoint structure in [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js)_

* The URL query string (e.g. `?year=2014`)
_Following this with a URL structure of: travel/citypairs/v0/airfares?award_year=2015&origin_airport_abbrev=abq&destination_airport_abbrev=BWI._
_See endpoint structure in [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.jss_


* HTTP headers (e.g. `X-Api-Key: my-key`)

_Not using HTTP headsers for keys._

### Taxonomy 
If the API is intended to share data across the GSA enteprise or beyond, consider referencing the GSA Taxonomy. Contact GSA's Chief Data Officer for more information.

_This is in progress. Intend for "travel" to be a taxonomy term._

### Versioning
The recommended method of versioning APIs is to include a version number in the URL path. For example "/v1/". 

Use "/v0/" to represent an API that is in prototype or alpha phase and is likely to change frequently without warning.

_Implementing this standard by including "v0" in the path. This is part of the configuration in [/express/app.js ](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/app.js):_

`app.use('/travel/citypairs/v0', cityPairsV0); //point base path to router`

### Use JSON

General JSON guidelines:

* Responses should be **a JSON object** (not an array). Using an array to return results limits the ability to include metadata about results, and limits the API's ability to add additional top-level keys in the future.

_All endpoints return JSON object. Here is an example from [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js)._

`return res.json({message: "This is a prototype API. These results are for demonstration purposes only.",result: rawResult});`

### Use a consistent date format

And specifically, [use ISO 8601](https://xkcd.com/1179/), in UTC.

_Doing this. JavaScript formats dates this way as a default._


### API Keys

We recommend using api.data.gov as a layer between your API and users. 

_We are using api.gsa.gov in front of this API, whichi provides key management, and the other benefits mentioned in the standards. This can be seen in the "API Calls" page of the [API documentation](https://gsa.github.io/prototype-city-pairs-api-documentation/api-docs/console/), which includes `api_key` as a required parameter and provides a DEMO_KEY to use for testing._


### Error handling

Handle all errors (including otherwise uncaught exceptions) and return a data structure in the same format as the rest of the API.

_Doing something like this, although still modifying. This is in the [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js)._

HTTP responses with error details should use a `4XX` status code to indicate a client-side failure (such as invalid authorization, or an invalid parameter), and a `5XX` status code to indicate server-side failure (such as an uncaught exception).

_400 has currently been implemented._

### Pagination

_No pagination at this time._

#### Metadata

Include enough metadata so that clients can calculate how much data there is, and how and whether to fetch the next set of results.

_Not doing this yet._



### Always use HTTPS

_Cloud.gov provides HTTPS by default._

#### Server Name Indication

_Still researching this._


### Use UTF-8

Just [use UTF-8](http://utf8everywhere.org).

_Doing this by setting header in the  [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js):_

`res.set({'Content-Type': 'application/json; charset=utf-8'});`

### CORS

_Doing this by setting header in the  [/express/routes/cityPairs_v0.js](https://github.com/GSA/prototype-city-pairs-api/blob/master/express/routes/cityPairs_v0.js):_

`res.header("Access-Control-Allow-Origin", "*"); `
`res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");`


