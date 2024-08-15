const postCreateEventPosting = async (req, res) => {
  try {
    res.status(200).json("hit");
  } catch (err) {
    res.status(500).json({ error: "unable to create new event " });
  }
};

module.exports = {
  postCreateEventPosting,
};
