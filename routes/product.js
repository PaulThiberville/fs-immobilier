const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const productCtrl = require("../controllers/product");

router.post("/", auth, productCtrl.create);
router.get("/", productCtrl.readAll);
router.get("/:id", productCtrl.readOne);
router.put("/:id", auth, productCtrl.update);
router.delete("/:id", auth, productCtrl.delete);

module.exports = router;
