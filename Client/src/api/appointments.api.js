import api from "./axios.js";

export const sendAppointment = async (data) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

export const getAppointments = async (params) => {
  const res = await api.get("/appointments", { params });
  return res.data;
};

export const updateAppointment = async (id, data) => {
  const res = await api.put(`/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};
