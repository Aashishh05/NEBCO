import { Router } from "express";
import {
  getMedia,
  uploadMedia,
  deleteMedia,
} from "../controller/mediaController.js";
import { upload } from "../../../middleware/uploadMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", checkPermission("media", "read"), getMedia);
router.post("/", checkPermission("media", "create"), upload, uploadMedia);
router.delete("/:id", checkPermission("media", "delete"), deleteMedia);

export default router;