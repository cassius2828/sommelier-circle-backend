const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    img: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    upvotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
