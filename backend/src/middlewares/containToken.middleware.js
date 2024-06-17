import { JWT_SECRET } from "../config/envManager.js";
import { ApiError } from "../utils/Error.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../helpers/generateJwt.js";
import { findUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const containToken = asyncHandler(async (req, res, next) => {
  // Check if authorization header exists
  if (!req.headers.authorization) {
    throw new ApiError(404, "Authorization Header Missing");
  }

  const authHeader = req.headers.authorization;

  // Check if authorization header has correct format
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new ApiError(404, "Invalid Authorization Header Format");
  }

  const token = parts[1];

  // Validate token presence
  if (!token) {
    throw new ApiError(404, "Token Not Found");
  }

  try {
    const tokenData = await verifyJWT(token);

    const user = await findUser({ _id: tokenData?.id });

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(404, error.message);
  }
});

export { containToken };
