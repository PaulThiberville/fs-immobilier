const express = require("express");
const router = express.Router();

const citiesCtrl = require("../controllers/cities");

router.get("/", citiesCtrl.getCities);

module.exports = router;
