import { z } from "zod";

export const createTestimonialSchema = z.object({
  client: z.string().min(2).max(60),
  role: z.string().max(60).optional().default(""),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatar: z.string().max(500).optional().default(""),
});

export const updateTestimonialSchema = createTestimonialSchema
  .partial()
  .extend({
    order: z.number().int().min(0).optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Nothing to update" });