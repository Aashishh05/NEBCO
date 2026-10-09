import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

const LoginPage = lazy(() => import("@/pages/admin/LoginPage.jsx"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard.jsx"));
const Projects = lazy(() => import("@/pages/admin/Projects.jsx"));
const Enquiries = lazy(() => import("@/pages/admin/Enquiries.jsx"));
const Appointments = lazy(() => import("@/pages/admin/Appointments.jsx"));
const Testimonials = lazy(() => import("@/pages/admin/Testimonials.jsx"));
const Team = lazy(() => import("@/pages/admin/Team.jsx"));
const Users = lazy(() => import("@/pages/admin/Users.jsx"));
const Roles = lazy(() => import("@/pages/admin/Roles.jsx"));
const AuditLogs = lazy(() => import("@/pages/admin/AuditLogs.jsx"));
const Settings = lazy(() => import("@/pages/admin/Settings.jsx"));

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
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="team" element={<Team />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
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
