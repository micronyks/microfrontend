const Fleet = require("../models/fleets.model");

exports.getAllFleets = async (req, res, next) => {

    console.log('hitting getAllFleets route')

    Fleet.getAllFleets((err, result) => {

        if (err) {
            res.status(500).send('something went wrong while fetching fleets');
            return;
        }

        res.status(200).send(result);
    });




}

