import { Router } from "express";
import User from "../models/User.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import passport from "passport";
import dotenv from "dotenv";
import { isLoggedIn } from "../middleware/auth.js";

dotenv.config();
const saltRounds = 10;
const router = Router();

/// USER LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ message: "Please enter email and password." });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      // If the user is not found, send an error response
      res.status(401).json({ message: "User not found." });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (user && matchPassword) {
      const { _id, name, email, isAdmin, createdAt } = user;
      req.session.currentUser = user;
      // console.log("Session========>", req.session);
      res.json(user);
      return;
    }
    res.status(401).json({ message: "Invalid email or password" });
  })
);

// USER SIGNUP
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ message: "Please enter email, password" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Please enter a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json("User already exists");
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({ email, password: hashedPassword });

    if (createdUser) {
      const { _id, name, email, isAdmin } = createdUser;
      const user = { _id, email, isAdmin };
      req.session.currentUser = user;
      res.status(200).json({ user: user });
    } else {
      res.status(400).json("Invalid User Data");
    }
  })
);

// GOOGLE PASSPORT OAUTH2
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successufully Logged In",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(403).json({ message: "Not authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "Login failed" });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/users/login/success",
    successRedirect: process.env.CLIENT_ORIGIN + "/store",
    failureRedirect: "/users/login/failed",
  })
);

//USER LOGOUT
router.post("/logout", (req, res) => {
  // req.logout();
  req.session.destroy(() => {
    // if (error) next(error);
    res.clearCookie("connect.sid", { path: "/" });
    res.json({ message: "Successfully logged out!" });
  });
});

export default router;
