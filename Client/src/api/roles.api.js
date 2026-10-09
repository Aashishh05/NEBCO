import api from "./axios.js";

export const getRoles = async (params) => {
  const res = await api.get("/roles", { params });
  return res.data;
};

export const createRole = async (data) => {
  const res = await api.post("/roles", data);
  return res.data;
};

export const updateRole = async (id, data) => {
  const res = await api.put(`/roles/${id}`, data);
  return res.data;
};

export const deleteRole = async (id) => {
  const res = await api.delete(`/roles/${id}`);
  return res.data;
};
