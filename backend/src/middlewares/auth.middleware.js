import { findUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Error.js";

const isBuyer = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "BUYER") throw new ApiError(401, "USER IS NOT A BUYER");
  next();
});

const isSeller = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "BUYER") throw new ApiError(401, "USER IS NOT A SELLER");
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN") throw new ApiError(401, "USER IS NOT A ADMIN");
  next();
});

export { isAdmin, isSeller, isBuyer };
