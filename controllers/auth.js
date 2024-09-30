///////////////////////////
// AWS SDK and User Model
///////////////////////////
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Initialize the S3 client with the region from environment variables
const s3Client = new S3Client({ region: process.env.AWS_REGION });

///////////////////////////
// User Login Function
///////////////////////////
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });

    // Check if user exists and if the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate a JWT token with the user data
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      // Respond with the generated token
      res.status(200).json({ token });
    } else {
      // Respond with an error if credentials are invalid
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    // Handle any errors and respond with a 400 status code
    res.status(400).json({ error: err.message });
  }
}

///////////////////////////
// User Signup Function
///////////////////////////
async function signup(req, res) {
  let { username, password, email } = req.body;

  console.log(req.body, req.file);
  try {
    // Check if the username or email already exists
    const foundByUsername = await UserModel.findOne({ username });
    if (foundByUsername) {
      return res.status(400).json({ error: "Username already taken." });
    }
    const foundByEmail = await UserModel.findOne({ email });
    if (foundByEmail) {
      return res.status(400).json({ error: "Email already taken." });
    }
    let profileImg;

    if (req.file) {
      // Create the file path and parameters for S3 upload
      const filePath = `sommelier-circle/profile-imgs/${uuidv4()}-${
        req.file?.originalname
      }`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.file?.buffer,
      };

      // Initialize the S3 PutObjectCommand
      const command = new PutObjectCommand(params); // Upload the file to S3
      const data = await s3Client.send(command);
      profileImg = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
    } else {
      profileImg =
        "https://5-06-sei.s3.us-west-1.amazonaws.com/sommelier-circle/profile-imgs/default-profile-img.jpg";
    }

    try {
      // Hash the password
      password = bcrypt.hashSync(password, 10);

      // Create a new user in the database
      const createdUser = await UserModel.create({
        username,
        email,
        password,
        profileImg,
      });

      // Generate a JWT token with the created user data
      const token = jwt.sign({ user: createdUser }, process.env.JWT_SECRET);

      // Respond with the generated token
      res.status(201).json({ token });
    } catch (err) {
      console.log("Error uploading to S3:", err);

      // Handle any errors with the S3 upload and respond with a 500 status code
      return res.status(500).json({
        error: `Check back later, server issues with AWS upload. Error: ${err}`,
      });
    }
  } catch (err) {
    console.log(err);

    // Handle any other errors and respond with a 400 status code
    res.status(400).json({ error: err.message });
  }
}

///////////////////////////
// GET | Token From OAuth login
///////////////////////////
const getTokenFromOAuthLogin = async (req, res) => {
  const token = req.cookies.jwt;
  console.log(token, " <-- google auth token");
  if (token) {
    res.status(200).json(token);
  } else {
    res.status(401).json({ message: " Not Authenticated" });
  }
};

///////////////////////////
// GET | Google Callback
///////////////////////////
const getGoogleCallback = async (req, res) => {
  const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.redirect(process.env.PROD_CLIENT_URL || "http://localhost:5173/");
};
module.exports = {
  signup,
  login,
  getTokenFromOAuthLogin,
  getGoogleCallback,
};
