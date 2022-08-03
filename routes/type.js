const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const typeCtrl = require("../controllers/type");

router.post("/", auth, typeCtrl.add);
router.get("/", typeCtrl.get);
router.delete("/:id", auth, typeCtrl.delete);

module.exports = router;
