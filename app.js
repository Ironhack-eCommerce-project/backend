import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import fileUpload from "express-fileupload";
import connectDatabase from "./db/mongoDb.js";
import "./config/passport-setup.js";
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import seedRouter from "./routes/seed.routes.js";
import categoryRouter from "./routes/category.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import imageRouter from "./routes/image.routes.js";
import productRouter from "./routes/product.routes.js";
import { errorHandler, notFound } from "./middleware/errors.js";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

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
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/seed", seedRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/upload", uploadsRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/images", imageRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
