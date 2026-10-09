import axios from "axios";

// Always call the API on this same origin:
//  - dev: Vite proxies /api to the local backend
//  - prod: vercel.json proxies /api to the deployed backend
// Same-origin keeps the auth cookie first-party (no cross-site/CORS issues).
const api = axios.create({
  baseURL: "/api",
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
