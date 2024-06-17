import mongoose from "mongoose";

// Define the Task schema
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["in-progress", "done", "canceled", "backlog", "todo"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    label: { type: String, required: true },
  },
  { timestamps: true } // Set timestamps option to true
);

// Create the Task model
const Task = mongoose.model("Task", TaskSchema);

export { Task };
