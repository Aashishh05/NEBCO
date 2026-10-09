import api from "./axios.js";

export const getProjects = async (params) => {
  const res = await api.get("/projects", { params });
  return res.data;
};

export const getFeaturedProjects = async (params) => {
  const res = await api.get("/projects/featured", { params });
  return res.data;
};

export const getProjectBySlug = async (slug) => {
  const res = await api.get(`/projects/${slug}`);
  return res.data;
};

export const getAdminProjects = async (params) => {
  const res = await api.get("/projects/admin/all", { params });
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
