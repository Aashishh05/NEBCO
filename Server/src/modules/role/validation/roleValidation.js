import { z } from "zod";
import { permissionKeys } from "../../../constants/permissions.js";

const permissionList = permissionKeys();

export const createRoleSchema = z.object({
  name: z.string().min(2).max(50),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  description: z.string().max(200).optional().default(""),
  permissions: z.array(z.enum(permissionList)).default([]),
});

export const updateRoleSchema = z
  .object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(200).optional(),
    permissions: z.array(z.enum(permissionList)).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Nothing to update",
  });
