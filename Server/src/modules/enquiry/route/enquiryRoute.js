import { Router } from "express";
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  exportEnquiries,
} from "../controller/enquiryController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { formLimiter } from "../../../middleware/rateLimitMiddleware.js";
import { createEnquirySchema, updateEnquirySchema } from "../validation/enquiryValidation.js";

const router = Router();

// Public — anyone can send an enquiry.
router.post("/", formLimiter, validate(createEnquirySchema), submitEnquiry);

// Admin.
router.use(authMiddleware);

router.get("/export", checkPermission("enquiries", "read"), exportEnquiries);
router.get("/", checkPermission("enquiries", "read"), getEnquiries);
router.put("/:id", checkPermission("enquiries", "update"), validate(updateEnquirySchema), updateEnquiry);
router.delete("/:id", checkPermission("enquiries", "delete"), deleteEnquiry);

export default router;