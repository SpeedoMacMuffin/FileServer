const express = require("express");
const router = express.Router();
const downloadController = require("../Controllers/download");

router.get("/:id", downloadController.download);

module.exports = router;
