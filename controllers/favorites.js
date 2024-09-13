const User = require("../models/user");
const axios = require("axios");

const GOOGLE_PLACES_BASE_URL = `https://maps.googleapis.com/maps/api/place`;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
///////////////////////////
// GET | User Favorites
///////////////////////////
const getUserFavorites = async (req, res, favoriteType) => {
  const { userId } = req.query;
  let user;
  try {
    // get user
    if (favoriteType === "blogs" || favoriteType === "events") {
      user = await User.findById(userId).populate({
        path: `favorites.${favoriteType}`,
        populate: {
          path: "owner",
          select: "username profileImg",
        },
      });
    } else {
      user = await User.findById(userId).populate(`favorites.${favoriteType}`);
    }
    // check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ message: `Could not find user with id of ${userId}` });
    }
    // store favorite list in var
    const favorites = user.favorites[favoriteType];
    // if there are favorites then return them to client
    if (favorites.length > 0) {
      return res.status(200).json(favorites);
    } else {
      // else send message that no favorites were found
      return res.status(400).json({
        message: `No ${favoriteType} were found in this user's favorites list`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `Unable to get user's favorite ${favoriteType}. Error: ${err}`,
    });
  }
};

///////////////////////////
// ? POST | Add to favorites
///////////////////////////
const postAddToFavorites = async (req, res, model, favoriteType) => {
  const { itemId, userId } = req.body;

  try {
    // ensure itemId matches an item in our db
    const itemToAdd = await model.findById(itemId);
    if (!itemToAdd) {
      return res.status(400).json({
        message: `${favoriteType.slice(
          0,
          -1
        )} with id ${itemId} cannot be found`,
      });
    }
    // find user to add item to
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: `User cannot be found. Cannot add ${favoriteType.slice(
          0,
          -1
        )} to favorites list.`,
      });
    }
    // check if item has not been added to favorites yet
    if (!user.favorites[favoriteType].includes(itemId)) {
      // add item and save changes
      user.favorites[favoriteType].push(itemId);
      await user.save();
      return res.status(201).json({
        message: `${favoriteType.slice(
          0,
          -1
        )} added to favorites successfully.`,
      });
    } else {
      return res.status(400).json({
        error: `${favoriteType.slice(
          0,
          -1
        )} already exists in user favorites list`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `Unable to add ${favoriteType.slice(
        0,
        -1
      )} to this user's favorites. Error: ${err}`,
    });
  }
};

///////////////////////////
// ! DELETE | Remove from favorites
///////////////////////////
const deleteRemoveFromFavorites = async (req, res, model, favoriteType) => {
  const { itemId, userId } = req.body;

  try {
    // ensure itemId matches an item in our db
    const itemToRemove = await model.findById(itemId);
    if (!itemToRemove) {
      return res.status(400).json({
        message: `${favoriteType.slice(
          0,
          -1
        )} with id ${itemId} cannot be found`,
      });
    }
    // find user to remove item from
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: `User cannot be found. Cannot remove ${favoriteType.slice(
          0,
          -1
        )} from favorites list.`,
      });
    }

    // remove item and save changes
    if (user.favorites[favoriteType].includes(itemId)) {
      user.favorites[favoriteType].pull(itemId);
      await user.save();
      return res.status(200).json({
        message: `Successfully removed ${favoriteType.slice(
          0,
          -1
        )} from favorites list`,
      });
    } else {
      return res.status(400).json({
        message: `${favoriteType.slice(
          0,
          -1
        )} not found in user's favorites list`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `Unable to remove ${favoriteType.slice(
        0,
        -1
      )} from this user's favorites. Error: ${err}`,
    });
  }
};

///////////////////////////
// ? POST | Add to favorites | LOCATIONS
///////////////////////////

const postLocationsAddToFavorites = async (req, res) => {
  const { userId, placeId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id of ${userId}` });
    }

    // check if item has not been added to favorites yet
    if (!user.favorites.locations.includes(placeId)) {
      // add item and save changes
      user.favorites.locations.push(placeId);
      await user.save();
      res.status(201).json({
        message: `Successfully added location to user's favorite locations list`,
      });
    } else {
      return res.status(400).json({
        error: `Location already exists in user favorites list`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `Unable to add location to user's favorite locations list`,
    });
  }
};

///////////////////////////
// ! DELETE | Remove from favorites | LOCATIONS
///////////////////////////
const deleteLocationsRemoveFromFavorites = async (req, res) => {
  const { placeId, userId } = req.body;

  try {
    // find user to remove item from
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: `User cannot be found. Cannot remove location from favorites list.`,
      });
    }

    // remove item and save changes
    if (user.favorites.locations.includes(placeId)) {
      user.favorites.locations.pull(placeId);
      await user.save();
      return res.status(204).json({
        message: `Successfully removed location from favorites list`,
      });
    } else {
      return res.status(404).json({
        message: `Location not found in user's favorites list`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `Unable to remove location from this user's favorites. Error: ${err}`,
    });
  }
};

///////////////////////////
// GET | User Favorites | LOCATIONS
///////////////////////////
const getLocationsUserFavorites = async (req, res) => {
  const { userId } = req.query;
  try {
    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: `Cannot find user with id of ${userId}`,
      });
    }
    console.log(user.favorites, ' <-- user.favorites')

    // Extract placeIdArray from user's favorites
    const placeIdArray = user.favorites?.locations;
    console.log(placeIdArray, ' <-- place id array')
    if (!placeIdArray || placeIdArray.length < 1) {
      return res.status(404).json({
        message: "Favorite locations list is empty",
      });
    }

    // Fetch place details for each place_id using Google Places API
    const favoritePlacesDetailsResponse = await Promise.all(
      placeIdArray.map(async (place) => {
        const response = await axios.post(
          `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${place}&key=${GOOGLE_PLACES_API_KEY}`
        );
        console.log(response.data, ' <-- indv response from google place locaiton api')
        return response.data;
      })
    );

    // If no data is returned from Google Places API
    if (favoritePlacesDetailsResponse.length === 0) {
      return res.status(400).json({
        message:
          "Unable to get data from Google Places API to convert place_id to place details for each location in the user's favorites",
      });
    }

    // Return the favorite places details
    res.status(200).json(favoritePlacesDetailsResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to retrieve place details from Google Places API",
    });
  }
};

module.exports = {
  deleteRemoveFromFavorites,
  deleteLocationsRemoveFromFavorites,
  getUserFavorites,
  getLocationsUserFavorites,
  postAddToFavorites,
  postLocationsAddToFavorites,
};
