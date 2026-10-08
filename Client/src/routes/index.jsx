import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

const LoginPage = lazy(() => import("@/pages/admin/LoginPage.jsx"));
const HomePage = lazy(() => import("@/pages/public/Home.jsx"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout.jsx"));
const PublicLayout = lazy(() => import("@/layouts/PublicLayout.jsx"));

const AppRoutes = () => {
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

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;