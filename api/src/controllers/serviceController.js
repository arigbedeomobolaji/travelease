import createHttpError from "http-errors";
import Service from "../models/serviceModel.js";

export const createService = async (req, res, next) => {
  try {
    const data = req.body;
    const newService = new Service(data);
    const service = await newService.save();

    if (!service) {
      throw createHttpError.InternalServerError("Error saving service.");
    }
    req.user.services = req.user.services.concat(service._id.toString());
    await req.user.save();
    res.status(201).json({ service, user: req.user });
  } catch (error) {
    next(error);
  }
};
