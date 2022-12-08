// const passport = require("passport");
import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      // clientID:
      //   "785584103709-fb79lranm13k07h2jr4059vtm818r4t6.apps.googleusercontent.com",
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `http://localhost:5000/users/google/callback`,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // return done(null, profile);
      // console.log(profile);

      //Creates new user on DB but still have to check if user exists in DB
      new User({
        name: profile._json.name,
        email: profile._json.email,
        password: accessToken,
      })
        .save()
        .then((newUser) => {
          console.log("new user: ", newUser);
        });
    }
  )
);
