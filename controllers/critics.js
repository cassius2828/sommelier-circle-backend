const Critic = require("../models/critic");

///////////////////////////
// GET | All Crtics
///////////////////////////
const getAllCritics = async (req, res) => {
  try {
    const critics = await Critic.find({});
    if (critics.length == 0) {
      return res.status(400).json({ message: "Results returned 0 critics" });
    }
    res.status(200).json(critics);
  } catch (err) {
    res.status(500).json({ error: ` Unable to find critics. Error: ${err}` });
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

module.exports = {
  getAllCritics,
  getCriticDetails,
};
