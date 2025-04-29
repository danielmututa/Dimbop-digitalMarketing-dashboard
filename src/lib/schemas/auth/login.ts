import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string(),
});


export const authLoginSchema =  z.object({
  success: z.boolean(),
  data: z.object({
    user: loginSchema,
    token: z.string(),
  })
});
export type AuthResponse = z.infer<typeof authLoginSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;