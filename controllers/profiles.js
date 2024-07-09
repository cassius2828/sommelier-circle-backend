const UserModel = require("../models/user");

module.exports = {
  profile
};

async function profile(req, res) {
  try {
    // find the user by their id!
    const userDoc = await UserModel.findById(req.params.userId);
    // if not user doc is found thrown an error
    if (!userDoc) {
      res.status(404);
      throw new Error("Profile not found.");
    }

	// send back the user
	res.json({userDoc})

  } catch (err) {
    console.log(err);
    if (res.statusCode === 404) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
