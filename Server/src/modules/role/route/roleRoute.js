import { Router } from "express";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controller/roleController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createRoleSchema, updateRoleSchema } from "../validation/roleValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", requirePermission("roles:read"), getRoles);
router.post("/", requirePermission("roles:create"), validate(createRoleSchema), createRole);
router.put("/:id", requirePermission("roles:update"), validate(updateRoleSchema), updateRole);
router.delete("/:id", requirePermission("roles:delete"), deleteRole);

export default router;
