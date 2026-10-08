import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createUserSchema, updateUserSchema } from "../validation/userValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", requirePermission("users:read"), getUsers);
router.post("/", requirePermission("users:create"), validate(createUserSchema), createUser);
router.put("/:id", requirePermission("users:update"), validate(updateUserSchema), updateUser);
router.delete("/:id", requirePermission("users:delete"), deleteUser);

export default router;
