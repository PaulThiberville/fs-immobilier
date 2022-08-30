const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUserById);
router.put("/:id", userCtrl.updateUserById);
router.delete("/:id", userCtrl.deleteUserById);

module.exports = router;
