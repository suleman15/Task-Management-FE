import { z } from "zod";

// Define the schemas
const usernameSchema = z.string().min(2, {
  message: "Username must be at least 2 characters.",
});

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." });

const passwordSchema = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*[\s-]).*$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and cannot contain spaces or hyphens.",
  });

const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the types using z.infer
type RegisterSchema = z.infer<typeof registerSchema>;
type LoginSchema = z.infer<typeof loginSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
type EmailSchema = z.infer<typeof emailSchema>;

// Export the schemas and types
export {
  registerSchema,
  loginSchema,
  emailSchema,
  resetPasswordSchema,
  RegisterSchema,
  LoginSchema,
  ResetPasswordSchema,
  EmailSchema,
};
