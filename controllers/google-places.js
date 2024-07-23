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
    if (!photo_reference) {
      return res.status(400).json({ error: "No photo reference was found" });
    }

    const url = `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=400&photo_reference=${photo_reference}&key=${key}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const mimeType = response.headers["content-type"];

    res.status(200).json(`data:${mimeType};base64,${base64Image}`);
  } catch (err) {
    console.error(`Error fetching photo: ${err.message}`, err);
    res.status(500).json({
      error: "Cannot retrieve photos from Google Places photo_reference",
      details: err.message,
    });
  }
};

module.exports = {
  getNearbySearches,
  getPhotoOfRoom,
};
