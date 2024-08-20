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
const googlePlacesRouter = require("./routes/google-places");
// const morgan = require("morgan");
const CriticModel = require("./models/critic");

///////////////////////////
// Middleware
///////////////////////////
app.use(cors());
app.use(express.json());
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
app.use("/google", googlePlacesRouter);

///////////////////////////
// Run Server
///////////////////////////
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
// const UserModel = require('./models/user')
// async function addFieldsToExistingUsers() {
//   try {
//     await UserModel.updateMany(
//       {},
//       {
//         $set: {
       
         
//           googleId: '',
//         },
//       }
//     );
//     console.log('Updated all users with new fields.');
//   } catch (err) {
//     console.error('Error updating users:', err);
//   }
// }
// addFieldsToExistingUsers()