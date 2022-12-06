export const isLoggedIn = (req, res, next) => {
  // req.user ? next() : res.redirect(process.env.CLIENT_ORIGIN);
  req.user ? next() : res.status(401).json({ message: "Not authorized" });
};
