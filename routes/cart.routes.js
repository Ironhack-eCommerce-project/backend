import { Router } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";

const router = Router();

// ADD PRODUCTS TO CART

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const foundUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $push: { productsInCart: { product: req.body.product } } }
    );
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
    const productsInCart = foundUser.productsInCart;
    res.json(productsInCart);
  })
);

//REMOVE PRODUCT FROM CART
router.post(
  "/:id",
  asyncHandler(async (req, res) => {   
    const foundUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $pull: { productsInCart: { _id: req.params.id } } }
    );
    res.send("Product added to cart");
  })
);

export default router;
