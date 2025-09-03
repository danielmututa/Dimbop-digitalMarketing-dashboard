import { z } from "zod";

// ----------------------
// AI Query Schema
// ----------------------
export const aiQuerySchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(1000, "Query too long"),
  image_url: z.string().url().optional(),
  audio_url: z.string().url().optional(),
});

export type AIQueryType = z.infer<typeof aiQuerySchema>;

// ----------------------
// AI Response Schema
// ----------------------
export const aiResponseSchema = z.object({
  message: z.string(),
  report_type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  analysis_type: z.enum(["text", "image", "audio", "multimodal"]).optional(),
});

export type AIResponseType = z.infer<typeof aiResponseSchema>;

// ----------------------
// Report Request Schema
// ----------------------
export const reportRequestSchema = z.object({
  report_type: z.enum([
    "products", "product-sales", "inventory",
    "users", "user-activity", "customers",
    "blogs", "content", "articles",
    "sales", "revenue", "financial",
    "general", "overview"
  ]),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export type ReportRequestType = z.infer<typeof reportRequestSchema>;
