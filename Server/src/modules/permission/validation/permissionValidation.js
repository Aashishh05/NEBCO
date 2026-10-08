import { z } from "zod";
import MODULES from "../../../constants/modulesConstant.js";

const moduleKey = z
  .string()
  .refine((value) => MODULES.includes(value), { message: "Unknown module" });

const moduleSchema = z.object({
  read: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const updatePermissionSchema = z.object({
  modules: z.record(moduleKey, moduleSchema).refine(
    (modules) => Object.keys(modules).length > 0,
    { message: "At least one module is required" },
  ),
});
