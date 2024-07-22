const axios = require("axios");

const GOOGLE_PLACES_BASE_URL = `https://maps.googleapis.com/maps/api/place`;

const getNearbySearches = async (req, res) => {
  const { lat, lng, radius, type, keyword, key } = req.query;

  try {
    const response = await axios.get(
      `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json`,
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

const getPhotoOfRoom = async (req, res) => {
  const { photo_reference, key } = req.query;
  try {
    if (!photo_reference)
      return res.status(400).json({ error: "No photo refernce was found" });
    const response = await axios.get(
      `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=400&
      photo_reference=${photo_reference}
      &key=${key}`
    );
    res.status(200).json(response.data)
    // res.status(200).json({message: 'hit'})
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Cannot retrieve photos from google places photo_reference",
      });
  }
};

module.exports = {
  getNearbySearches,getPhotoOfRoom
};
