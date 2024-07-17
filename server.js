const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Wine = require("./models/wine");
const wineData = require("./wineData");
const criticData = require("./criticData");
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const testJWTRouter = require("./routes/test-jwt");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const blogRouter = require("./routes/blogs");
const wineRouter = require("./routes/wines");
const googlePlacesRouter = require("./routes/google-places");
// const morgan = require("morgan");
const CriticModel = require("./models/critic");

// anything with app.use is middlware
app.use(cors());
app.use(express.json());
// app.use(morgan());

// Routes go here
app.use("/test-jwt", testJWTRouter);
app.use("/auth", authRouter);

app.use("/profiles", profileRouter);
app.use("/blogs", blogRouter);
app.use("/wines", wineRouter);
app.use("/google", googlePlacesRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// const logUniqueGrapeValues = (wines) => {
//   const uniqueGrapes = new Set();

//   wines.forEach(wine => {
//     uniqueGrapes.add(wine.winery);
//   });

//   console.log([...uniqueGrapes]);
// };

// logUniqueGrapeValues(wineData);
