import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./db/mongoDb.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import morgan from "morgan";

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

import seedRouter from "./routes/seed.routes.js";
app.use("/api/seed", seedRouter);

import productRouter from "./routes/product.routes.js";
app.use("/products", productRouter);

import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
