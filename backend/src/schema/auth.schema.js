import Joi from "joi";

const usernameSchema = Joi.string().min(2).messages({
  "string.min": "Username must be at least 2 characters.",
});

const emailSchema = Joi.string().email().messages({
  "string.email": "Please enter a valid email address.",
});

const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*[\\s-]).*$"))
  .messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and cannot contain spaces or hyphens.",
  });

const registerSchema = Joi.object({
  username: usernameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  role: Joi.string().valid("ADMIN", "SELLER", "BUYER"),
});

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

export { registerSchema, loginSchema, emailSchema };
