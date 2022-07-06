const express = require("express");

const applicationController = require("../controller/applications.controller");

const router = express.Router();

router.get("/:id", applicationController.getApplication);

module.exports = router;