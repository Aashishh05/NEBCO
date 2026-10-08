import { Router } from "express";
import {
  getTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/testimonialController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from "../validation/testimonialValidation.js";

const router = Router();

router.get("/", cache("testimonials"), getTestimonials);

router.use(authMiddleware);

router.get("/admin/all", checkPermission("testimonials", "read"), getAdminTestimonials);
router.post("/", checkPermission("testimonials", "create"), validate(createTestimonialSchema), createTestimonial);
router.put("/:id", checkPermission("testimonials", "update"), validate(updateTestimonialSchema), updateTestimonial);
router.delete("/:id", checkPermission("testimonials", "delete"), deleteTestimonial);

export default router;