const UserModel = require("../models/user");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

// initalize s3 instance
const s3 = new S3Client({ region: process.env.AWS_REGION });

///////////////////////////
// GET | Get user profile
///////////////////////////
async function profile(req, res) {
  const { userId } = req.params;
  try {
    // find the user by their id!
    const userDoc = await UserModel.findById(userId).select("-password");
    // if not user doc is found thrown an error
    if (!userDoc) {
      res.status(404);
      throw new Error("Profile not found.");
    }
    // send back the user
    res.json(userDoc);
  } catch (err) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

///////////////////////////
// ? POST | Follow another user
///////////////////////////
const postFollowUser = async (req, res) => {
  const { otherUser } = req.params;
  const userId = req.user.user._id;

  try {
    const userDoc = await UserModel.findById(userId);
    const otherUserDoc = await UserModel.findById(otherUser);
    if (!userDoc || !otherUserDoc) {
      return res
        .status(404)
        .json({ error: "One of the two users does not exist" });
    }
    // disallow extra entires in follower list
    if (userDoc.following.includes(otherUserDoc._id)) {
      return res
        .status(400)
        .json({ error: "This user is already following the targeted user" });
    }
    // add targeted user to our following list
    userDoc.following.push(otherUserDoc._id);
    await userDoc.save();

    // add current user to list of followers for targeted user
    otherUserDoc.followers.push(userDoc._id);
    await otherUserDoc.save();
    res.status(200).json({ message: "Successfully followed the user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to follow targeted user" });
  }
};

///////////////////////////
// ? POST | Unfollow another user
///////////////////////////
const postUnfollowUser = async (req, res) => {
  const { otherUser } = req.params;
  const userId = req.user.user._id;

  try {
    const userDoc = await UserModel.findById(userId);
    const otherUserDoc = await UserModel.findById(otherUser);
    if (!userDoc || !otherUserDoc) {
      return res
        .status(404)
        .json({ error: "One of the two users does not exist" });
    }
    // disallow extra entires in follower list
    if (!userDoc.following.includes(otherUserDoc._id)) {
      return res.status(400).json({
        error:
          "This user does not yet follow the targeted user, so there is no user to unfollow",
      });
    }
    // add targeted user to our following list
    userDoc.following.pull(otherUserDoc._id);
    await userDoc.save();

    // add current user to list of followers for targeted user
    otherUserDoc.followers.pull(userDoc._id);
    await otherUserDoc.save();
    res.status(200).json({ message: "Successfully unfollowed the user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to unfollow targeted user" });
  }
};
///////////////////////////
// GET | Search Users
///////////////////////////
const getSearchUsers = async (req, res) => {
  const { query } = req.params;
  try {
    const users = await UserModel.find({
      username: { $regex: query, $options: "i" },
    });

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to retrieve users from search query" });
  }
};

///////////////////////////
// * PUT | Edit User Info
///////////////////////////
const putEditUserInfo = async (req, res) => {
  const { userId } = req.params;
  const {
    displayedName,
    email,
    facebookLink,
    facebookUsername,
    instagramLink,
    instagramUsername,
    linkedInLink,
    linkedInUsername,
    twitterLink,
    twitterUsername,
    username,
  } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user was found" });
    }
    // set up s3 variables
    const filePath = `sommelier-circle/profile-imgs/${uuidv4()}-${
      req.file.originalname
    }`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    const formData = {
      profileImg: req.file
        ? `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`
        : user.profileImg,
      username,
      displayedName,
      email,
      socialMedia: {
        twitter: { username: twitterUsername, link: twitterLink },
        instagram: { username: instagramUsername, link: instagramLink },
        facebook: { username: facebookUsername, link: facebookLink },
        linkedIn: { username: linkedInUsername, link: linkedInLink },
      },
    };

    user.set(formData);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to edit user info` });
  }
};

module.exports = {
  profile,
  postFollowUser,
  postUnfollowUser,
  getSearchUsers,
  putEditUserInfo,
};
