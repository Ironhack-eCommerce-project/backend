import { response, Router } from "express";
import Product from "../models/Products.model.js";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    console.log("PRODUCT ID:", req.params.slug);
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
      console.log("REQ.BODY: ", req.body);
      const newProduct = await Product.create({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
      });
      res.send("Data sent");
    
  })
);

export default router;
