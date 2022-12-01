import { Router } from "express";
import Product from "../models/Products.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
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

/* router.post('/', (req, res, next) => {
  console.log("REQ BODY: ", req.body);
  const { name, description, price, image, category, slug } = req.body;
  res.send("123")
   Product.create({ name, description, price, image, category, slug })
    .then(response => res.json(response))
    .catch(err => res.json(err));
}); */


export default router;
