// const passport = require("passport");
import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      // clientID:
      //   "785584103709-fb79lranm13k07h2jr4059vtm818r4t6.apps.googleusercontent.com",
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_ORIGIN}/google/callback`,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //Use profile info to check if  the user is registed in db
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
