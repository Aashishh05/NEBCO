import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

const LoginPage = lazy(() => import("@/pages/admin/LoginPage.jsx"));
const HomePage = lazy(() => import("@/pages/public/Home.jsx"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout.jsx"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading…
        </div>
      }
    >
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}