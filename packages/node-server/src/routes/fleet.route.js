const express = require("express");
const router = express.Router();

const { getAllFleets } = require("../controllers/fleet.controller");

router
    .route("/")
    .get(getAllFleets)


module.exports = router;