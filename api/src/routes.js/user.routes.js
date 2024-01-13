import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
