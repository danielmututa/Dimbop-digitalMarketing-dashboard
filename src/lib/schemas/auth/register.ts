import { z } from "zod"; // Import the z form "zod"


// export const RegisterSchema = z.object({
//         username: z.string().min(3).max(100),
//         email: z.string().email(),
//         role: z.enum(['user', 'admin']),
//         password: z.string().regex(/^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/, {
//             message: 'Password must contain at least 2 numbers, 2 special characters, 2 uppercase, 2 lowercase letters, and be 8-15 characters long'
//         }),
//         confirmPassword: z.string()
//     }).refine(data => data.password === data.confirmPassword, {
//         message: "Passwords don't match",
//         path: ["confirmPassword"]
//     });


// export const authRegisterSchema =  z.object({
//   success: z.boolean(),
//   data: z.object({
//     user: RegisterSchema,
//     token: z.string(),
//   })
// });
// export type AuthRegisterResponse = z.infer<typeof authRegisterSchema>;

// export type  RegisterSchema  = z.infer<typeof RegisterSchema>;





// import { z } from "zod";

// export const RegisterSchema = z.object({
//   username: z.string().min(3).max(100),
//   email: z.string().email(),
//   role: z.enum(['user', 'admin']),
//   password: z.string().regex(
//     /^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/,
//     { message: 'Password must be strong' }
//   ),
//   confirmPassword: z.string()
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"]
// });

// export const RegisterInputSchema = RegisterSchema.omit({ confirmPassword: true });
// export type RegisterInput = z.infer<typeof RegisterInputSchema>;




// // s
// export const authRegisterSchema =  z.object({
//   success: z.boolean(),
//   data: z.object({
//     user: RegisterSchema, // You may also want to omit confirmPassword here if unnecessary
//     token: z.string(),
//   })
// });
// export type AuthRegisterResponse = z.infer<typeof authRegisterSchema>;











// import { z } from "zod";

// Full schema with confirmPassword
export const RegisterSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  password: z.string().regex(
    /^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/,
    { message: 'Password must be strong' }
  ),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});




export type RegisterInput = z.infer<typeof RegisterSchema>;

// ✅ Separate schema just for API input (no confirmPassword)
// export const RegisterInputSchema = z.object({
//   username: z.string().min(3).max(100),
//   email: z.string().email(),
//   role: z.enum(['user', 'admin']),
//   password: z.string().regex(
//     /^(?=(.*\d){2,})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2,})(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,}).{8,15}$/,
//     { message: 'Password must be strong' }
//   )
// });

// export type RegisterInput = z.infer<typeof RegisterInputSchema>;



 
export const authRegisterSchema =  z.object({
  success: z.boolean(),
  data: z.object({
    user: RegisterSchema, // You may also want to omit confirmPassword here if unnecessary
    token: z.string(),
  })
});
export type AuthRegisterResponse = z.infer<typeof authRegisterSchema>;
