import { Router } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import Permission from "../model/permissionModel.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/permissionMiddleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requirePermission("roles:read"),
  asyncHandler(async (req, res) => {
    const permissions = await Permission.find().sort({ module: 1, key: 1 });

    sendSuccess(res, { permissions });
  }),
);

export default router;
