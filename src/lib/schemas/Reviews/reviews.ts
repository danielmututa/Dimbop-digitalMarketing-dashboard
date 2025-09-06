// // import {z} from "zod";

// // export const reviewSchema = z.object({
// //     id: z.number(),
// //     user_id: z.number(),
// //     product_id: z.number(),
// //     rating: z.number(),
// //     comment: z.string(),
// //     created_at: z.string().optional(),

// // });

// // export type Review = z.infer<typeof reviewSchema>;




// import {z} from "zod";

// export const reviewSchema = z.object({
//   id: z.number(),
//   user_id: z.number(),
//   product_id: z.number(),
//   rating: z.number(),
//   comment: z.string(),
//   created_at: z.string(),
//   user: z.object({
//     id: z.number(),
//     name: z.string(),
//     email: z.string()
//   }).optional()
// });

// export type Review = z.infer<typeof reviewSchema>;






import { z } from "zod";

export const reviewSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  product_id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  created_at: z.string(),
  users: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string()
  }).optional(),
  likes_count: z.number().optional(),
  dislikes_count: z.number().optional(),
  comments_count: z.number().optional(),
  review_likes: z.array(z.object({
    id: z.number(),
    is_like: z.boolean(),
    users: z.object({
      id: z.number(),
      username: z.string()
    })
  })).optional(),
  review_comments: z.array(z.object({
    id: z.number(),
    comment: z.string(),
    created_at: z.string(),
    users: z.object({
      id: z.number(),
      username: z.string()
    })
  })).optional()
});

export const reviewLikeSchema = z.object({
  user_id: z.number(),
  is_like: z.boolean()
});

export const reviewCommentSchema = z.object({
  user_id: z.number().optional(),
  comment: z.string().min(1)
});

export const productViewSchema = z.object({
  user_id: z.number().optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional()
});

export type Review = z.infer<typeof reviewSchema>;
export type ReviewLike = z.infer<typeof reviewLikeSchema>;
export type ReviewComment = z.infer<typeof reviewCommentSchema>;
export type ProductView = z.infer<typeof productViewSchema>;