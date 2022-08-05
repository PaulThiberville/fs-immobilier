const express = require("express");
const router = express.Router();

const citiesCtrl = require("../controllers/cities");

router.get("/:input", citiesCtrl.getCities);

module.exports = router;
