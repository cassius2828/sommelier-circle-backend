const express = require("express");
const router = express.Router();
const googlePlacesCtrl = require("../controllers/google-places");

router.get("/nearbysearch", googlePlacesCtrl.getNearbySearches);
router.get("/room-photos", googlePlacesCtrl.getPhotoOfRoom);

module.exports = router;
