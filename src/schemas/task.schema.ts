import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

// Define the enums using Zod
const statusEnum = z.enum([
  "todo",
  "in-progress",
  "done",
  "canceled",
  "backlog",
]);
const labelEnum = z.enum(["bug", "feature", "enhancement", "documentation"]);
const priorityEnum = z.enum(["low", "medium", "high"]);

// Define the task schema using Zod
export const taskSchema = z.object({
  _id: z.string(),
  title: z.string().max(256).optional(),
  status: statusEnum.default("todo"),
  label: labelEnum.default("bug"),
  priority: priorityEnum.default("low"),
  createdAt: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()), // Assuming timestamps are in ISO string format
  updatedAt: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: statusEnum.default("todo"),
  label: labelEnum.default("bug"),
  priority: priorityEnum.default("low"),
});

// Infer TypeScript types from Zod schema
export type Task = z.infer<typeof taskSchema>;

export type NewTask = z.infer<typeof createTaskSchema>;

// Example of using the schema for validation
export const validateTask = (task: unknown) => {
  return taskSchema.parse(task);
};
