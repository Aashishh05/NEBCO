import api from "./axios.js";

export const getProjects = (params) => api.get("/projects", { params });
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`);
export const getFeaturedProjects = (params) => api.get("/projects/featured", { params });

export const getTeam = () => api.get("/team");
export const getTestimonials = () => api.get("/testimonials");
export const getContact = () => api.get("/contact");

export const sendEnquiry = (data) => api.post("/enquiries", data);
export const sendAppointment = (data) => api.post("/appointments", data);