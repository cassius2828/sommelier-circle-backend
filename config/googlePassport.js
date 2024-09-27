// config/passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          const randomPassword = crypto.randomBytes(8).toString("hex");
          // this will generate random trail after first name for unique username
          // user can change later
          const randomUsername =
            profile.displayName.split(" ")[0] +
            crypto.randomBytes(8).toString("hex");

          // create user
          user = await UserModel.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: randomUsername,
            displayedName: profile.displayName,
            profileImg: profile.photos[0].value,
            password: randomPassword,
          });
          //   save so we can use the user to access the email property and send the password
          await user.save();
          await sendPasswordEmail(user.email, randomUsername, randomPassword);
        } else if (user && !user.googleId) {
          // if user exists but does not have googleid yet then add it
          user.googleId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

///////////////////////////
// Send Password Email
///////////////////////////
async function sendPasswordEmail(email, username, password) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  //   mail options
  let mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Sommelier Circle | Your Account Password",
    text: `Welcome to our service! \nUsername: ${username}\nPassword: ${password}\n This will be used to sign in with username or email instead of an OAuth system (e.g Google). We encourage you to change your password after logging in.`,
  };
  await transporter.sendMail(mailOptions);
}

//////////////////////////////////////////////////////
// Serialize and deserialize user instances to and from the session
//////////////////////////////////////////////////////
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
