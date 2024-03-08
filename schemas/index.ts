import * as z from "zod";
import validator from "validator";
import { jobTypes, locationTypes } from "@/lib/job-types";

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
export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    phone: z.optional(
      z.string().refine(validator.isMobilePhone, {
        message: "Invalid phone number",
      })
    ),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data: any) => {
      if (!data || (data.password && !data.newPassword)) {
        return false;
      }

      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  );

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

const requiredString = z.string().min(2, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const createJobSchema = z.object({
  title: requiredString.max(100),
  type: requiredString.max(50),
  description: z.string().max(5000).optional(),
  salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
  locationType: requiredString,
  location: z.string().optional(),
});

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
