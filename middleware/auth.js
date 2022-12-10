export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Please login first" }).redirect("/login");
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You don't have permission" })
      .redirect("/");
  }
};
