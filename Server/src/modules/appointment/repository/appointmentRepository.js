import Appointment from "../model/appointmentModel.js";

export const createAppointment = async (data) => {
  return await Appointment.create(data);
};

export const findAll = async (filter, skip, limit) => {
  return await Appointment.find(filter)
    .sort({ preferredDate: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("assignee", "name email")
    .populate("notes.author", "name");
};

export const countAll = async (filter) => {
  return await Appointment.countDocuments(filter);
};

export const findById = async (id) => {
  return await Appointment.findById(id)
    .populate("assignee", "name email")
    .populate("notes.author", "name");
};

export const saveAppointment = async (appointment) => {
  return await appointment.save();
};

export const removeAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};