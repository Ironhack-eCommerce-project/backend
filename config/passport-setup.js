// const passport = require("passport");
import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      // clientID:
      //   "785584103709-fb79lranm13k07h2jr4059vtm818r4t6.apps.googleusercontent.com",
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `http://localhost:5000/users/google/callback`,
      // scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // return done(null, profile);
      const email = profile._json.email;
      console.log(email);
      // Check if user exists in DB
      User.findOne({ email }).then((foundUser) => {
        if (foundUser) {
          console.log("user is: ", foundUser);
          done(null, foundUser);
        } else {
          new User({
            name: profile._json.name,
            email: profile._json.email,
            password: accessToken,
          })
            .save()
            .then((newUser) => {
              console.log("new user created: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
