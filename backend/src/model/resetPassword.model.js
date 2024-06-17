import mongoose from "mongoose";
import { ADMIN, BUYER, SELLER } from "../constant/index.js";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const resetPasswordSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: {
        country: String,
        state: String,
        city: String,
        town: String,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const resetPasswordModel = model("password-reset", resetPasswordSchema);

export default resetPasswordModel;
