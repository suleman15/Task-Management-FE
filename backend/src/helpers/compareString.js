import bcrypt from "bcrypt";

export const compareString = async (password, hashPassowrd) => {
  return await bcrypt.compare(password, hashPassowrd); // Compare the provided password with the hashed password
};

export const hashString = async (password) => {
  return await bcrypt.hash(password); // Compare the provided password with the hashed password
};
