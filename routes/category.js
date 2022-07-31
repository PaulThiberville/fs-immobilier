const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const categoryCtrl = require("../controllers/category");

router.post("/", auth, categoryCtrl.add);
router.get("/", auth, categoryCtrl.get);
router.delete("/:id", auth, categoryCtrl.delete);

module.exports = router;
