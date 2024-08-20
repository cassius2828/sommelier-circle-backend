const Critic = require("../models/critic");

///////////////////////////
// GET | All Crtics
///////////////////////////
const getAllCritics = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 9;
  const skip = (page - 1) * limit;
  try {
    const critics = await Critic.find({}).skip(skip).limit(limit);
    if (critics.length == 0) {
      return res
        .status(400)
        .json({ message: `No critics found for page number ${page}` });
    }
    res.status(200).json(critics);
  } catch (err) {
    res.status(500).json({ error: ` Unable to find critics. Error: ${err}` });
  }
};

///////////////////////////
// GET | Featured Crtics
///////////////////////////
const getFeaturedCritics = async (req, res) => {
  try {
    const critics = await Critic.aggregate([
      {
        $limit: 3,
      },
    ]);
    if (critics.length == 0) {
      return res.status(400).json({ message: "Results returned 0 critics" });
    }
    res.status(200).json(critics);
  } catch (err) {
    res
      .status(500)
      .json({ error: ` Unable to find featured critics. Error: ${err}` });
  }
};

///////////////////////////
// GET | Critic Details
///////////////////////////
const getCriticDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const critic = await Critic.findById(id);
    if (!critic) {
      return res
        .status(400)
        .json({ message: "Could not find the desired critic" });
    }
    res.status(200).json(critic);
  } catch (err) {
    res
      .status(500)
      .json({ error: ` Unable to find critic by id of ${id}. Error: ${err}` });
  }
};

///////////////////////////
// GET | Total Critics #
///////////////////////////
const getCriticsCount = async (req, res) => {
  try {
    const totalCritics = await Critic.countDocuments({});
    res.status(200).json(totalCritics);
  } catch (err) {
    res.status(500).json({ error: `Unable to count critics. Error: ${err}` });
  }
};

module.exports = {
  getAllCritics,
  getCriticDetails,
  getFeaturedCritics,
  getCriticsCount,
};
