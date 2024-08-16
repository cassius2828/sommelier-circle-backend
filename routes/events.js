const express = require("express");
const router = express.Router();
const eventCtrl = require("../controllers/events");
const multer = require("multer");
const upload = multer();
const verifyToken = require("../middleware/verify-token");

router.post(
  "/create",
  upload.single("photo"),
  verifyToken,
  eventCtrl.postCreateEventPosting
);

module.exports = router;
