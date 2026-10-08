import { Router } from "express";
import { getContact, updateContact } from "../controller/contactController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { updateContactSchema } from "../validation/contactValidation.js";

const router = Router();

// Public — the footer and the contact page.
router.get("/", cache("contact"), getContact);

// Admin — company contact details live under Settings.
router.use(authMiddleware);

router.put("/", checkPermission("settings", "update"), validate(updateContactSchema), updateContact);

export default router;