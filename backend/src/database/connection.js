import mongoose from "mongoose";
import { DATABASE_URI } from "../config/envManager.js";

const connectToDB = async () => {
  try {
    const connection = await mongoose
      .connect(DATABASE_URI)
      .then((res) => {
        console.log(`CONNECTED TO DATABASE 👐`);
      })
      .catch((err) =>
        console.log("ERROR WHILE CONNECTING TO DATABASE 🚨", err)
      );
  } catch (error) {
    console.log("database connection failed", error);
  }
};

export { connectToDB };
