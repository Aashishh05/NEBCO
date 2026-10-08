import { z } from "zod";

export const updateContactSchema = z.object({
  company: z.string().max(100).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phones: z.array(z.string()).optional(),
  address: z.string().max(200).optional(),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
});