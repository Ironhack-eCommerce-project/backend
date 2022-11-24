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

import seedRouter from "./routes/seed.routes.js";
app.use("/api/seed", seedRouter);

export default app;
