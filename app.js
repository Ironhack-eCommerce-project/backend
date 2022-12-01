import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./db/mongoDb.js";
import morgan from "morgan";
import cors from "cors";
import seedRouter from "./routes/seed.routes.js";
import productRouter from "./routes/product.routes.js";

dotenv.config();
connectDatabase();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(morgan("tiny"));
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);

export default app;
