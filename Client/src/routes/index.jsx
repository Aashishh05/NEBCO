import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

const LoginPage = lazy(() => import("@/pages/admin/LoginPage.jsx"));
const SubmissionsPage = lazy(() => import("@/pages/admin/Submissions.jsx"));
const HomePage = lazy(() => import("@/pages/public/Home/index.jsx"));
const ConstructionPage = lazy(() => import("@/pages/public/Construction/Construction.jsx"));
const ConsultingPage = lazy(() => import("@/pages/public/Consulting/Consulting.jsx"));
const InvestmentsPage = lazy(() => import("@/pages/public/Investments/Investments.jsx"));
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
        >
          <Route index element={<SubmissionsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
