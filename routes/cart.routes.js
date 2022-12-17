import { Router } from "express";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

const router = Router();

// LIST CATEGORIES
/* router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  })
); */


export default router;
