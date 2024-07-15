const express = require("express");
const router = express.Router();
const wineCtrl = require("../controllers/wines");

router.get("/search", wineCtrl.getAllWines);
router.post("/search", wineCtrl.postFilterWineResults);
router.get("/styles/:style", wineCtrl.getWinesByStyle);
router.get("/grapes/:grape", wineCtrl.getWinesByGrape);
router.get("/regions/:region", wineCtrl.getWinesByRegion);
router.get("/:wineId", wineCtrl.getSelectedWine);

module.exports = router;
