import { Router } from "express";
import {
  getTeam,
  getAdminTeam,
  createMember,
  updateMember,
  deleteMember,
} from "../controller/teamController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createMemberSchema, updateMemberSchema } from "../validation/teamValidation.js";

const router = Router();

router.get("/", cache("team"), getTeam);

router.use(authMiddleware);

router.get("/admin/all", checkPermission("team", "read"), getAdminTeam);
router.post("/", checkPermission("team", "create"), validate(createMemberSchema), createMember);
router.put("/:id", checkPermission("team", "update"), validate(updateMemberSchema), updateMember);
router.delete("/:id", checkPermission("team", "delete"), deleteMember);

export default router;