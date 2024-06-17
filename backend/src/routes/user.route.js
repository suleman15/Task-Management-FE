import express from "express";
import { containToken } from "../middlewares/containToken.middleware.js";
import { Response } from "../utils/Response.js";
import { isBuyer } from "../middlewares/auth.middleware.js";
import {
  forgetPassword,
  requestSellerController,
  resetPassword,
} from "../controller/user.controller.js";

const router = express.Router();

router.route("/").post(containToken, (req, res) => {
  console.log(req.user);
  const response = new Response({
    statusCode: 500,
  });
  response.send(res);
});
router.route("/request-to-be-seller").post(
  containToken,
  (req, res) => {
    console.log(req?.user);
    const response = new Response({
      statusCode: 200,
      message:
        "An email containing a password reset link has been sent to your inbox.",
    });
    response.send(res);
  }
  // isBuyer,
  // requestSellerController
);

router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);

export { router as UserRouter };
