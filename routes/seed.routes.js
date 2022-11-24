import { Router } from "express";
import User from "../models/Users.model.js";
import users from "../data/users.js";
import Product from "../models/Products.model.js";
import products from "../data/products.js";
import asyncHandler from "express-async-handler";

const router = Router();

router.post(
  "/users",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const userSeed = await User.insertMany(users);
    res.send({ userSeed });
  })
);

router.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const productSeed = await Product.insertMany(products);
    res.send({ productSeed });
  })
);

export default router;
