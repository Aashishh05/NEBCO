import api from "./axios.js";

export const getHealth = async () => {
  const res = await api.get("/health");
  return res.data;
};
