import { Schema, model } from "mongoose";
import validator from "validator";

const verificationSchema = new Schema({
  code: { type: Number, require: true },
  email: {
    type: String,
    required: true,
    validate: [(value) => validator.isEmail(value), "provide a valid Email."],
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 1000 * 60 * 30,
  },
});

const Verification = model("Verification", verificationSchema);

export default Verification;
