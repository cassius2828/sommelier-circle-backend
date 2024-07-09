const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

module.exports = {
  signup,
  login,
};

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function signup(req, res) {
  console.log(req.body, req.file);
  try {
    const userDoc = await UserModel.findOne({ username: req.body.username });
    if (userDoc) {
      return res.status(400).json({ error: "Username already taken." });
    }

    if (!req.file)
      return res.status(400).json({ error: "Please Submit a Photo!" });

    const filePath = `auth-template/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await s3Client.send(command);
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const createdUser = await UserModel.create({
        ...req.body,
        photoUrl: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`,
      });

      const token = jwt.sign({ user: createdUser }, process.env.JWT_SECRET);
      res.status(201).json({ token });
    } catch (err) {
      console.log("Error uploading to S3:", err);
      return res
        .status(500)
        .json({ error: "Check back later, server issues with AWS upload" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}
