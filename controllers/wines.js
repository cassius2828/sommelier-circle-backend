const WineModel = require("../models/wine");

const getWineCategoryPage = (req, res) => {};

const getAllWines = async (req, res) => {
  //   res.status(200).json({ message: "hit" });
  try {
    const allWines = await WineModel.find({});
    res.status(200).json(allWines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get wines" });
  }
};

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

const postFilterWineResults = async (req, res) => {
  const { grape, region, style, price, rating } = req.body;
  console.log(price, " <-- price");
  console.log(rating, " <-- rating");
  try {
    let wines = await WineModel.find({});

    if (grape) {
      wines = wines.filter((wine) => wine.grape === grape);
    }
    if (region) {
      wines = wines.filter((wine) => wine.region === region);
    }
    if (style) {
      wines = wines.filter((wine) => wine.category.toLocaleLowerCase() === style);
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
      } else if (rating === "90-94") {
        wines = wines.filter(
          (wine) => wine.criticScore > 89 && wine.criticScore < 95
        );
      } else if (rating === "85-89") {
        wines = wines.filter(
          (wine) => wine.criticScore > 84 && wine.criticScore < 90
        );
      } else {
        wines = wines.filter((wine) => wine.criticScore < 85);
      }
    }

    res.status(200).json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to filter wine data` });
  }
};

module.exports = {
  getWineCategoryPage,
  getAllWines,
  getSelectedWine,
  postFilterWineResults,
};
