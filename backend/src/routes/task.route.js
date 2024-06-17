// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJlbWFpbCI6Il90ZXN0aW5nQGdtYWlsLmNvbSIsImlkIjoiNjY3MDYxNjVmZWM5OGVlZmZiODgxNGVhIiwiaWF0IjoxNzE4NjQxMTE2LCJleHAiOjE3MTg4MjExMTZ9
//   .UCrQiUQN6IoTRay024Z4T_v5SLOFUmdRvUkZZDXoCdc;
import express from "express";
import { Response } from "../utils/Response.js";
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
  .get(getTasksController);

router
  .route("/:id")
  .get(getTaskByIdController)
  .put(updateTaskController)
  .delete(deleteTaskController);

export { router as TaskRouter };
