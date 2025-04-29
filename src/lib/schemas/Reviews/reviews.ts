import {z} from "zod";

export const reviewSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    product_id: z.number(),
    rating: z.number(),
    comment: z.string(),
    created_at: z.string().optional(),

});

export type Review = z.infer<typeof reviewSchema>;