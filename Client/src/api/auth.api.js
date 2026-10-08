import api from "./axios.js";

export const login = (credentials) => api.post("/auth/login", credentials);
export const logout = () => api.post("/auth/logout");
export const me = () => api.get("/auth/me");
export const changePassword = (data) => api.put("/auth/password", data);