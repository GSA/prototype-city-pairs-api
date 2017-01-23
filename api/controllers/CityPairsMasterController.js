/**
 * CityPairsMasterController
 *
 * @description :: Server-side logic for managing citypairsmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var util = require('util');

function mysqlDateToGSA(obj) {
    function format_date (d) {
        function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
        }
    
     return d.getUTCFullYear() +
        '-' + pad(d.getUTCMonth() + 1) +
        '-' + pad(d.getUTCDate()) +
        'T' + pad(d.getUTCHours()) +
        ':' + pad(d.getUTCMinutes()) +
        ':' + pad(d.getUTCSeconds()) +
        'Z';
    }
    var ret = {};
    for (var k in obj) {
        if( obj[k] instanceof Date) {
            ret[k] = format_date(obj[k]);
        } else {
            ret[k] = obj[k];
        }
    }
    return ret;
}

module.exports = {
	airfares: function(req, res) {
        res.set({'Content-Type': 'application/json; charset=utf-8'});
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
                        // errcode: 'miss required parameters',
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
    },
    	airfares2: function(req, res) {
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
                        // errcode: 'miss required parameters',
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
                var ret = mysqlDateToGSA(results);
                return res.json({result: ret, error: err});
            }
        )
    }
};

