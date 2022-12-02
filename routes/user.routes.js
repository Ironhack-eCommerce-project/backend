import { Router } from "express";
import User from "../models/Users.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const saltRounds = 10;

const router = Router();

/// USER LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
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
      res.json({ user });
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
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
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
      const user = { _id, email };
      res.status(200).json({ user: user });
    } else {
      res.status(400).json("Invalid User Data");
    }
  })
);

export default router;
