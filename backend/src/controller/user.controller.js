import { findUser } from "../services/auth.service.js";
import { ApiError } from "../utils/Error.js";
import { Response } from "../utils/Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SMTP_USERNAME, SMTP_EMAIL } from "../config/envManager.js";
import { sendEmail } from "../utils/mailer.js";
import {
  createNewResetRecord,
  findOneAndResetRecord,
  findResetRecord,
} from "../services/user.service.js";
import {
  decrptUsingCypres,
  encrptUsingCypres,
} from "../helpers/cypresSetup.js";
import { sendForgetPasswordMail } from "../mail/forgetPasswordMail.js";

const requestSellerController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw new ApiError(401, "USER NOT FOUND");
  }

  const mailOptions = {
    from: `${SMTP_USERNAME} <${SMTP_EMAIL}>`,
    to: email,
    subject: "Request to be seller",
    template: "requestSeller",
    context: {
      data: "This is the data",
    },
  };
  await sendEmail(mailOptions);

  const successResponse = new Response({
    statusCode: 200,
    data: user,
    message: "Success",
  });
  successResponse.send(res); // Send the success response
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email, location } = req.body;
  console.log(location);
  const isExist = await findUser({
    email,
  });
  console.log(isExist);
  if (!isExist) {
    throw new ApiError(404, "User doesn't Exist");
  }

  const data = await findOneAndResetRecord({ userId: isExist?._id });

  const createNewRecord = await createNewResetRecord({
    userId: isExist?._id,
    location,
  });

  if (createNewRecord) {
    await sendForgetPasswordMail({
      username: isExist?.username,
      recordId: createNewRecord?._id,
      email: isExist?.email,
      location,
    });
    const response = new Response({
      statusCode: 200,
      message:
        "An email containing a password reset link has been sent to your inbox.",
    });
    response.send(res);
    return;
  }
  throw new ApiError(500, "Something went wrong");
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword, location, token } = req.body;

  // Check if token exists
  if (!token) {
    throw new ApiError(400, "Token is required for resetting the password.");
  }

  // Find the reset record associated with the token
  const tokenExist = await findResetRecord({
    _id: await decrptUsingCypres(String(token)),
  });

  // If reset record not found, throw error
  if (!tokenExist) {
    throw new ApiError(
      404,
      "Invalid or expired token. Please request a new password reset link."
    );
  }

  // Find user associated with the token
  const user = await findUser({ _id: tokenExist?.userId });

  // If user not found, throw error
  if (!user) {
    throw new ApiError(
      404,
      "User not found. Please contact support for assistance."
    );
  }

  // Update user's password
  user.password = password;
  await user.save();

  // Delete the reset record
  await findOneAndResetRecord({ _id: tokenExist._id });

  // Send success response
  const response = new Response({
    statusCode: 200,
    message: "Your password has been successfully changed.",
  });
  response.send(res);
});

export { forgetPassword, resetPassword, requestSellerController };
