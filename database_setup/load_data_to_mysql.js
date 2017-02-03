"use strict";

const fs = require('fs');
const util = require('util');
const cvs = require('csv-string');
const mysql = require('mysql2');

const EventEmitter = require('events');

if (process.argv.length < 4) {
  console.log('Usage: node ' + process.argv[1] + ' table_name data_file');
  process.exit(1);
}

const field_sep = ',';
const blank = /^$/;
const emptyStringAsNull = 0;
const trimString = 1;

const table_name = process.argv[2];
const data_file  = process.argv[3];
// const db_url = process.env.DATABASE_URL;

const log = console.log;

process_data_file(table_name, data_file);

function process_data_file(table_name, data_file){
    const procEE = new EventEmitter();
    var dbConn;
    var db_url;
    
    procEE.on('start', connectDB);
    procEE.on('dbConnected', process_data_file);
    procEE.on('loadSucess', showResults);
    procEE.on('resultShown', done);
    procEE.on('error', handleError);
    
    start();
    
    function start() {
        if('DATABASE_URL' in process.env) {
            db_url = process.env.DATABASE_URL;
        } else {
            procEE.emit('error', {
                error: 'environment variable DATABASE_URL was not found!',
                format: 'mysql2://user:passwd@host:port_number/db_name'
            });
	        return;
        }
        procEE.emit('start');
    }
    
    function done() {
        dbConn.end();
        console.log('Done Data Loading!');
        process.exit(0);
    }

    function handleError(e) {
       console.log(util.inspect(e));
       if(dbConn)  dbConn.end();
       process.exit(1);
    }

    function connectDB() {
        dbConn = mysql.createConnection(db_url);
        dbConn.connect((e)=>{
            if(e) {
                procEE.emit('error', e); 
            } else {
                procEE.emit('dbConnected');
            };
        });
    }
    
    function showResults(results) {
       console.log(util.inspect(results));
       procEE.emit('resultShown');
    }

    function process_data_file() {
        function cb(e,r) {
            if(e) {
                procEE.emit('error', e);
                return;
            }   
            procEE.emit('loadSucess', r);
        };
        process_one_file(dbConn, table_name, data_file, 0, cb);
    }

}

function process_one_file(dbConn, table_name, data_file, truncate, callBack) {
    const data_info = {};

    data_info.table_name = table_name;

    console.log('Processing file: ' + data_file);

    data_info.cnt = -1;
    data_info.batch_cnt = 0;
    data_info.affected_rows = 0;
    data_info.data_file = data_file;
    data_info.dd = [];
    data_info.load_count = 0;
    data_info.encoding = 'ascii';
    data_info.buffer_size = 1024 * 1024; // 1 MB buffer
    data_info.total_bytes = 0;
    data_info.data_buffer = Buffer.alloc(data_info.buffer_size, 0, data_info.encoding);
    data_info.to_be_end = 0;
    data_info.line_buffer = '';
    data_info.data_lines = null;
    data_info.truncate_flag = truncate;

    const oneFileEE = new EventEmitter();  

    oneFileEE.on('start', truncate_table);
    oneFileEE.on('tableTruncated',  open_data_file);
    oneFileEE.on('noTableTruncate', open_data_file);
    oneFileEE.on('fileOpened', read_data_block);
    oneFileEE.on('dataReady',  load_data);
    oneFileEE.on('dataLoaded', read_data_block);
    oneFileEE.on('dataEnd',    process_sucess);
    oneFileEE.on('error',      process_error);

    start();
    
    function start() {
        oneFileEE.emit('start')
    }
    
    function process_error(e) {
       console.log(util.inspect(e));
       callBack(e);
    }
    
    function process_sucess(r){
        callBack(null, r);
    }
    
    function open_data_file() {
        function openDataFileCB(err, fd) {
            if(err) {
                oneFileEE.emit('error', err)
            }
            else {
                data_info.fd = fd;
                oneFileEE.emit('fileOpened');
            }
        }
        fs.open(data_info.data_file, 'r' , openDataFileCB);
    }

    function parse_datablock() {
        data_info.total_bytes += data_info.current_bytes;
        const s = data_info.data_buffer.toString(data_info.encoding, 0, 
                        data_info.current_bytes + data_info.line_buffer.length);
        var lines = s.split(/\r?\n/);
        data_info.line_buffer = lines.pop();
        data_info.data_lines = lines;
    }

    function read_data_block() {
        if( data_info.to_be_end == 1) {
            fs.close(data_info.fd);
            data_info.data_lines = null;
            var r = {
              table: data_info.table_name,
              file:  data_file,
              affected_rows: data_info.affected_rows
            };
            oneFileEE.emit('dataEnd', r);
            return
        }
        const offset = data_info.line_buffer.length;
        const length = data_info.buffer_size - offset;
        data_info.data_buffer.fill(data_info.line_buffer, 0, offset); 

        function readDataBlockCB(err, bytes) {
            if(err) {
                oneFileEE.emit('error', err);
                return;
            }
            data_info.current_bytes = bytes;
            if(bytes < data_info.buffer_size - data_info.line_buffer.length ) {
                data_info.to_be_end = 1;
            }
            parse_datablock();
            oneFileEE.emit('dataReady');
        } 
        fs.read(data_info.fd, data_info.data_buffer, offset, length, null, readDataBlockCB);
    }

    function process_lines() {
        data_info.dd = [];
        data_info.data_lines.forEach((line)=>{
            if(blank.test(line)) return;
            data_info.cnt++;
            if(data_info.cnt == 0) {
                data_info.line_first = line;
                make_sql();
                return;
            }
            if(/rows selected/.test(line)) {
                data_info.line_last = line;
                data_info.cnt--;
                return; 
            }
            var res = cvs.parse(line, field_sep);
            var ds = res.shift();
            for( var i = 0; i < ds.length; i++) {
                if( emptyStringAsNull > 0 && ds[i]=='') ds[i] = null;
                else if ( trimString > 0 ) ds[i] = ds[i].toString().trim();
            }  
            data_info.dd.push(ds);
        });
        data_info.data_lines = null;
    }

    function truncate_table() {
        if( data_info.truncate_flag == 0) {
            oneFileEE.emit('noTableTruncate');
            return
        }
        dbConn.query('truncate table ' + data_info.table_name,
          function (err) {
            if (err) {
                console.log('error: truncate table ' + data_info.table_name);    
                oneFileEE.emit('error', err);
                return;
            }
            oneFileEE.emit('tableTruncated');
        });
    }

    function make_sql() {
        var sql = 'insert into ' + data_info.table_name + ' ( ';
        var flds = cvs.parse(data_info.line_first, field_sep);
        sql += flds.join(',') + ') values ?';
        console.log('sql', sql);
        data_info.sql_insert = sql;
    }

    function load_data() {
        data_info.load_count += 1;
        process_lines();
        var dds = [data_info.dd];
        dbConn.query(data_info.sql_insert, dds,
            function sql_query_cb(err, res){
                if (err) {
                     console.log('err ' + data_info.sql_insert);    
                     data_info.dd = null;
                     console.log(util.inspect(data_info));
                     console.log(util.inspect(err));
                     oneFileEE.emit('error', err);
                     return;
                }
                dds = null;
                data_info.affected_rows += res.affectedRows;
                function l() {
                    console.log('rows affected:', data_info.affected_rows, res.affectedRows)}
                l();
                oneFileEE.emit('dataLoaded');
            } 
        );
    }

}