import express from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller.js";
import { validateData } from "../middlewares/validation.middlewares.js";
import { loginSchema, registerSchema } from "../schema/auth.schema.js";

const router = express.Router();

router
  .route("/register")
  .post(validateData(registerSchema), registerController);
router.route("/login").post(
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  validateData(loginSchema),
  loginController
);

export { router as AuthRouter };
