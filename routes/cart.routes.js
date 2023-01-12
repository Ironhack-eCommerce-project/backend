import { Router } from "express";
import asyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

const router = Router();

// ADD PRODUCTS TO CART

router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("REQ BOD: ", req.body.addedProduct);
    const foundUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $push: { productsInCart: req.body.addedProduct } }
    );
    console.log(foundUser);
    res.send("Product added to cart");
  })
);

// LIST PRODUCTS IN CART
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.session.currentUser._id).populate(
      "productsInCart.product"
    );
    console.log(foundUser.productsInCart);
    const productsInCart = foundUser.productsInCart;
    res.json(productsInCart);
  })
);

export default router;
