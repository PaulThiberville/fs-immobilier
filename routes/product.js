const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const productCtrl = require("../controllers/product");

router.post("/", productCtrl.create);
router.get("/:id", productCtrl.readOne);
router.post("/search/", productCtrl.search);
router.put("/:id", auth, productCtrl.update);
router.delete("/:id", auth, productCtrl.delete);

module.exports = router;
