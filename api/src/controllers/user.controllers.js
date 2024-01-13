import createHttpError from "http-errors";
import User from "../models/user.model.js";
import { sendVerificationCode } from "../services/emailConfig.js";
export const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = new User(data);
    const savedUser = await user.save();
    if (savedUser) {
      await sendVerificationCode(savedUser.email);
      res
        .status(201)
        .send({ message: "user successfully saved to the database." });
    }

    // const token = await user.generateAuthToken();

    // res.status(201).send({ user: savedUser, token });
  } catch (error) {
    console.log({ name: error.name, message: error.message }, "here");
    if (error.name.toLowerCase().includes("mongo")) {
      if (error.message.toLowerCase().includes("dup")) {
        next(createHttpError.Unauthorized("Please select another email."));
      }
    }
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    console.log(user);
    if (user) {
      const token = await user.generateAuthToken();
      if (token) {
        res.status(200).send({ user, token });
      }
    }
  } catch (error) {
    next(createHttpError(error));
  }
};

export const currentUser = async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json({ user: req.user });
    } else {
      throw createHttpError.Unauthorized("Please Authenticate.");
    }
  } catch (error) {
    next(createHttpError.Unauthorized("Please Authenticate"));
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const code = req.query.code;
    //
  } catch (error) {}
};
