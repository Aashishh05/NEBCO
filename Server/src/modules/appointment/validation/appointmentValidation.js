import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

export const createAppointmentSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().or(z.literal("")),
  phone: z.string().max(30).optional().default(""),
  preferredDate: z.string().max(20).optional().default(""),
  preferredTime: z.string().max(180).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  // honeypot — real visitors never fill this
  website: z.string().optional().default(""),
});

export const updateAppointmentSchema = z
  .object({
    status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
    confirmedTime: z.string().max(20).optional(),
    assignee: objectId.nullable().optional(),
    note: z.string().min(1).max(1000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Nothing to update",
  });
