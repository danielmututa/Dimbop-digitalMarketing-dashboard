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
  image_url: z.string().url().optional(),
  author_id: z.number().int().positive().nullable(),
  blog_type_id: z.number().int().positive().nullable(),
  created_at: z.string().datetime(),
  hero_image: z.string().url().optional(),
  blog_image_one: z.string().url().optional(),
  blog_image_two: z.string().url().optional(),
  blog_image_three: z.string().url().optional(),
  author_avatar: z.string().url().optional(),
  epigraph: z.string().optional(),
  first_paragraph: z.string().optional(),
  second_paragraph: z.string().optional(),
  third_paragraph: z.string().optional(),
  fourth_paragraph: z.string().optional(),
  fifth_paragraph: z.string().optional(),
  annotation_image_one: z.string().url().optional(),
  annotation_image_two: z.string().url().optional(),
  annotation_image_three: z.string().url().optional(),
  annotation_image_four: z.string().url().optional(),
  annotation_image_five: z.string().url().optional(),
  point_one_title: z.string().optional(),
  point_one_description: z.string().optional(),
  point_two_title: z.string().optional(),
  point_two_description: z.string().optional(),
  point_three_title: z.string().optional(),
  point_three_description: z.string().optional(),
  point_four_title: z.string().optional(),
  point_four_description: z.string().optional(),
  point_five_title: z.string().optional(),
  point_five_description: z.string().optional(),
  categories: z.string(),
  more_blogs: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.string().optional(),
  meta_author: z.string().optional(),
  meta_og_title: z.string().optional(),
  meta_og_url: z.string().url().optional(),
  meta_og_image: z.string().url().optional(),
  meta_facebook_id: z.string().optional(),
  meta_site_name: z.string().optional(),
  meta_post_twitter: z.string().optional(),
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