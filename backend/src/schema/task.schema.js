import { z } from "zod";

// Define the Zod schema for a task
export const taskSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  status: z.enum(["in-progress", "done", "canceled", "backlog", "todo"], {
    required_error: "Status is required",
  }),
  priority: z.enum(["high", "medium", "low"], {
    required_error: "Priority is required",
  }),
  label: z.string({ required_error: "Label is required" }),
});
