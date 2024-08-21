const User = require("../models/user");


///////////////////////////
// GET | User Favorites
///////////////////////////
const getUserFavorites = async (req, res, favoriteType) => {
  const { userId } = req.query;
  try {
    // get user
    const user = await User.findById(userId).populate(`favorites.${favoriteType}`);
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
      return res
        .status(400)
        .json({
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
      return res
        .status(400)
        .json({
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
      return res
        .status(200)
        .json({
          message: `${favoriteType.slice(
            0,
            -1
          )} added to favorites successfully.`,
        });
    } else {
      return res
        .status(400)
        .json({
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
      return res
        .status(400)
        .json({
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
      return res
        .status(200)
        .json({
          message: `Successfully removed ${favoriteType.slice(
            0,
            -1
          )} from favorites list`,
        });
    } else {
      return res
        .status(400)
        .json({
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

module.exports = {
  deleteRemoveFromFavorites,
  getUserFavorites,
  postAddToFavorites,
};
