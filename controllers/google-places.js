const axios = require("axios");

const getNearbySearches = async (req,res) => {
  const { lat, lng, radius, type, keyword, key } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius,
          type,
          keyword,
          key,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNearbySearches,
};
