import { z } from "zod";

const cardSchema = z.object({
  anchor: z.string().optional().default(""),
  title: z.string().min(1),
  body: z.string().optional().default(""),
  items: z.array(z.string()).optional().default([]),
});

const mediaImage = z.object({
  publicId: z.string().optional().default(""),
  url: z.string().optional().default(""),
});

export const createServiceSchema = z.object({
  navLabel: z.string().min(1).max(30),
  name: z.string().min(1).max(60),
  slug: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  tagline: z.string().max(200).optional().default(""),
  intro: z.string().max(1000).optional().default(""),
  image: mediaImage.optional(),
  accentColor: z.string().max(20).optional().default("#b82026"),
  chips: z.array(z.string()).optional().default([]),
  scopeBullets: z.array(z.string()).optional().default([]),
  cta: z.string().max(60).optional().default(""),
  cards: z.array(cardSchema).optional().default([]),
});

export const updateServiceSchema = createServiceSchema
  .omit({ slug: true })
  .partial()
  .extend({
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Nothing to update" });