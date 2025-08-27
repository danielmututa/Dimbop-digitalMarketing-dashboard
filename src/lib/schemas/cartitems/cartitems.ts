// src/lib/schemas/cartitems/cartitems.ts
// import { z } from "zod";

// export const CartItemSchema = z.object({
//   id: z.number(),
//   user_id: z.number().nullable(),
//   product_id: z.number(),
//   quantity: z.number(),
//   price: z.string(), 
//   created_at: z.string().datetime(),
//   updated_at: z.string().datetime(),
// });

// export type CartItem = z.infer<typeof CartItemSchema>;

// // ✅ Add this:
// export interface UserCart {
//   userId: number;
//   cart: CartItem[];
// }




src/lib/schemas/cartitems/cartitems.ts
import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.number(),
  user_id: z.number().nullable(),
  product_id: z.number(),
  quantity: z.number(),
  price: z.string(), 
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  products: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    stock_quantity: z.number(),
    category_id: z.number(),
    image_url: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    discount_percentage: z.number(),
    views: z.number(),
    categories: z.object({
      id: z.number(),
      name: z.string()
    })
  }).optional()
});

export type CartItem = z.infer<typeof CartItemSchema>;

export interface UserCart {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  totalDiscount: number;
  grandTotal: number;
}


