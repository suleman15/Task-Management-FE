import { createUser, findUser } from "../services/auth.service.js";
import { Response } from "../utils/Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateJWT } from "../helpers/generateJwt.js";
import { ApiError } from "../utils/Error.js";

// REGISTER CONTROLLER

export const registerController = asyncHandler(async (req, res) => {
  const existingUserByEmail = await findUser({ email: req.body.email });
  const existingUserByUsername = await findUser({
    username: req.body.username,
  });

  if (existingUserByEmail || existingUserByUsername) {
    throw new ApiError(404, "Email or username already exists");
  }

  const newUser = await createUser(req.body);

  const response = new Response({
    statusCode: 200,
    data: newUser?._doc,
    message: "User created successfully",
  });
  response.send(res);
});

// LOGIN CONTROLLER

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email });

  console.log(user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await user.comparePasswords(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Incorrect password");
  }
  console.log(user);
  const token = await generateJWT({ email: user.email, id: user._id });

  const response = new Response({
    statusCode: 200,
    data: { user, token },
    message: "Login successful",
  });
  response.send(res);
});
