import { z } from "zod";

// data is free-form block content validated on the client.
export const updatePageSchema = z.object({
  label: z.string().min(2).max(60).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
}).refine((value) => Object.keys(value).length > 0, {
  message: "Nothing to update",
});