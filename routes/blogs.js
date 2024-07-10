const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const blogsRouter = require("../controllers/blogs");
const verifyToken = require("../middleware/verify-token");

router.post("/", upload.single("img"),blogsRouter.createNewBlog);
router.get('/user-blogs/:userId', verifyToken, blogsRouter.getMyBlogs)

module.exports = router;
