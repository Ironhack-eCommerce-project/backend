import { response, Router } from "express";
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
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// ADD NEW PRODUCT
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

// DELETE PRODUCT
router.delete(
  "/:slug",
  asyncHandler(async (req, res, next) =>  {
    console.log("REQPARAMS: ", req.params);
    const productToDelete = await Product.findOneAndDelete({ slug: req.params.slug });
    console.log("PTD", productToDelete);
    res.send("Product deleted");
  })
)

export default router;
