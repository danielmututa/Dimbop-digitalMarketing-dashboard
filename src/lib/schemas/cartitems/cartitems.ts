import {z} from "zod";

export const CartItemSchema = z.object({
    id: z.number(),
    user_id: z.number().nullable(),
    product_id: z.number(),
    quantity: z.number(),
    price: z.string(), // Change to number if needed
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  });

  export type CartItem = z.infer<typeof CartItemSchema>;