import { Schema, model } from "mongoose";
import validator from "validator";
import User from "./user.model.js";

const verificationSchema = new Schema({
  code: { type: Number, require: true, index: true },
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

verificationSchema.statics.findCodeAndVerify = async function (
  code,
  userEmail
) {
  // find code in db
  const codeExist = await Verification.findOne({ code });
  if (codeExist) {
    // checks if user owns the code and it hasn't expired
    const canContinue =
      codeExist.email === userEmail && codeExist.expiresAt > Date.now();
    if (!canContinue) {
      throw "Please regenerate code or authenticate";
    }
    const user = await User.findOne({ email: codeExist.email });
    await Verification.deleteOne({ code });
    return user;
  }
};

const Verification = model("Verification", verificationSchema);

export default Verification;
