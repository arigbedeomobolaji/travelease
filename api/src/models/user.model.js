/* eslint-disable no-useless-catch */
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import keys from "../config/keys.js";
import { expiresIn } from "../utils/sharedVar.js";

const saltRounds = Number(keys.SALT_ROUNDS);
const tokenSecret = keys.TOKEN_SECRET;

function validation(value) {
  return validator.isEmail(value);
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      validate: [validation, "Must provide an Email"],
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
  } catch (error) {
    throw error;
  }
});

// Generate Auth token for user
userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    // Generate Auth token for user
    const token = await jwt.sign(
      {
        _id: user._id.toString(),
        email: user.email,
      },
      tokenSecret,
      { expiresIn }
    );

    // save the authtoken to db
    user.tokens = user.tokens.concat({ token });
    const savedToken = await user.save();
    if (!savedToken) {
      throw { error: { message: "error occurred try again" } };
    }
    return token;
  } catch (error) {
    return error;
  }
};

// FindByCredentials - find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne(email);
  if (!user) {
    throw "Please Authenticate.";
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw "Please authenticate.";
  }
  return user;
};

// findOrCreate
userSchema.statics.findOrCreate = async (email) => {
  try {
    // Check if an existing email is in the DB
    let user = await User.findOne({ email });
    if (user) {
      return user;
    }

    // Create a new user in the DB.
    user = await User.create({ email });
    return user;
  } catch (error) {
    return error;
  }
};

// Delete confidential fields
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = model("User", userSchema);

export default User;
