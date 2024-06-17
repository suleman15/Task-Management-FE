export const registerController = asyncHandler(async (req, res) => {});

// // LOGIN CONTROLLER

// export const loginController = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await findUser({ email });

//   console.log(user);

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const isPasswordMatch = await user.comparePasswords(password);

//   if (!isPasswordMatch) {
//     throw new ApiError(401, "Incorrect password");
//   }
//   console.log(user);
//   const token = await generateJWT({ email: user.email, id: user._id });

//   const response = new Response({
//     statusCode: 200,
//     data: { user, token },
//     message: "Login successful",
//   });
//   response.send(res);
// });
