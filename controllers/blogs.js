const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const BlogModel = require("../models/blog");
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const sanitizeHTML = require("sanitize-html");

const createNewBlog = async (req, res) => {
  const { title, content,owner } = req.body;

  console.log(title, " <-- title");
  console.log(content, " <-- content");
  console.log(req.file, " <-- file");
  if (!title || !content || !req.file) {
    return res.status(400).json({ error: "missing fields" });
  }

  // Sanitize the content
  const sanitizedContent = sanitize(content);

  // Check if a photo file is submitted
  if (!req.file)
    return res.status(400).json({ error: "Please Submit a Photo!" });

  // Create the file path and parameters for S3 upload
  const filePath = `sommelier-circle/blog-headers/${uuidv4()}-${title}-${
    req.file.originalname
  }`;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: req.file.buffer,
  };
  // Initialize the S3 PutObjectCommand
  const command = new PutObjectCommand(params);
  try {
    // Upload the file to S3
    const data = await s3Client.send(command);
    const newBlog = await BlogModel.create({
      owner,
      title,
      content: sanitizedContent,
      img: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`,
    });
    res
      .status(200)
      .json({ message: "Successfully created new blog", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Unable to create new blog" });
  }
};

const getMyBlogs = async (req, res) => {
  const { userId } = req.params;
  try {
    const userBlogs = await BlogModel.find({ owner: userId });

    if (userBlogs.length === 0) {
      return res
        .status(404)
        .json({ error: "No blogs found for the current user" });
    }

    res.status(200).json(userBlogs);
  } catch (err) {
    console.error("Error retrieving user blogs:", err);
    res.status(500).json({ error: "An error occurred while retrieving blogs" });
  }
};

module.exports = {
  createNewBlog,
  getMyBlogs,
};

///////////////////////////
// functions
///////////////////////////

const sanitize = (content) => {
    const sanitizedContent = sanitizeHTML(content, {
      allowedTags: sanitizeHTML.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        '*': ['class', 'style'], // Allow 'class' and 'style' on any tag
        ...sanitizeHTML.defaults.allowedAttributes,
        img: ["src", "alt", "title", "width", "height"],
      },
    });
    return sanitizedContent;
  };