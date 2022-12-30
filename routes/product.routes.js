import { response, Router } from "express";
import Product from "../models/Product.model.js";
import asyncHandler from "express-async-handler";
import Category from "../models/Category.model.js";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

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
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);

// ADD NEW PRODUCT
router.post(
  "/",
  // isLoggedIn,
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

    const foundCategory = await Category.findOneAndUpdate(
      { name: req.body.category },
      {
        $push: { products: newProduct._id },
      },
      { new: true }
    );
    res.json("Data sent");
  })
);

// DELETE PRODUCT
router.delete(
  "/:slug",
  // isLoggedIn,
  // isAdmin,
  asyncHandler(async (req, res, next) => {
    await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json("Product deleted");
  })
);

//EDIT PRODUCT
router.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  asyncHandler(async (req, res, next) => {
    console.log("REQPARA", req.params);
    console.log("INITIAL REQBODY", req.body);

    //REMOVE PRODUCT FROM EARLIER CATEGORY
    const removeFromCategory = await Category.findOneAndUpdate(
      { products: req.body._id },
      {
        $pull: { products: req.body._id },
      },
      { new: true }
    );

    // SAVE PRODUCT
    const productToEdit = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
      }
    );

    //SAVE TO NEW CATEGORY
    console.log("REQPASL", req.params.slug);
    console.log("PRODUCTTOEDIT", productToEdit);
    const saveToCategory = await Category.findOneAndUpdate(
      { name: req.body.category },
      {
        $push: { products: productToEdit._id },
      },
      { new: true }
    );

    res.send("Edited successfully");
  })
);

export default router;
