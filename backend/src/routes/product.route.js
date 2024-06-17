import express from "express";
import { containToken } from "../middlewares/containToken.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/add-product").post(containToken, isAdmin, (req, res) => {
  res.json({
    success: true,
  });
});

export { router as ProductRouter };
