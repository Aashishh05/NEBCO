import { Router } from "express";
import {
  submitAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controller/appointmentController.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { formLimiter } from "../../../middleware/rateLimitMiddleware.js";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../validation/appointmentValidation.js";

const router = Router();

// Public — anyone can request an appointment.
router.post("/", formLimiter, validate(createAppointmentSchema), submitAppointment);

// Admin.
router.use(authMiddleware);

router.get("/", checkPermission("appointments", "read"), getAppointments);
router.put("/:id", checkPermission("appointments", "update"), validate(updateAppointmentSchema), updateAppointment);
router.delete("/:id", checkPermission("appointments", "delete"), deleteAppointment);

export default router;