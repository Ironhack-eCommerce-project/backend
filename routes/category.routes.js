import { Router } from "express";
import Category from "../models/Category.model.js";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

const router = Router();

// LIST CATEGORIES
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  })
);

// ADD NEW CATEGORY
router.post(
  "/",
  /* isLoggedIn,
  isAdmin, */
  asyncHandler(async (req, res) => {
    console.log("REQ.BODY: ", req.body);
    const newCategory = await Category.create({
      name: req.body.name,
      slug: req.body.slug,
      products: req.body.products,
    });
    res.send("Data sent");
  })
);

// EDIT CATEGORY
router.put(
  "/:slug",
  asyncHandler(async (req, res, next) => {
    // SAVE CHANGES IN CATEGORY
    console.log(req.body);
    const categoryToEdit = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: req.body.slug,
      }
    );

    res.send("Edited successfully");
  })
);

export default router;
