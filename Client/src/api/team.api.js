import api from "./axios.js";

export const getTeam = async () => {
  const res = await api.get("/team");
  return res.data;
};

export const getAdminTeam = async () => {
  const res = await api.get("/team/admin/all");
  return res.data;
};

export const createMember = async (data) => {
  const res = await api.post("/team", data);
  return res.data;
};

export const updateMember = async (id, data) => {
  const res = await api.put(`/team/${id}`, data);
  return res.data;
};

export const deleteMember = async (id) => {
  const res = await api.delete(`/team/${id}`);
  return res.data;
};
