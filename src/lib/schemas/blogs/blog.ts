import { z } from 'zod';

// Blog Image Schema
export const BlogImageSchema = z.object({
  id: z.number().int().positive(),
  blog_id: z.number().int().positive(),
  image_url: z.string().url(),
});

export type BlogImageSM = z.infer<typeof BlogImageSchema>;

// Meta Schema
export const MetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
});

export type MetaSM = z.infer<typeof MetaSchema>;

// Blog Post Schema
export const BlogPostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  image_url: z.string().url(),
  author_id: z.number().int().positive().nullable(),
  blog_type_id: z.number().int().positive().nullable(),
  created_at: z.string().datetime(),
  hero_image: z.string().url(),
  blog_image_one: z.string().url(),
  blog_image_two: z.string().url(),
  blog_image_three: z.string().url(),
  author_avatar: z.string().url(),
  epigraph: z.string(),
  first_paragraph: z.string(),
  second_paragraph: z.string(),
  third_paragraph: z.string(),
  fourth_paragraph: z.string(),
  fifth_paragraph: z.string(),
  annotation_image_one: z.string().url(),
  annotation_image_two: z.string().url(),
  annotation_image_three: z.string().url(),
  annotation_image_four: z.string().url(),
  annotation_image_five: z.string().url(),
  point_one_title: z.string(),
  point_one_description: z.string(),
  point_two_title: z.string(),
  point_two_description: z.string(),
  point_three_title: z.string(),
  point_three_description: z.string(),
  point_four_title: z.string(),
  point_four_description: z.string(),
  point_five_title: z.string(),
  point_five_description: z.string(),
  categories: z.string(),
  more_blogs: z.string(),
  meta_description: z.string(),
  keywords: z.string(),
  meta_author: z.string(),
  meta_og_title: z.string(),
  meta_og_url: z.string().url(),
  meta_og_image: z.string().url(),
  meta_facebook_id: z.string(),
  meta_site_name: z.string(),
  meta_post_twitter: z.string(),
  status: z.enum(['visible', 'draft', 'archived']),
  blog_images: z.array(BlogImageSchema),
});

export type BlogPostSM = z.infer<typeof BlogPostSchema>;

// Full Response Schema
export const BlogResponseSchema = z.object({
  data: z.array(BlogPostSchema),
  meta: MetaSchema,
});

export type BlogResponseSM = z.infer<typeof BlogResponseSchema>;
