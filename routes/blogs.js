const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const blogsRouter = require("../controllers/blogs");
const verifyToken = require("../middleware/verify-token");

///////////////////////////
// ? POST | New Blog
///////////////////////////
router.post("/", upload.single("img"), blogsRouter.postNewBlog);

///////////////////////////
// GET | All Blogs
///////////////////////////
router.get("/", blogsRouter.getAllBlogs);

///////////////////////////
// GET | Show Blog
///////////////////////////
router.get("/:blogId", blogsRouter.getSingleBlog);

///////////////////////////
// * PUT | Edit Blog
///////////////////////////
router.put("/:blogId", upload.single("img"), verifyToken, blogsRouter.putEditBlog);

///////////////////////////
// ! DELETE | Delete Blog
///////////////////////////
router.delete("/:blogId", verifyToken, blogsRouter.deleteBlog);

///////////////////////////
// GET | User's Blogs
///////////////////////////
router.get("/user-blogs/:userId", verifyToken, blogsRouter.getMyBlogs);

module.exports = router;


module.exports = router;
