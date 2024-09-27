const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  displayedName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    default: "",
  },
  favorites: {
    wines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wine" }],
    locations: [String],
    critics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Critic" }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profileImg: String,
  rep: {
    type: Number,
    default: 0,
  },
  socialMedia: {
    twitter: {
      username: String,
      link: String,
    },
    instagram: {
      username: String,
      link: String,
    },
    facebook: {
      username: String,
      link: String,
    },
    linkedIn: {
      username: String,
      link: String,
    },
  },
  bio: {
    type: String,
    maxlength: 500, // Set the maximum length to 500 characters (or any other number you prefer)
  },
});

userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password; // deletes the password
    return ret; // then just returns the document
  },
});


// Pre-save middleware to set displayedName to username if not provided
userSchema.pre("save", async function (next) {
  if (!this.displayedName) {
    this.displayedName = this.username;
  }
  // Hash password if it's new or modified
  if (this.isModified("password")) {
    this.password =  bcrypt.hashSync(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
