import { z } from "zod";

const CATEGORIES = ["residential", "commercial", "hospitality"];

export const createProjectSchema = z.object({
  title: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  category: z.enum(CATEGORIES),
  location: z.string().max(120).optional().default(""),
  year: z.string().max(20).optional().default(""),
  status: z.string().max(60).optional().default(""),
  link: z.string().max(500).optional().default(""),
  coverImage: z.string().max(500).optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
  summary: z.string().max(500).optional().default(""),
  description: z.string().max(5000).optional().default(""),
  featured: z.boolean().optional().default(false),
});

export const updateProjectSchema = createProjectSchema
  .omit({ slug: true })
  .partial()
  .extend({
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Nothing to update" });