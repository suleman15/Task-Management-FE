import mongoose from "mongoose";
import { ADMIN, BUYER, SELLER } from "../constant/index.js";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role: {
  //   type: String,
  //   enum: [ADMIN, BUYER, SELLER],
  //   default: "BUYER",
  // },
});

// Schema transformation to exclude password before serialization
userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password; // Remove password from the returned object
    return ret;
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next(); // If password is not modified, move to the next middleware
    }

    const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password
    this.password = hashedPassword; // Replace the plain password with the hashed one
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePasswords = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

const userModel = model("User", userSchema);

export default userModel;
