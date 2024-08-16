const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // basic
    eventName: { type: String, required: true },
    photo: { type: String },
    eventDescription: { type: String, required: true },
    // location
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    // event time
    startTimeHour: { type: String, required: true },
    startTimeMinute: { type: String, required: true },
    startTimeTod: { type: String, required: true },
    endTimeHour: { type: String, required: true },
    endTimeMinute: { type: String, required: true },
    endTimeTod: { type: String, required: true },
    date: { type: Date, required: true },
    // contact
    email: { type: String, required: true },
    phone: { type: String },
    ticketedEvent: { type: Boolean },
    ticketsAvailable: { type: Number, default: 0 },
    ticketPrice: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
