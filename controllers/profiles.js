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
    // console.log(err);
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
    // console.error(err);
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
    // console.error(err);
    res.status(500).json({ error: "Unable to unfollow targeted user" });
  }
};
///////////////////////////
// GET | Search Users
///////////////////////////
const getSearchUsers = async (req, res) => {
  const { query } = req.params;
  // ? for some reason this causes an error with search value and string for the profile function??

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
  // TODO: Add ability to upload photo (and delete current photo from s3 bucket)
  console.log(req.body, "<-- req.body");
  console.log(req.file, " <-- req.file");
  const { userId } = req.params;
  const { username, displayedName, email } = req.body;
  const {
    twitterUsername,
    twitterLink,
    instagramUsername,
    instagramLink,
    facebookUsername,
    facebookLink,
    linkedInUsername,
    linkedInLink,
  } = req.body;
  let formData;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user was found" });
    }

    let filePath = "";
    let params;
    //  = {
    //   Bucket: process.env.BUCKET_NAME,
    //   Key: filePath,
    //   Body:req.file.buffer
    // }
    let command;
    //  = new PutObjectCommand(params)
    if (user.profileImg && !req.file) {
      console.log("user has profile image and no file was sent");
      formData = {
        profileImg: user.profileImg,
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
    } else {
      console.log("file was sent");

      filePath = `sommelier-circle/profile-imgs/${uuidv4()}-${
        req.file.originalname
      }`;
      params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.file.buffer,
      };
      console.log(
        `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazon.com/${filePath}`
      );
      command = new PutObjectCommand(params);
      const data = await s3.send(command);

      formData = {
        profileImg: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`,
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
    }
    const updatedUserDoc = await UserModel.findByIdAndUpdate(userId, formData);
    if (!updatedUserDoc) {
      return res.status(400).json({ message: "Updated user doc is not found" });
    }
    res.status(200).json(updatedUserDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to edit user info` });
  }
};

const checkUserHasSocialMediaPlatform = async (req, res) => {
  const { platform } = req.query;
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User does not exist." });
    }
    if (
      !user.socialMedia[platform].username ||
      !user.socialMedia[platform].link
    ) {
      return res.status(400).json({
        error: `User is missing either a username or a link for ${platform}`,
      });
    }
    res.status(200).json({
      message: `User does have ${platform} credentials in thier profile`,
    });
  } catch (err) {
    res.status(500).json({
      error: `Unable to check if user has ${platform}. Error: ${err}`,
    });
  }
};

module.exports = {
  profile,
  postFollowUser,
  postUnfollowUser,
  getSearchUsers,
  putEditUserInfo,
  checkUserHasSocialMediaPlatform,
};
