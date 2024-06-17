import userModel from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUser = async (data) => {
  const createdUser = await userModel.create(data);
  return createdUser;
};

export const findUser = async (query, projection = {}) => {
  const foundUser = await userModel.findOne(query, projection);
  return foundUser;
};
