const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
  },
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;
