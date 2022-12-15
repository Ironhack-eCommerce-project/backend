import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import fileUpload from "express-fileupload";
import connectDatabase from "./db/mongoDb.js";
import "./config/passport-setup.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import seedRouter from "./routes/seed.routes.js";
import categoryRouter from "./routes/category.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import { errorHandler, notFound } from "./middleware/errors.js";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const app = express();

dotenv.config();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/seed", seedRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/upload", uploadsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
