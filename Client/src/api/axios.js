import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const path = window.location.pathname;
    const isLoginCall = err.config?.url?.includes("/auth/login");
    if (
      err.response?.status === 401 &&
      path.startsWith("/admin") &&
      path !== "/admin/login" &&
      !isLoginCall
    ) {
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  },
);

export default api;
