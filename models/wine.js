const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  region: { type: String, required: true },
  winery: { type: String },
  description: { type: String, required: true },
  tags: [{ type: String }],
  criticScore: { type: Number },
  grape: { type: String, required: true },
  avgPrice: { type: Number },
  img: { type: String, required: true },
});

const WineModel = mongoose.model("Wine", wineSchema);

module.exports = WineModel;
