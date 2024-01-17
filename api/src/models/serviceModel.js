import { Schema, model, Types } from "mongoose";

const serviceSchema = new Schema({
  servicePackage: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serviceLocation: {
    city: String,
    country: String,
    state: String,
  },
  serviceExactLocation: {
    lat: Number,
    long: Number,
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
