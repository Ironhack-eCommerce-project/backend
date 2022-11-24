import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDatabase from "./db/mongoDb.js";

dotenv.config();
connectDatabase();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.json(product);
});

export default app;
