const mysql = require('mysql');

const db = mysql.createConnection({
    host: "mfe.cboiew51vesd.ap-south-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Saividya",
    database: "mfeDB"
})

db.connect(err => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Database connected", db.state);
})

module.exports = db;