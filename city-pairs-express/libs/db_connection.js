var mysql = require("mysql2");

function connectDB(app) {
        var db_url;
        if('DATABASE_URL' in process.env) {
            db_url = process.env.DATABASE_URL;
        } else {
            console.error({
                error: 'environment variable DATABASE_URL was not found!',
                format: 'mysql2://user:passwd@host:port_number/db_name'
            });
	        return;
        }
        var conn = mysql.createPool(db_url+'?multipleStatements=true');
        app.locals.dbConn = conn;
}

module.exports = connectDB;