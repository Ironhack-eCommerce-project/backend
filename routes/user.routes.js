import { Router } from "express";
import User from "../models/Users.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const router = Router();

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
      res.json(user);
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

export default router;
