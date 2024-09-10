const express = require("express");
const router = express.Router();
const googlePlacesCtrl = require("../controllers/google-places");

router.get("/nearbysearch", googlePlacesCtrl.getNearbySearches);
router.get("/location-photos", googlePlacesCtrl.getPhotoOfLocation);
router.get("/autocomplete-search-locations", googlePlacesCtrl.getSearchQueryLocationResults)
router.get("/place-details", googlePlacesCtrl.getPlaceDetails)

module.exports = router;
