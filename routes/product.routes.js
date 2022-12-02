import { Router } from "express";
import Product from "../models/Products.model.js";
import asyncHandler from "express-async-handler";

const router = Router();

// LIST PRODUCTS
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// GET PRODUCT BY SLUG
router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

// ADD NEW PRODUCT
router.post("/", async (req, res) => {
  try {
    console.log("This route is correct");
    console.log("REQ.BODY: ", req.body);
    res.send("Data sent");
  } catch (error) {
    console.log(error);
  }
});

export default router;
