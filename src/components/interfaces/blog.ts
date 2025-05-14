// src/lib/schemas/blogs/blog.ts
export interface BlogResponseSM {

  title: string;
  hero_image?: string;
  meta_author?: string;
  status: 'visible' | 'draft' | 'archived';
}

export interface BlogImage {
  
  image_url: string;
}

export interface BlogPostSM {
  title: string;
  description: string;
  content: string;
  image_url?: string;
  hero_image?: string;
  blog_image_one?: string;
  blog_image_two?: string;
  blog_image_three?: string;
  author_avatar?: string;
  epigraph?: string;
  first_paragraph?: string;
  second_paragraph?: string;
  third_paragraph?: string;
  fourth_paragraph?: string;
  fifth_paragraph?: string;
  annotation_image_one?: string;
  annotation_image_two?: string;
  annotation_image_three?: string;
  annotation_image_four?: string;
  annotation_image_five?: string;
  point_one_title?: string;
  point_one_description?: string;
  point_two_title?: string;
  point_two_description?: string;
  point_three_title?: string;
  point_three_description?: string;
  point_four_title?: string;
  point_four_description?: string;
  point_five_title?: string;
  point_five_description?: string;
  categories: string;
  more_blogs?: string;
  meta_description?: string;
  keywords?: string;
  meta_author?: string;
  meta_og_title?: string;
  meta_og_url?: string;
  meta_og_image?: string;
  meta_site_name?: string;
  meta_post_twitter?: string;
  status: 'visible' | 'draft' | 'archived';
  blog_images: { image_url: string }[];
}

export interface BlogResponseSM extends BlogPostSM {
  id: number;
  created_at: string;
}