import { Router } from "express";
import { getPages, getPage, updatePage } from "../controller/pageController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { updatePageSchema } from "../validation/pageValidation.js";

const router = Router();

// Public — the home page reads these blocks, cached in Redis.
router.get("/", cache("pages"), getPages);
router.get("/:key", cache("pages"), getPage);

// Admin — one form per block.
router.use(authMiddleware);

router.put("/:key", checkPermission("pages", "update"), validate(updatePageSchema), updatePage);

export default router;