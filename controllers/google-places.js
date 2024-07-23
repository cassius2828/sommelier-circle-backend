const axios = require("axios");

const GOOGLE_PLACES_BASE_URL = `https://maps.googleapis.com/maps/api/place`;

///////////////////////////
// GET | Nearby Establishments
///////////////////////////
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

///////////////////////////
// GET | Photo of Establishment
///////////////////////////
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

const getSearchQueryLocationResults = async (req, res) => {
  const { query } = req.params;
  // ? for some reason this causes an error with search value and string for the profile function??

  try {
    const locations = await UserModel.find({
      username: { $regex: query, $options: "i" },
    });
  res.status(200).json({ message: "hit" });
    // res.status(200).json(locations);
  }
 
   catch (err) {
    console.error(
      `Error fetching query results for wine locations: ${err.message}`,
      err
    );
    res.status(500).json({
      error: "Cannot retrieve query results for wine locations",
      details: err.message,
    });
  }
};

module.exports = {
  getNearbySearches,
  getPhotoOfRoom,
  getSearchQueryLocationResults,
};
