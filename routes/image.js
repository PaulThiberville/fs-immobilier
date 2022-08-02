const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const imageCtrl = require("../controllers/image");

router.post("/:id", auth, imageCtrl.add);
router.delete("/:id", auth, imageCtrl.delete);

module.exports = router;
