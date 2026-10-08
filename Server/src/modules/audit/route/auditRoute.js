import { Router } from "express";
import { getAuditLogs } from "../controller/auditController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";

const router = Router();

router.get("/", authMiddleware, checkPermission("audit", "read"), getAuditLogs);

export default router;
