import { Task } from "../model/task.model.js";
import { Response } from "../utils/Response.js";
import { ApiError } from "../utils/Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTaskController = asyncHandler(async (req, res) => {
  const { title, status, priority, label, createdAt } = req.body;

  // Check if the task with the same title already exists
  const existingTask = await Task.findOne({ title });
  if (existingTask) {
    throw new ApiError(400, "Task with the same title already exists");
  }

  // Create a new task
  const newTask = await Task.create({
    title,
    status,
    priority,
    label,
    createdAt,
  });

  // Send response
  const response = new Response({
    statusCode: 201,
    data: newTask,
    message: "Task created successfully",
  });
  response.send(res);
});

export const getTasksController = asyncHandler(async (req, res) => {
  // Get all tasks
  const tasks = await Task.find();

  // Send response
  const response = new Response({
    statusCode: 200,
    data: tasks,
    message: "Tasks retrieved successfully",
  });
  response.send(res);
});

export const getTaskByIdController = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  // Find task by ID
  const task = await Task.findById(taskId);

  // Check if task exists
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // Send response
  const response = new Response({
    statusCode: 200,
    data: task,
    message: "Task retrieved successfully",
  });
  response.send(res);
});

export const updateTaskController = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;

  // Update task
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
  });

  // Check if task exists
  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  // Send response
  const response = new Response({
    statusCode: 200,
    data: updatedTask,
    message: "Task updated successfully",
  });
  response.send(res);
});

export const deleteTaskController = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  // Delete task
  const deletedTask = await Task.findByIdAndDelete(taskId);

  // Check if task exists
  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }

  // Send response
  const response = new Response({
    statusCode: 200,
    data: deletedTask,
    message: "Task deleted successfully",
  });
  response.send(res);
});
