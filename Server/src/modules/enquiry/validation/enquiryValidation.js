import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export const createEnquirySchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().or(z.literal("")),
  phone: z.string().max(30).optional().default(""),
  interest: z.string().max(60).optional().default(""),
  message: z.string().min(5).max(2000).optional().default(""),
  // honeypot — real visitors never fill this
  website: z.string().optional().default(""),
});

export const updateEnquirySchema = z
  .object({
    status: z.enum(["new", "contacted", "closed"]).optional(),
    assignee: objectId.nullable().optional(),
    note: z.string().min(1).max(1000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "Nothing to update" });