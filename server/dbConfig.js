var mysql = require('mysql');
var dbconnect = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.DBPORT,
    user:"root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

dbconnect.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = {dbconnect}