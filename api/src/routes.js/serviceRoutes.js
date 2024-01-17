import { Router } from "express";
import { createService } from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const serviceRouter = Router();

serviceRouter.post("", authMiddleware, createService);

export default serviceRouter;
