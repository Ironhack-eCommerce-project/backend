import dotenv from "dotenv";
import { Router } from "express";
import Category from "../models/Category.model.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

dotenv.config();
const router = Router();

cloudinary.config({
  cloud_name: "dq3uidf5r",
  app_key: "374469147562416",
  api_secret: "e45BygXLKPPsOaOrrsZr",

  // cloud_name: process.env.CLOUD_NAME,
  // app_key: process.env.CLOUD_API_KEY,
  // api_secret: process.env.CLOUD_API_SECRET,
});

router.post(
  "/",
  // isLoggedIn,
  // isAdmin,
  (req, res) => {
    console.log(req.files);
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const file = req.files.file;
      if (file.size > 1920 * 1920) {
        return res.status(400).json({ message: "Image size too large" });
      }

      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        return res.status(400).json({ message: "Incorrect file format." });
      }

      cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "eCommerce" },
        (err, image) => {
          console.log();
          console.log("** File Upload");
          res.json(image);
        }
      );

      res.json("TEST UPLOAD");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
