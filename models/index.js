var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dhatriDB",
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected");
});

module.exports = db;
