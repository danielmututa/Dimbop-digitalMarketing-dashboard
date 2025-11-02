import { z } from "zod";

const simplePasswordRegex = /^(?=.*\d).{6,}$/;
const flexiblePhoneRegex = /^(\+?263|0)?[1-9]\d{6,9}$/;

// ============================================
// CLIENT ADMIN (MERCHANT) REGISTRATION - GOOGLE ONLY
// ============================================
export const clientAdminRegisterSchema = z.object({
  merchantName: z.string().min(2, { message: 'Merchant name must be at least 2 characters' }).max(200),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string()
    .min(9, { message: 'Phone number too short' })
    .max(15, { message: 'Phone number too long' })
    .regex(flexiblePhoneRegex, {
      message: 'Please enter a valid phone number'
    }),
  physicalAddress: z.string().min(5, { message: 'Physical address is required' }),
  geoLocation: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }),
  authProvider: z.literal('google'),
  googleId: z.string().optional(),
  role: z.literal('client_admin')
});

export type ClientAdminRegisterInput = z.infer<typeof clientAdminRegisterSchema>;

// ============================================
// CLIENT (CUSTOMER) REGISTRATION
// ============================================
export const clientRegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string()
    .min(9, { message: 'Phone number too short' })
    .max(15, { message: 'Phone number too long' })
    .regex(flexiblePhoneRegex, {
      message: 'Please enter a valid phone number'
    }),
  authProvider: z.enum(['email', 'google', 'apple', 'facebook']),
  googleId: z.string().optional(),
  appleId: z.string().optional(),
  facebookId: z.string().optional(),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(simplePasswordRegex, {
      message: 'Password must contain at least 1 number'
    })
    .optional(),
  confirmPassword: z.string().optional(),
  role: z.literal('client')
}).refine(
  data => {
    if (data.authProvider === 'email') {
      return data.password && data.password.length >= 6;
    }
    return true;
  },
  {
    message: 'Password is required for email registration',
    path: ['password']
  }
).refine(
  data => {
    if (data.authProvider === 'email' && data.password && data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  },
  {
    message: "Passwords don't match",
    path: ['confirmPassword']
  }
);

export type ClientRegisterInput = z.infer<typeof clientRegisterSchema>;

// ============================================
// AUTH REGISTER RESPONSE
// ============================================
export const authRegisterSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      id: z.number(),
      username: z.string().optional(),
      name: z.string().optional(),
      merchant_name: z.string().optional(),
      email: z.string(),
      phone: z.string().nullable(),
      role: z.enum(['super_admin', 'digital_marketer_admin', 'client_admin', 'client'])
    }),
    token: z.string(),
  })
});

export type AuthRegisterResponse = z.infer<typeof authRegisterSchema>;













// import { z } from "zod";

// // SIMPLIFIED: Match the backend validation
// // Password: 6+ characters with at least 1 number
// const simplePasswordRegex = /^(?=.*\d).{6,}$/;

// // FLEXIBLE: Accept any reasonable Zimbabwean phone format
// const flexiblePhoneRegex = /^(\+?263|0)?[1-9]\d{6,9}$/;

// // ============================================
// // REGISTER SCHEMA (Simplified)
// // ============================================
// export const RegisterSchema = z.object({
//   username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(100),
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   phone: z.string()
//     .min(9, { message: "Phone number too short" })
//     .max(15, { message: "Phone number too long" })
//     .regex(flexiblePhoneRegex, {
//       message: "Please enter a valid Zimbabwean phone number"
//     }),
//   role: z.enum(['user', 'admin']),
//   password: z.string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .regex(simplePasswordRegex, {
//       message: "Password must contain at least 1 number"
//     }),
//   confirmPassword: z.string()
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"]
// });

// export type RegisterInput = z.infer<typeof RegisterSchema>;

// // ============================================
// // AUTH REGISTER RESPONSE SCHEMA
// // ============================================
// export const authRegisterSchema = z.object({
//   success: z.boolean(),
//   data: z.object({
//     user: z.object({
//       id: z.number(),
//       username: z.string(),
//       email: z.string(),
//       phone: z.string().nullable(),
//       role: z.enum(['user', 'admin'])
//     }),
//     token: z.string(),
//   })
// });

// export type AuthRegisterResponse = z.infer<typeof authRegisterSchema>;

// // ============================================
// // LOGIN SCHEMA (Simplified)
// // ============================================
// export const LoginSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   password: z.string().min(1, { message: "Password is required" })
// });

// export type LoginInput = z.infer<typeof LoginSchema>;

// // ============================================
// // CHANGE PASSWORD SCHEMA (Simplified)
// // ============================================
// export const ChangePasswordSchema = z.object({
//   currentPassword: z.string().min(1, { message: "Current password is required" }),
//   newPassword: z.string()
//     .min(6, { message: "New password must be at least 6 characters" })
//     .regex(simplePasswordRegex, {
//       message: "New password must contain at least 1 number"
//     }),
//   confirmNewPassword: z.string()
// }).refine(data => data.newPassword === data.confirmNewPassword, {
//   message: "Passwords don't match",
//   path: ["confirmNewPassword"]
// }).refine(data => data.currentPassword !== data.newPassword, {
//   message: "New password must be different from current password",
//   path: ["newPassword"]
// });

// export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

// // ============================================
// // FORGOT PASSWORD SCHEMA
// // ============================================
// export const ForgotPasswordSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" })
// });

// export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

// // ============================================
// // RESET PASSWORD SCHEMA (Simplified)
// // ============================================
// export const ResetPasswordSchema = z.object({
//   token: z.string(),
//   newPassword: z.string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .regex(simplePasswordRegex, {
//       message: "Password must contain at least 1 number"
//     }),
//   confirmNewPassword: z.string()
// }).refine(data => data.newPassword === data.confirmNewPassword, {
//   message: "Passwords don't match",
//   path: ["confirmNewPassword"]
// });

// export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;