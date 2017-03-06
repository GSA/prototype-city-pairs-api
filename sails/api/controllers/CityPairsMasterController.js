/**
 * CityPairsMasterController
 *
 * @description :: Server-side logic for managing citypairsmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


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

