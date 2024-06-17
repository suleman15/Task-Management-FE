import express from "express";
import { AuthRouter } from "./auth.route.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { UserRouter } from "./user.route.js";
import { ProductRouter } from "./product.route.js";

const router = express.Router();

router.use("/api/auth", AuthRouter);
router.use("/api/users", UserRouter);
router.use("/api/product", ProductRouter);

router.use("*", async (req, res) => {
  res.status(404).json({
    path: "Route doesn't found",
  });
});

router.use(errorHandler);

export default router;
