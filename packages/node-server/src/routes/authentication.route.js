const express = require("express");
const router = express.Router();

const { getLogin, postLogin } = require("../controllers/authentication.controller");

router
    .route("/")
    .get(getLogin)
    .post(postLogin)


module.exports = router;