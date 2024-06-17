import resetPasswordModel from "../model/resetPassword.model.js";

export const findResetRecord = async (query, projection = {}) => {
  const foundRecord = await resetPasswordModel.findOne(query, projection);
  return foundRecord;
};

export const findOneAndResetRecord = async (query) => {
  const foundRecord = await resetPasswordModel.findOneAndDelete(query);
  return foundRecord;
};
export const createNewResetRecord = async (query) => {
  const createdRecord = await resetPasswordModel.create(query);
  return createdRecord;
};
