import { Router } from "express";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controller/roleController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createRoleSchema, updateRoleSchema } from "../validation/roleValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", checkPermission("roles", "read"), getRoles);
router.post("/", checkPermission("roles", "create"), validate(createRoleSchema), createRole);
router.put("/:id", checkPermission("roles", "update"), validate(updateRoleSchema), updateRole);
router.delete("/:id", checkPermission("roles", "delete"), deleteRole);

export default router;
