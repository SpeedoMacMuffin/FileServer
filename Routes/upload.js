const express = require("express");
const router = express.Router();
const uploadController = require("../Controllers/upload");

router.get("/:id", uploadController.open);
router.post("/", uploadController.upload);

module.exports = router;
