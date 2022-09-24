const mysql = require("../config/db");

class Fleet {
    constructor() { }

    static getAllFleets(cb) {

        mysql
            .query(
                "select * from fleets",
                [],
                (error, results) => {
                    if (error) { cb(error) }

                    
                    cb(null, results);
                });
    }
}

module.exports = Fleet;