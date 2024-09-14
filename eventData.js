const mongoose = require("mongoose");
const Event = require("./models/event"); // Assuming your Event model is exported from this path

const ownerIds = [
  "668dbf6c07b35016d7d43d4c",
  "6690232e76a46290a4522018",
  "6694c94e657582fbbe092cb9",
  "6694cf34657582fbbe092d2f",
];

const eventNames = [
  "Wine Tasting Event",
  "Gourmet Dinner Night",
  "Jazz & Wine Evening",
  "Art & Wine Exhibition",
  "Cheese & Wine Pairing",
  "Outdoor Wine Festival",
  "Winemaker's Dinner",
  "Sparkling Wine Brunch",
  "Wine & Painting Workshop",
  "Luxury Wine Tasting",
  "Summer Wine Picnic",
  "Wine & Chocolate Experience",
];

const createEvents = async () => {
  try {
    const events = eventNames.map((name, index) => ({
      eventName: name,
      photo: "",
      eventDescription: `${name} event description.`,
      streetAddress: `123 Main St Apt ${index + 1}`,
      city: "Napa",
      state: "CA",
      startTimeHour: ((index % 12) + 1).toString(),
      startTimeMinute: "00",
      startTimeTod: index % 2 === 0 ? "AM" : "PM",
      endTimeHour: ((index % 12) + 1 + 2).toString(),
      endTimeMinute: "30",
      endTimeTod: index % 2 === 0 ? "AM" : "PM",
      date: new Date(2024, 8, index + 1), // Events in September 2024
      email: `event${index + 1}@example.com`,
      phone: `70755500${index}`,
      ticketedEvent: index % 2 === 0, // Every other event is ticketed
      ticketsAvailable: index % 2 === 0 ? 100 : 0,
      ticketPrice: index % 2 === 0 ? 50 : 0,
      owner: ownerIds[index % ownerIds.length], // Cycles through the provided owner IDs
    }));

    await Event.insertMany(events);
    console.log("12 events have been created successfully.");
  } catch (err) {
    console.error("Error creating events:", err);
  }
};

module.exports = createEvents;
