export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (req, res, next) => {
  const statusCode = res.statutsCode === 200 ? 500 : res.statutsCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
