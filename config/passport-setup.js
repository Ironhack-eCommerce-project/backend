import passport from "passport";
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
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `/users/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email;

      // Check if user exists, if not registers a new user in DB
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        console.log("user exists: ", foundUser);
        done(null, foundUser);
      } else {
        const user = await new User({
          name: profile.displayName,
          email: profile._json.email,
          // password: accessToken,
        }).save();
        console.log("new user created: ", user);
        done(null, user);
      }
    }
  )
);
