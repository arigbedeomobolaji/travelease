import createHttpError from "http-errors";
export const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  if (!createHttpError.isHttpError(error)) {
    return res.status(502).json({ status: 502, message: error.message });
  }
  const status = error.status || 500;

  //   send back an easily understandable error message to the caller
  res.status(status).json({ status, message: error.message });
};
