import express, { Router } from "express";
import { containToken } from "../middlewares/containToken.middleware.js";
import {
  taskSchema,
  updateTaskSchema,
  deleteTasksSchema,
} from "../schema/task.schema.js";
import {
  validate,
  validateData,
} from "../middlewares/validation.middlewares.js";
import {
  createTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  getTasksIdController,
  updateTaskController,
  updateTasksController2,
} from "../controller/task.controller.js";

const router = express.Router();

router
  .route("/")
  .post(containToken, validateData(taskSchema), createTaskController)
  .get(containToken, getTasksController)
  .delete(containToken, validateData(deleteTasksSchema), deleteTaskController);

router.route("/array-list").get(containToken, getTasksIdController);

router.route("/update").put(containToken, updateTasksController2);

router
  .route("/:id")
  .get(containToken, getTaskByIdController)
  .put(containToken, validateData(updateTaskSchema), updateTaskController);

export { router as TaskRouter };
