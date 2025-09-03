import { z } from 'zod';

// ---------------------------
// Search Result Schema
// ---------------------------
export const SearchResultSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['product', 'blog']),
  image_url: z.string().nullable().optional(),
  price: z.number().optional(),
  category: z.string().nullable().optional(),
  status: z.string().optional(),
  created_at: z.string(), // frontend usually gets ISO string
  updated_at: z.string().optional(),
  frontend_url: z.string().url(),
});

// ---------------------------
// Global Search Response Schema
// ---------------------------
export const GlobalSearchResponseSchema = z.object({
  results: z.array(SearchResultSchema),
  total: z.number().min(0),
  query: z.string(),
  categories: z.object({
    products: z.number().min(0),
    blogs: z.number().min(0),
  }),
  pagination: z.object({
    page: z.number().min(1),
    limit: z.number().min(1),
    totalPages: z.number().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// ---------------------------
// Search Suggestions Response Schema
// ---------------------------
export const SearchSuggestionsResponseSchema = z.object({
  suggestions: z.array(z.string()),
});

// ---------------------------
// Health Check Response Schema
// ---------------------------
export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  service: z.literal('search'),
  timestamp: z.string(),
  error: z.string().optional(),
});

// ---------------------------
// TypeScript types for convenience
// ---------------------------
export type SearchResult = z.infer<typeof SearchResultSchema>;
export type GlobalSearchResponse = z.infer<typeof GlobalSearchResponseSchema>;
export type SearchSuggestionsResponse = z.infer<typeof SearchSuggestionsResponseSchema>;
export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
