import * as z from "zod";

// Login Schema for validating login input
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()), // Optional field for two-factor authentication code
});

// Settings Schema for Updating user info
export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});

// Reset Schema for validating email during password reset
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

// New Password Schema for validating new password during password reset
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

// Register Schema for validating user registration input
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters or more",
    })
    .max(50, {
      message: "Name must be less than 50 characters",
    }),
});
