import { Router } from "express";
import {
  createService,
  getNearbyServices,
  getService,
  getServiceByLocation,
} from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const serviceRouter = Router();

serviceRouter.post("", authMiddleware, createService);
serviceRouter.get("", getNearbyServices);
serviceRouter.get("/search", getServiceByLocation);
serviceRouter.get("/:serviceId", getService);

export default serviceRouter;
