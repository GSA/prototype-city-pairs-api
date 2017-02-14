var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

function airfares_by_id(req, res) {
        res.set({'Content-Type': 'application/json; charset=utf-8'});
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        var id = req.params['id'];

        console.log(req);
        
        var conn = req.app.locals.dbConn;
//        console.log('++++++++');
//        console.log(conn);

        conn.query('Select * from cityPairsMaster where ID = ?', [id],
            function(err, rawResult) {
                if(err) {
                    res.status(500); // 500 system error
                    return res.json({error: err});
                }  
                return res.json({result: rawResult});
            }
        );
}

function airfares(req, res) {
        res.set({'Content-Type': 'application/json; charset=utf-8'});
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        var award_year = req.query.award_year;
        var origin_airport_abbrev =  req.query.origin_airport_abbrev;
        var destination_airport_abbrev = req.query.destination_airport_abbrev;

        console.log(req);

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

        var where = ' where 1=1 ';
        var params = [];
        Object.keys(filter).forEach(
                function(key) {
                    where += ' AND ' + key + '=?';
                    params.push(filter[key]);
                }
        );

        var conn = req.app.locals.dbConn;

        conn.query('Select * from cityPairsMaster ' + where, params,
            function(err, rawResult) {
                if(err) {
                    res.status(500); // 500 system error
                    return res.json({error: err});
                }  
                console.log(rawResult);
                return res.json({result: rawResult});
            }
        );
}

/* GET users listing. */
router.get('/airfares/:id', airfares_by_id);
router.get('/airfares', airfares);

module.exports = router;