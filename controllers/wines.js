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

module.exports = {
  getWineCategoryPage,
  getAllWines,
  getSelectedWine,
};
