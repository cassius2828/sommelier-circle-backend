const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const testJWTRouter = require('./routes/test-jwt')
const userRouter = require('./routes/users')
const profileRouter = require('./routes/profiles')

// anything with app.use is middlware
app.use(cors())
app.use(express.json());

// Routes go here
app.use('/test-jwt', testJWTRouter)
app.use('/users', userRouter)


app.use('/profiles', profileRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});