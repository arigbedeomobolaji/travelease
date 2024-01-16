import { Schema, model, Types } from "mongoose";

const serviceSchema = new Schema({
  serviceName: { type: String, required: true },
  serviceLocation: {
    city: String,
    Country: String,
    State: String,
  },
  serviceExactLocation: {
    lat: String,
    long: String,
  },
  serviceDescription: { type: String, required: true },
  environs: [
    {
      icons: [String],
      title: String,
      evironsImage: String,
    },
  ],
  offers: [String],
  reviews: {
    type: Types.ObjectId,
    ref: "review",
  },
  serviceImages: [String],
  servicePolicies: [
    {
      title: String,
      description: [String],
    },
  ],
});

const Service = model("Service", serviceSchema);
export default Service;
