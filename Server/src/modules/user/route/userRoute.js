import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createUserSchema, updateUserSchema } from "../validation/userValidation.js";

const router = Router();

router.use(authMiddleware);

router.get("/", checkPermission("users", "read"), getUsers);
router.post("/", checkPermission("users", "create"), validate(createUserSchema), createUser);
router.put("/:id", checkPermission("users", "update"), validate(updateUserSchema), updateUser);
router.delete("/:id", checkPermission("users", "delete"), deleteUser);

export default router;
