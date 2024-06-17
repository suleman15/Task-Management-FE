import express from "express";
import { containToken } from "../middlewares/containToken.middleware.js";
import { taskSchema } from "../schema/task.schema.js";
import { validate } from "../middlewares/validation.middlewares.js";
import {
  createTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController,
} from "../controller/task.controller.js";

const router = express.Router();

router
  .route("/")
  .post(containToken, validate(taskSchema), createTaskController)
  .get(containToken, getTasksController);

router
  .route("/:id")
  .get(containToken, getTaskByIdController)
  .put(containToken, updateTaskController)
  .delete(containToken, deleteTaskController);

export { router as TaskRouter };
