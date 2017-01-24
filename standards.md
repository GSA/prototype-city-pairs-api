# IMPLEMENTATION OF API STANDARDS
This document describes how this project demonstrates the draft [GSA API Standards](https://github.com/GSA/api-standards/tree/converting-gsa-standards).

This will be updated as more functionality is implemented.

The headings and items are from the standards. 

_How this project implements is in italics._



## About These Standards

_NA - this section doesn't have recommendations._

## Overall Considerations

### Design for common use cases

* **Bulk data.** -- _The city pairs is available separately as a CSV download of entire Fiscal Years._
* **Staying up to date.** -- _Not implemented. The CSV data does not contain a last changed date to filter on._
* **Driving expensive actions.** -- _Nothing implemented for this._


### Using one's own API

_Not doing this. There is already a City Pairs Search page so no value in building a duplicate of that for demonstration purposes._


## Developers Are Your End Users

### Add Your API To The GSA API Directory
_Not doing this because it is only a demonstration project._

### Provide Documentation
_Documentation repo here: [https://github.com/GSA/prototype-city-pairs-api-documentation](https://github.com/GSA/prototype-city-pairs-api-documentation)_



### Point of contact

_Using github repo and email as alternate._


### Notifications of updates

_Not doing this._

### Decommission Unsupported APIs

_NA_

### Avoid Breaking Changes

_Using versioning to avoid this._

## Design Considerations

### API Endpoints

The URL path should follow this pattern if possible for a collection of items:
(path)/{business_function}/{application_name}/{version}/{plural_noun}

_Following this. See endpoint structure in /config/routes.js_

The URL path for an individual item in this collection would default to:
(path)/{business_function}/{application_name}/{version}/{plural_noun}/{identifier}

_NOT following this yet_

* The URL query string (e.g. `?year=2014`)
* HTTP headers (e.g. `X-Api-Key: my-key`)

_Only using URL query string._

### Taxonomy 
If the API is intended to share data across the GSA enteprise or beyond, consider referencing the GSA Taxonomy. Contact GSA's Chief Data Officer for more information.

_This is in progress. Intend for "travel" to be a taxonomy term of some kind._

### Versioning
The recommended method of versioning APIs is to include a version number in the URL path. For example "/v1/". 

Use "/v0/" to represent an API that is in prototype or alpha phase and is likely to change frequently without warning.

_Implementing this in /config/routes.js_

### Use JSON

_Doing this. CityPairsMasterController.js calls the Sails [res.json()](http://sailsjs.com/documentation/reference/response-res/res-json) method to stringify the data._

General JSON guidelines:

* Responses should be **a JSON object** (not an array). Using an array to return results limits the ability to include metadata about results, and limits the API's ability to add additional top-level keys in the future.

_I think we are doing this in the CityPairsMasterController.js. Requires more research to be sure._


### Use a consistent date format

And specifically, [use ISO 8601](https://xkcd.com/1179/), in UTC.

_Doing this. JavaScript formats dates this way as a default._


### API Keys

_Not implemented yet. Would like to implement api.data.gov in the future._


### Error handling

Handle all errors (including otherwise uncaught exceptions) and return a data structure in the same format as the rest of the API.

_Doing something like this, although still modifying. This is in the CityPairsMasterController.js._

HTTP responses with error details should use a `4XX` status code to indicate a client-side failure (such as invalid authorization, or an invalid parameter), and a `5XX` status code to indicate server-side failure (such as an uncaught exception).

_Not doing this yet. Will be soon._

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

_Doing this by setting header in the CityPairsMasterController.js._

### CORS

_Currently hard-coding this by setting headers in CityPairsMasterController.js. However the configuration in the /config/cors.js is supposed to handle this but it is not working yet._


**What about JSONP?**

_Not supporting JASONP (that is correct according to standards)._
