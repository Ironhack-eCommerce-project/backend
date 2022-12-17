import User from "../models/User.model.js";

export const isLoggedIn = (req, res, next) => {
  // console.log("=============>", req.user);
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Please login first" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ user: user.email });
    console.log(user);
    if (user.isAdmin === true) {
      next();
    } else {
      return res.status(401).json({ message: "You don't have permission" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
