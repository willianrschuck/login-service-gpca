const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.get("/login", authController.external)
router.post("/login", authController.login);

module.exports = router;