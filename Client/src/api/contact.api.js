import api from "./axios.js";

export const getContact = async () => {
  const res = await api.get("/contact");
  return res.data;
};

export const updateContact = async (data) => {
  const res = await api.put("/contact", data);
  return res.data;
};
