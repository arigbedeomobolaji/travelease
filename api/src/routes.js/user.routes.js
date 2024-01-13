import { Router } from "express";
import {
  createUser,
  currentUser,
  loginUser,
  verifyUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("", createUser);
userRouter.post("/login", loginUser);
userRouter.get("", authMiddleware, currentUser);
userRouter.get("/verify", verifyUser);

export default userRouter;
