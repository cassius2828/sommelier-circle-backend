const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  googleId: String, 
  favorites: {
    wines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wine" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
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
    twitter: String,
    instagram: String,
    facebook: String,
    linkedIn: String,
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

// const UserModel = mongoose.model('User', userSchema)
// module.exports = UserModel

module.exports = mongoose.model("User", userSchema);
