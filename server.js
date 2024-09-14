const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/googlePassport"); // Require the Passport config
const session = require("express-session");
const PORT = process.env.PORT || 3000;
///////////////////////////
// Connect to DB
///////////////////////////
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

///////////////////////////
// Routers
///////////////////////////
const testJWTRouter = require("./routes/test-jwt");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profiles");
const eventRouter = require("./routes/events");
const blogRouter = require("./routes/blogs");
const criticRouter = require("./routes/critics");
const wineRouter = require("./routes/wines");
const favRouter = require("./routes/favorites");
const googlePlacesRouter = require("./routes/google-places");
// const morgan = require("morgan");

///////////////////////////
// Google Passport
///////////////////////////
// Initialize session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////
// Middleware
///////////////////////////
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(morgan());

///////////////////////////
// Routes
///////////////////////////
app.use("/test-jwt", testJWTRouter);
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);
app.use("/events", eventRouter);
app.use("/blogs", blogRouter);
app.use("/critics", criticRouter);
app.use("/wines", wineRouter);
app.use("/favorites", favRouter);
app.use("/google", googlePlacesRouter);

///////////////////////////
// Run Server
///////////////////////////
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});