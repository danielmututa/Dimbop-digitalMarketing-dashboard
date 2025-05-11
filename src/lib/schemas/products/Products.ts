import { z } from "zod";
import { ReviewSchema } from "../feedback/feedback";
import { CartItemSchema } from "../cartitems/cartitems";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock_quantity: z.number(),
  category_id: z.number(), // Removed nullable() to enforce a valid category_id
  image_url: z.string().url(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  discount_percentage: z.number(),
  views: z.number(),
  // Removed category_name since it's not used in the backend response or form
  categories: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(), // Kept nullable to match backend response structure
  reviews: z.array(ReviewSchema),
  cart: z.array(CartItemSchema),
  order_items: z.array(z.any()),
});

export const ProductsSchema = z.array(ProductSchema);
export type ProductSM = z.infer<typeof ProductSchema>;
export type ProductsSM = z.infer<typeof ProductsSchema>;