import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./db/mongoDb.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import seedRouter from "./routes/seed.routes.js";
import { errorHandler, notFound } from "./middleware/errors.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/seed", seedRouter);

app.use("/products", productRouter);

app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
