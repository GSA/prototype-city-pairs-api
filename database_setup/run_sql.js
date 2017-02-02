"use strict";

var mysql = require('mysql2');
var util  = require('util');
var EventEmitter = require('events');
var fs = require('fs');

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' SQL');
  process.exit(1);
}

run_process();

function run_process() {
    const procEE = new EventEmitter();
    var query;
    var dbConn;
    var results;
    
    procEE.on('start', getSQLData);
    procEE.on('gotQuery', connectDB);
    procEE.on('dbConnected', runQuery);
    procEE.on('doneQuery', showResults);
    procEE.on('resultShown', done);
    procEE.on('error', handleError);
    
    start();
    
    function start() {
        procEE.emit('start');
    }
    
    function done() {
        dbConn.end();
        process.exit(0);
    }

    function handleError(e) {
       console.log(util.inspect(e));
       if(results) console.log(util.inspect(results));
       if(dbConn)  dbConn.end();
       process.exit(1);
    }
    
    function getSQLData(){
        query = process.argv[2];
        console.log(query);
        procEE.emit('gotQuery');
    }
    
    function connectDB() {
        var db_url;
        if('DATABASE_URL' in process.env) {
            db_url = process.env.DATABASE_URL;
        } else {
            procEE.emit('error', {error: 'environment variable DATABASE_URL was not found!'});
	        return;
        }
        var conn = mysql.createConnection(db_url+'?multipleStatements=true');
        conn.connect((e)=>{
            if(e) procEE.emit('error', e);
            else {
                dbConn = conn;
                procEE.emit('dbConnected');
            };
        });
    }
    
    function runQuery() {
        dbConn.query(query, (e,r,f) => {
            if(e) procEE.emit('error', e);
            else {
                results = r;                
                procEE.emit('doneQuery');
            }
        });
    }
    
    function showResults() {
       console.log(util.inspect(results));
       procEE.emit('resultShown');
    }
        
} 
