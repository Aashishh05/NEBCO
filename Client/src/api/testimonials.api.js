import api from "./axios.js";

export const getTestimonials = async () => {
  const res = await api.get("/testimonials");
  return res.data;
};

export const getAdminTestimonials = async () => {
  const res = await api.get("/testimonials/admin/all");
  return res.data;
};

export const createTestimonial = async (data) => {
  const res = await api.post("/testimonials", data);
  return res.data;
};

export const updateTestimonial = async (id, data) => {
  const res = await api.put(`/testimonials/${id}`, data);
  return res.data;
};

export const deleteTestimonial = async (id) => {
  const res = await api.delete(`/testimonials/${id}`);
  return res.data;
};
