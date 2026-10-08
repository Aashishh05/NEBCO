import api from "./axios.js";

export const sendEnquiry = async (data) => {
  const res = await api.post("/enquiries", data);
  return res.data;
};

export const getEnquiries = async (params) => {
  const res = await api.get("/enquiries", { params });
  return res.data;
};

export const updateEnquiry = async (id, data) => {
  const res = await api.put(`/enquiries/${id}`, data);
  return res.data;
};

export const deleteEnquiry = async (id) => {
  const res = await api.delete(`/enquiries/${id}`);
  return res.data;
};

export const exportEnquiries = async () => {
  const res = await api.get("/enquiries/export", { responseType: "blob" });
  return res.data;
};
