var mysql = require('mysql');
var dbconnect = mysql.createConnection({
    host: process.env.PORT,
    port:process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

dbconnect.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = {dbconnect}