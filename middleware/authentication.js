export const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect(process.env.CLIENT_ORIGIN);
};
