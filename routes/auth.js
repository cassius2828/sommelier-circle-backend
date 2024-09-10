const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const passport = require("passport");
const userRouter = require("../controllers/auth");

router.post("/signup", upload.single("photo"), userRouter.signup);
router.post("/login", userRouter.login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  userRouter.getGoogleCallback
);
router.get("/token", userRouter.getTokenFromOAuthLogin);
module.exports = router;
