import createHttpError from "http-errors";
import User from "../models/user.model.js";
export const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = new User(data);
    const savedUser = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: savedUser, token });
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
