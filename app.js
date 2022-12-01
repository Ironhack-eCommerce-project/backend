import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./db/mongoDb.js";
import morgan from "morgan";

dotenv.config();
connectDatabase();

const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

import seedRouter from "./routes/seed.routes.js";
app.use("/api/seed", seedRouter);

import productRouter from "./routes/product.routes.js";
app.use("/products", productRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
