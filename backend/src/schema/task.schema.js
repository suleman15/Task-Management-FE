import Joi from "joi";

// Define the Joi schema for a task
export const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  status: Joi.string()
    .valid("in-progress", "done", "canceled", "backlog", "todo")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only":
        "Status must be one of: in-progress, done, canceled, backlog, todo",
    }),
  priority: Joi.string().valid("high", "medium", "low").required().messages({
    "any.required": "Priority is required",
    "any.only": "Priority must be one of: high, medium, low",
  }),
  label: Joi.string()
    .valid("bug", "feature", "enhancement", "documentation")
    .required()
    .messages({
      "any.required": "Label is required",
      "any.only":
        "Label must be one of: bug, feature, enhancement, documentation",
    }),
});

// Define the Joi schema for updating a task
export const updateTaskSchema = Joi.object({
  title: Joi.string().optional().messages({
    "any.required": "Title is required",
  }),
  status: Joi.string()
    .valid("in-progress", "done", "canceled", "backlog", "todo")
    .optional()
    .messages({
      "any.required": "Status is required",
      "any.only":
        "Status must be one of: in-progress, done, canceled, backlog, todo",
    }),
  priority: Joi.string().valid("high", "medium", "low").optional().messages({
    "any.required": "Priority is required",
    "any.only": "Priority must be one of: high, medium, low",
  }),
  label: Joi.string().optional().messages({
    "any.required": "Label is required",
  }),
});

export const deleteTasksSchema = Joi.object({
  ids: Joi.array().items(Joi.string().required()).min(1).required(),
});
