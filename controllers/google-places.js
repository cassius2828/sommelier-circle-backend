const axios = require("axios");

const GOOGLE_PLACES_BASE_URL = `https://maps.googleapis.com/maps/api/place`;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
///////////////////////////
// GET | Nearby Establishments
///////////////////////////
const getNearbySearches = async (req, res) => {
  const { lat, lng, radius, type, keyword,  } = req.query;

  try {
    const response = await axios.get(
      `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius,
          type,
          keyword,
          key:GOOGLE_PLACES_API_KEY,
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
const getPhotoOfLocation = async (req, res) => {
  const { photo_reference,  deviceWidth } = req.query;
  let url;
  try {
    if (!photo_reference) {
      return res.status(400).json({ error: "No photo reference was found" });
    }
    // sizes of device from frontend to ensure photo quality
    if (deviceWidth === "mobile") {
      url = `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=425&photo_reference=${photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
    } else if (deviceWidth === "desktop") {
      url = `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=2500&photo_reference=${photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
    } else {
      url = `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=800&photo_reference=${photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
    }

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
///////////////////////////
// GET | AutoComplete Search Results
///////////////////////////
const getSearchQueryLocationResults = async (req, res) => {
  const { query, country } = req.query;

  try {
    if (query.length > 3) {
      // generate new session token to track sesssion lengths
      const sessiontoken = generateSessionToken();
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: query,
            types: "restaurant|bar|tourist_attraction|route|point_of_interest",
            keyword: "wine",
            components: `country:${country}`,
            key: GOOGLE_PLACES_API_KEY,
            sessiontoken,
          },
        }
      );
      console.log(response.data);
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json([]);
    }
  } catch (err) {
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

///////////////////////////
// GET | Place Details
///////////////////////////
const getPlaceDetails = async (req, res) => {
  const { placeId } = req.query;
  console.log(placeId, " <-- place_id");
  try {
    const response = await axios.get(
      `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to retrieve place details from google places api",
    });
  }
};

module.exports = {
  getNearbySearches,
  getPhotoOfLocation,
  getSearchQueryLocationResults,
  getPlaceDetails,
};

///////////////////////////
// Functions
///////////////////////////

// generate uuid
function generateSessionToken() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
