import { Router } from "express";
import Product from "../models/Product.model.js";
import asyncHandler from "express-async-handler";
import Category from "../models/Category.model.js";

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
    // SAVE PRODUCT W/O CATEGORY
    console.log("REQ.BODY: ", req.body);
    const newProduct = await Product.create({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
    });

    // UPDATE CATEGORY
    const foundCategory = await Category.findOneAndUpdate(
      { name: req.body.category },
      {
        $push: { products: newProduct._id },
      },
      { new: true }
    );

    // ADD CATEGORY ID TO PRODUCT
    console.log("FOUND CATEGORY", foundCategory);
    console.log("newProduct", newProduct);
    const addCategoryToProduct = await Product.findByIdAndUpdate(
      newProduct._id,
      { category: foundCategory._id },
      { new: true }
    );
    res.send("Data sent");
  })
);

// DELETE PRODUCT
router.delete(
  "/:slug",
  asyncHandler(async (req, res, next) => {

    // DELETE PRODUCT
    const productToDelete = await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    console.log("PTD", productToDelete);

    // REMOVE PRODUCT FROM CATEGORY
    const foundCategory = await Category.findByIdAndUpdate(
      productToDelete.category,
      {
        $pull: { products: productToDelete._id },
      }
    )
    res.send("Product deleted");
  })
);

//EDIT PRODUCT
router.put(
  "/:slug",
  asyncHandler(async (req, res, next) => {
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
