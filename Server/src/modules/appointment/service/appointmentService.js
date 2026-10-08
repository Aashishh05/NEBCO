import Appointment from "../model/appointmentModel.js";
import {
  createAppointment,
  findAll,
  countAll,
  findById,
  saveAppointment,
  removeAppointment,
} from "../repository/appointmentRepository.js";
import {
  sendEmail,
  confirmationEmail,
  notificationEmail,
} from "../../../utils/sendEmail.js";
import { ApiError } from "../../../utils/ApiError.js";

export const isBot = (data) => Boolean(data.website);

export const submit = async (data, ip) => {
  if (isBot(data)) return null;

  const { website, ...form } = data;
  const appointment = await createAppointment({ ...form, ip });

  await sendEmail({
    to: appointment.email,
    ...confirmationEmail(appointment.name, "appointment request"),
  });
  if (process.env.NOTIFY_EMAIL) {
    await sendEmail({
      to: process.env.NOTIFY_EMAIL,
      ...notificationEmail(appointment, "appointment request"),
    });
  }

  return appointment;
};

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.date) filter.preferredDate = query.date;
  if (query.search)
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];

  const [items, total] = await Promise.all([
    findAll(filter, (page - 1) * limit, limit),
    countAll(filter),
  ]);

  return { items, total, page, limit };
};

export const update = async (id, data) => {
  const appointment = await findById(id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (data.status !== undefined) appointment.status = data.status;
  if (data.confirmedTime !== undefined)
    appointment.confirmedTime = data.confirmedTime;
  if (data.assignee !== undefined) appointment.assignee = data.assignee || null;
  if (data.note && data.note.trim()) {
    appointment.notes.push({ author: data.actorId, text: data.note.trim() });
  }

  return await saveAppointment(appointment);
};

export const remove = async (id) => {
  const appointment = await findById(id);
  if (!appointment) throw new ApiError(404, "Appointment not found");

  await removeAppointment(id);
};
