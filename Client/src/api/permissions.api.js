import api from "./axios.js";

export const getPermissions = async () => {
  const res = await api.get("/permissions");
  return res.data;
};

export const getPermissionsByRole = async (roleId) => {
  const res = await api.get(`/permissions/role/${roleId}`);
  return res.data;
};

export const updatePermissions = async (roleId, data) => {
  const res = await api.put(`/permissions/role/${roleId}`, data);
  return res.data;
};
