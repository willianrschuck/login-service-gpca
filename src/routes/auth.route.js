const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/validate", authController.validate);

module.exports = router;