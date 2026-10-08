import { Router } from "express";
import {
  getPermissions,
  getPermissionsByRole,
  updatePermissions,
} from "../controller/permissionController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { updatePermissionSchema } from "../validation/permissionValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", checkPermission("permissions", "read"), getPermissions);
router.get(
  "/role/:roleId",
  checkPermission("permissions", "read"),
  getPermissionsByRole,
);
router.put(
  "/role/:roleId",
  checkPermission("permissions", "update"),
  validate(updatePermissionSchema),
  updatePermissions,
);

export default router;
