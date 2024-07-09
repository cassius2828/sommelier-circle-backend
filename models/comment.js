const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    text: { type: String, required: true },

    upvotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
