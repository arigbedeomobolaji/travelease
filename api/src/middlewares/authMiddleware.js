import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import User from "../models/user.model.js";
const tokenSecret = keys.TOKEN_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization.replace("Bearer ", "").trim();
    if (!token) {
      throw createHttpError.Unauthorized("Please Authenticate");
    }
    const token = authToken.replace("Bearer ", "");
    const decoded = await jwt.verify(token, tokenSecret);
    if (!decoded) {
      throw createHttpError.Unauthorized("Please Authenticate.");
    }
    // search for user in the database
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    const userToken = req.headers.authorization.replace("Bearer ", "").trim();

    if (userToken) {
      const data = await jwt.verify(userToken, tokenSecret, {
        ignoreExpiration: true,
      });

      const user = await User.findById(data._id);
      const tokenId = user.tokens.findIndex(
        (token) => token.token === userToken
      );
      console.log(tokenId);
      if (user && tokenId > -1) {
        user.tokens.splice(tokenId, 1);
        await user.save();
        next(createHttpError.Unauthorized("Please Authenticate."));
      }
    } else {
      next(createHttpError.Unauthorized("Please Authenticate."));
    }
  }
};
