import api from "./axios.js";

export const getAuditLogs = async (params) => {
  const res = await api.get("/audit", { params });
  return res.data;
};
