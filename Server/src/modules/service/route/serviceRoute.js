import { Router } from "express";
import {
  getServices,
  getServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createServiceSchema, updateServiceSchema } from "../validation/serviceValidation.js";

const router = Router();

// Admin only — registered before the public routes so "/admin/all"
// is never captured by "/:slug".
router.get(
  "/admin/all",
  authMiddleware,
  checkPermission("services", "read"),
  getAdminServices,
);

// Public — visitors read here, results cached in Redis.
router.get("/", cache("services"), getServices);
router.get("/:slug", cache("services"), getServiceBySlug);

// Admin — everything below needs a logged in user.
router.use(authMiddleware);

router.post("/", checkPermission("services", "create"), validate(createServiceSchema), createService);
router.put("/:id", checkPermission("services", "update"), validate(updateServiceSchema), updateService);
router.delete("/:id", checkPermission("services", "delete"), deleteService);

export default router;