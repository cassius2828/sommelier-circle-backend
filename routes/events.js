const express = require("express");
const router = express.Router();
const eventCtrl = require("../controllers/events");

const verifyToken = require("../middleware/verify-token");

router.post(
  "/create",
  upload.single("img"),
  verifyToken,
  eventCtrl.postCreateEventPosting
);

module.exports = router;
