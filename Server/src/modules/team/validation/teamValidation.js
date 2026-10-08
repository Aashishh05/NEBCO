import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(2).max(60),
  position: z.string().max(60).optional().default(""),
  bio: z.string().max(1000).optional().default(""),
  photo: z.string().max(500).optional().default(""),
  socials: z
    .object({
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      x: z.string().optional(),
      instagram: z.string().optional(),
    })
    .optional(),
});

export const updateMemberSchema = createMemberSchema
  .partial()
  .extend({
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Nothing to update" });