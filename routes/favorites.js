const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Critic = require("../models/critic");
const Event = require("../models/event");
const Wine = require("../models/wine");
const favCtrl = require("../controllers/favorites");

///////////////////////////
// ==================================
// BLOGS
// ==================================
///////////////////////////
router.get("/blogs", (req, res) => favCtrl.getUserFavorites(req, res, "blogs"));
router.post("/blogs", (req, res) =>
  favCtrl.postAddToFavorites(req, res, Blog, "blogs")
);
router.delete("/blogs", (req, res) =>
  favCtrl.deleteRemoveFromFavorites(req, res, Blog, "blogs")
);

///////////////////////////
// ==================================
// CRITICS
// ==================================
///////////////////////////
router.get("/critics", (req, res) =>
  favCtrl.getUserFavorites(req, res, "critics")
);
router.post("/critics", (req, res) =>
  favCtrl.postAddToFavorites(req, res, Critic, "critics")
);
router.delete("/critics", (req, res) =>
  favCtrl.deleteRemoveFromFavorites(req, res, Critic, "critics")
);

///////////////////////////
// ==================================
// EVENTS
// ==================================
///////////////////////////
router.get("/events", (req, res) =>
  favCtrl.getUserFavorites(req, res, "events")
);
router.post("/events", (req, res) =>
  favCtrl.postAddToFavorites(req, res, Event, "events")
);
router.delete("/events", (req, res) =>
  favCtrl.deleteRemoveFromFavorites(req, res, Event, "events")
);

///////////////////////////
// ==================================
// LOCATIONS
// ==================================
///////////////////////////
router.get("/locations", favCtrl.getLocationsUserFavorites);
router.post("/locations", favCtrl.postLocationsAddToFavorites);
router.delete("/locations", favCtrl.deleteLocationsRemoveFromFavorites);

///////////////////////////
// ==================================
// WINES
// ==================================
///////////////////////////
router.get("/wines", (req, res) => favCtrl.getUserFavorites(req, res, "wines"));
router.post("/wines", (req, res) =>
  favCtrl.postAddToFavorites(req, res, Wine, "wines")
);
router.delete("/wines", (req, res) =>
  favCtrl.deleteRemoveFromFavorites(req, res, Wine, "wines")
);

module.exports = router;
