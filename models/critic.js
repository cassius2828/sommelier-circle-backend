const mongoose = require("mongoose");

const criticSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  awards: [
    {
      type: String,
      required: true,
    },
  ],

  experience: {
    type: Number,
    default: 0,
  },
});

const CriticModel = mongoose.model("Critic", criticSchema);

module.exports = CriticModel;
