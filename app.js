import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
