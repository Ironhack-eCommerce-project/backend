import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";
import { Router } from "express";
import Category from "../models/Category.model.js";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

const router = Router();

const removeTmpFile = (path) => {
  fs.remove(path, (err) => {
    if (err) throw err;
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post(
  "/",
  // isLoggedIn,
  // isAdmin,
  (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const file = req.files.file;
      if (file.size > 1920 * 1920) {
        removeTmpFile(file.tempFilePath);
        return res.status(400).json({ message: "Image size too large" });
      }

      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmpFile(file.tempFilePath);

        return res.status(400).json({ message: "Incorrect file format." });
      }

      cloudinary.uploader.upload(file.tempFilePath, { folder: "eCommerce" }, (err, result) => {
        if (err) throw err;

        removeTmpFile(file.tempFilePath);

        res.json({ public_id: result.public_id, secure_url: result.secure_url });
        console.log();
        console.log("**** File successfully uploaded!! ***");
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export default router;
