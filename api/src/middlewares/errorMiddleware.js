import createHttpError from "http-errors";
export const errorMiddleware = (error, req, res) => {
  try {
    // Error handling middleware functionality

    if (!createHttpError.isHttpError(error)) {
      return res
        .status(502)
        .json({ status: 502, message: error.message ? error.message : error });
    }
    const status = error.status || 500;
    //   send back an easily understandable error message to the caller
    res
      .status(status)
      .json({ status, message: error.message ? error.message : error });
  } catch (error) {
    console.log(error);
  }
};
