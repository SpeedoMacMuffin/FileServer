const express = require("express");
const router = express.Router();
const filesController = require("../Controllers/files");

router.get("/:id", filesController.getFileInfo);
router.delete("/:id", filesController.deleteFile);
router.get("/", filesController.getAllFiles);

module.exports = router;
