import { z } from "zod";

// User schema for the authentication response (matching your backend response)
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
});

// Authentication response schema (including the user object and token)
export const authResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: userSchema,
    token: z.string(),
  })
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Login Schema
// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().regex(/^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/, {
    message: 'Password must contain at least 2 numbers, 2 special characters, 2 uppercase, 2 lowercase letters, and be 8-15 characters long'
  }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"]
});

// Reset password schema
export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().regex(/^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/, {
    message: 'Password must contain at least 2 numbers, 2 special characters, 2 uppercase, 2 lowercase letters, and be 8-15 characters long'
  }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"]
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

