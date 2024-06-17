import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/envManager.js";
import { ApiError } from "../utils/Error.js";

export const generateJWT = async (payload) => {
  // Sign the JWT token
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  //Returning JWT token
  return token;
};

export const verifyJWT = async (token) => {
  try {
    console.log("TOKEN", token);
    const data = await jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    throw new ApiError(404, "Invalid JWT Token"); // Or a more specific error type
  }
};
