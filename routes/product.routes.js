import { Router } from "express";
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

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     console.log("PRODUCT ID:", req.params.id);
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).send({ message: "Product Not Found" });
//     }
//   })
// );

// // *** GETTING AN ERROR ON THIS ROUTE

router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

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
