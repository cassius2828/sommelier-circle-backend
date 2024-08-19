const express = require("express");
const router = express.Router();
const criticsCtrl = require("../controllers/critics");

router.get("/", criticsCtrl.getAllCritics);
router.get("/:id", criticsCtrl.getCriticDetails);

module.exports = router;
