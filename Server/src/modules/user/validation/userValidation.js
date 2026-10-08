import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().min(1),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.string().min(1).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Nothing to update",
  });
