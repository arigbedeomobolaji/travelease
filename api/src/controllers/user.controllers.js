import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
export const createUser = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  const user = new User(data);
  const savedUser = await user.save();
  const token = await user.generateAuthToken();

  res.status(201).send({ user: savedUser, token });
});
