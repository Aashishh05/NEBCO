import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as appointmentService from "../service/appointmentService.js";
import { record } from "../../audit/service/auditService.js";

export const submitAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.submit(req.body, req.ip);

  sendSuccess(res, { appointment }, "Appointment requested");
});

export const getAppointments = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await appointmentService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.update(req.params.id, {
    ...req.body,
    actorId: req.user.id,
  });

  await record(req, "appointment.update", "appointment", req.params.id);

  sendSuccess(res, { appointment }, "Appointment updated");
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  await appointmentService.remove(req.params.id);

  await record(req, "appointment.delete", "appointment", req.params.id);

  sendSuccess(res, null, "Appointment deleted");
});