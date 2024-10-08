const WineModel = require("../models/wine");
const diacritics = require("diacritics");

///////////////////////////
// GET | Wine Category Page
///////////////////////////
const getWineCategoryPage = (req, res) => {};

///////////////////////////
// GET | All Wines
///////////////////////////
const getAllWines = async (req, res) => {
  try {
    const allWines = await WineModel.find({});
    res.status(200).json(allWines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get wines" });
  }
};

///////////////////////////
// GET | Selected Wine by ID
///////////////////////////
const getSelectedWine = async (req, res) => {
  const { wineId } = req.params;
  try {
    const selectedWine = await WineModel.findById(wineId);
    if (!selectedWine) {
      return res.status(404).json({ error: "Could not find selected wine" });
    }
    res.status(200).json(selectedWine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to retrieve selected wine` });
  }
};

///////////////////////////
// ? POST | Filter Wine Results
///////////////////////////
const postFilterWineResults = async (req, res) => {
  const { grape, region, style, price, rating, query } = req.body;

  try {
    let wines = await WineModel.find({});

    if (grape) {
      wines = wines.filter((wine) => wine.grape === grape);
    }
    if (region) {
      wines = wines.filter((wine) => wine.region === region);
    }
    if (style) {
      wines = wines.filter(
        (wine) => wine.category.toLocaleLowerCase() === style
      );
    }
    if (price) {
      if (price === "low") {
        wines = wines.sort((a, b) => a.avgPrice - b.avgPrice);
      } else {
        wines = wines.sort((a, b) => b.avgPrice - a.avgPrice);
      }
    }
    if (rating) {
      if (rating === "100") {
        wines = wines.filter((wine) => wine.criticScore === 100);
      } else if (rating === "95+") {
        wines = wines.filter((wine) => wine.criticScore > 94);
      } else {
        wines = wines.filter(
          (wine) => wine.criticScore > 89 && wine.criticScore < 95
        );
      }
    }
    if (query) {
      wines = wines.filter((wine) => {
        const normalizedStr = diacritics.remove(wine.name);
        return normalizedStr.toLowerCase().includes(query);
      });
    }
    res.status(200).json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to filter wine data` });
  }
};

///////////////////////////
// GET | Wines by Style
///////////////////////////
const getWinesByStyle = async (req, res) => {
  let { style } = req.params;
  // capitalize first letter to match data keys
  const firstLetter = style.split("")[0].toUpperCase();
  style = style.split("");
  style.splice(0, 1, firstLetter);
  style = style.join("");

  try {
    const wines = await WineModel.find({ category: style });
    if (!wines) {
      return res
        .status(404)
        .json({ error: "Could not find any wines in specified category" });
    }
    res.status(200).json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error getting wines by their style` });
  }
};

///////////////////////////
// GET | Wines by Grape
///////////////////////////
const getWinesByGrape = async (req, res) => {
  let { grape } = req.params;
  // if the grape has multiple words in its name then handle the split of the grape name
  if (grape.includes("-")) {
    grape = handleSplitParam(grape);
  } else {
    grape = transformFirstLetterToUpperCase(grape);
  }
  try {
    const wines = await WineModel.find({ grape });
    if (!wines) {
      return res
        .status(404)
        .json({ error: "Could not find any wines in specified grape" });
    }

    res.status(200).json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error getting wines by their grape` });
  }
};

///////////////////////////
// GET | Wines by Region
///////////////////////////
const getWinesByRegion = async (req, res) => {
  let { region } = req.params;
  // if the region has multiple words in its name then handle the split of the region name
  if (region.includes("-")) {
    region = handleSplitParam(region);
  } else {
    region = transformFirstLetterToUpperCase(region);
  }
  try {
    const wines = await WineModel.find({ region });
    if (!wines) {
      return res
        .status(404)
        .json({ error: "Could not find any wines in specified region" });
    }

    res.status(200).json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error getting wines by their region` });
  }
};

module.exports = {
  getWineCategoryPage,
  getAllWines,
  getSelectedWine,
  postFilterWineResults,
  getWinesByStyle,
  getWinesByGrape,
  getWinesByRegion,
};

///////////////////////////
// Helper Functions
///////////////////////////

// *  Handle Split Parameter
const handleSplitParam = (param) => {
  param = param.split("-");
  let firstWord = param[0];
  let secondWord = param[1];
  firstWord = transformFirstLetterToUpperCase(firstWord);
  secondWord = transformFirstLetterToUpperCase(secondWord);
  return firstWord + " " + secondWord;
};

// * Transform First Letter to Uppercase
const transformFirstLetterToUpperCase = (word) => {
  word = word.split("");

  // First Letter Of Word
  let FLOW = word[0].toUpperCase();

  word.splice(0, 1, FLOW);
  word = word.join("");

  return word;
};
