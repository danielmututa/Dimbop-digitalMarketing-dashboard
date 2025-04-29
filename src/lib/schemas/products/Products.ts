import { z } from "zod";

export const productSchema = z.object({
 
  name: z.string().max(255),
  description: z.string().optional(),
  price: z.number().min(0), 
  image_url: z.string().optional(),
  created_at: z.coerce.date().optional(), 
  updated_at: z.coerce.date().optional(),
  discount_percentage: z.number().optional().default(0),
  views: z.number().optional().default(0), 
  category_name: z.string().optional(), 
});


export type Product = z.infer<typeof productSchema>