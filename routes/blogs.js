const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const blogsRouter = require("../controllers/blogs");
const verifyToken = require("../middleware/verify-token");

router.post("/", upload.single("img"), blogsRouter.postNewBlog);
router.get("/:blogId", blogsRouter.getSingleBlog);
router.put("/:blogId", upload.single("img"),verifyToken, blogsRouter.putEditBlog);
router.delete("/:blogId",verifyToken, blogsRouter.deleteBlog);
router.get("/user-blogs/:userId", verifyToken, blogsRouter.getMyBlogs);

module.exports = router;
