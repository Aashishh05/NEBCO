import api from "./axios.js";

export const getMedia = async (params) => {
  const res = await api.get("/media", { params });
  return res.data;
};

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/media", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMedia = async (id) => {
  const res = await api.delete(`/media/${id}`);
  return res.data;
};
