const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgon = require("morgan");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const testJWTRouter = require("./routes/test-jwt");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const morgan = require("morgan");

// anything with app.use is middlware
app.use(cors());
app.use(express.json());
app.use(morgan());

// Routes go here
app.use("/test-jwt", testJWTRouter);
app.use("/auth", authRouter);

app.use("/profiles", profileRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
