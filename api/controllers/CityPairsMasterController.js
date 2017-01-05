/**
 * CityPairsMasterController
 *
 * @description :: Server-side logic for managing citypairsmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	airfares: function(req, res) {
        var filter = {
            award_year: req.param('award_year'),
            origin_airport_abbrev: req.param('origin_airport_abbrev'),
            destination_airport_abbrev: req.param('destination_airport_abbrev')
        };
        
        for ( var k in filter) {
            if ( filter[k] == null) {
                return res.json({error: 'need all three parameters: award_year, origin_airport_abbrev, destination_airport_abbrev '})
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

