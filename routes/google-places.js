const express = require("express");
const router = express.Router();
const googlePlacesCtrl = require("../controllers/google-places");

router.get("/nearbysearch", googlePlacesCtrl.getNearbySearches);

module.exports = router;
