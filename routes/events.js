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

router.get("/", eventCtrl.getExploreEvents);
router.get("/filter-events/city", eventCtrl.getFilterExploreEvents);
router.get("/user-events", eventCtrl.getUserEvents);
router.get("/:eventId", eventCtrl.getEventDetails);
router.put(
  "/:eventId",
  upload.single("photo"),
  verifyToken,
  eventCtrl.putEditEvent
);

module.exports = router;
