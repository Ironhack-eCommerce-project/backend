export const isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect(process.env.CLIENT_ORIGIN);
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    res.redirect("/login");
  } else {
    next();
  }
};
