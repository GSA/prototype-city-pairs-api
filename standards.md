# IMPLEMENTATION OF API STANDARDS
This document describes how this project demonstrates the draft [GSA API Standards](https://github.com/GSA/api-standards/tree/converting-gsa-standards).

This will be updated as more functionality is implemented.



## About These Standards

NA - this section doesn't have recommendations.

## Overall Considerations

### Design for common use cases

* **Bulk data.** -- The city pairs is available separately as a CSV download of entire Fiscal Years.
* **Staying up to date.** -- Not implemented. The CSV data does not contain a last changed date to filter on.
* **Driving expensive actions.** -- Nothing implemented for this.


### Using one's own API

Not doing this. There is already a City Pairs Search page so no value in building a duplicate of that for demonstration purposes.


## Developers Are Your End Users

### Add Your API To The GSA API Directory
Not doing this because it is only a demonstration project.

### Provide Documentation
Documentation repo here: [https://github.com/GSA/prototype-city-pairs-api-documentation](https://github.com/GSA/prototype-city-pairs-api-documentation)



### Point of contact

Using github repo and email as alternate.


### Notifications of updates

Not doing this.

### Decommission Unsupported APIs

NA

### Avoid Breaking Changes

Using versioning to avoid this.

## Design Considerations

### API Endpoints

The URL path should follow this pattern if possible for a collection of items:
(path)/{business_function}/{application_name}/{version}/{plural_noun}

Following this. See endpoint structure in /config/routes.js

The URL path for an individual item in this collection would default to:
(path)/{business_function}/{application_name}/{version}/{plural_noun}/{identifier}

_NOT_ following this yet

* The URL query string (e.g. `?year=2014`)
* HTTP headers (e.g. `X-Api-Key: my-key`)

Only using URL query string.

### Taxonomy 
If the API is intended to share data across the GSA enteprise or beyond, consider referencing the GSA Taxonomy. Contact GSA's Chief Data Officer for more information.

This is in progress. Intend for "travel" to be a taxonomy term of some kind.

### Versioning
The recommended method of versioning APIs is to include a version number in the URL path. For example "/v1/". 

Use "/v0/" to represent an API that is in prototype or alpha phase and is likely to change frequently without warning.

Implementing this in /config/routes.js

### Use JSON

Doing this. CityPairsMasterController.js calls the Sails [res.json()](http://sailsjs.com/documentation/reference/response-res/res-json) method to stringify the data.

General JSON guidelines:

* Responses should be **a JSON object** (not an array). Using an array to return results limits the ability to include metadata about results, and limits the API's ability to add additional top-level keys in the future.

I _think_ we are doing this in the CityPairsMasterController.js. Requires more research to be sure.


### Use a consistent date format

And specifically, [use ISO 8601](https://xkcd.com/1179/), in UTC.

Doing this. JavaScript formats dates this way as a default.


### API Keys

Not implemented yet. Would like to implement api.data.gov in the future.


### Error handling

Handle all errors (including otherwise uncaught exceptions) and return a data structure in the same format as the rest of the API.

Doing something like this, although still modifying. This is in the CityPairsMasterController.js.

HTTP responses with error details should use a `4XX` status code to indicate a client-side failure (such as invalid authorization, or an invalid parameter), and a `5XX` status code to indicate server-side failure (such as an uncaught exception).

Not doing this yet. Will be soon.

### Pagination

No pagination at this time.

#### Metadata

Include enough metadata so that clients can calculate how much data there is, and how and whether to fetch the next set of results.

Not doing this yet.



### Always use HTTPS

Cloud.gov provides HTTPS by default.

Any new API should use and require [

#### Server Name Indication

Still researching this.


### Use UTF-8

Just [use UTF-8](http://utf8everywhere.org).

Doing this by setting header in the CityPairsMasterController.js.

### CORS

Currently hard-coding this by setting headers in CityPairsMasterController.js. However the configuration in the /config/cors.js is supposed to handle this. (It isn't yet.)


**What about JSONP?**

Not supporting JASONP (that is correct according to standards).
