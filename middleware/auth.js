import User from "../models/User.model.js";

export const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ message: "Please login first" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.session.currentUser.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "You don't have permission" });
  }
};

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ user: user.email });
//     console.log(user);
//     if (user.isAdmin) {
//       next();
//     } else {
//       return res.status(401).json({ message: "You don't have permission" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
