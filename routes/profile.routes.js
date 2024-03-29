import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.js";

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
  res.json("You are logged in, this is your profile - " + req.user.name);
});

export default router;
