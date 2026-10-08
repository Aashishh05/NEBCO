import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "@/components/loaders/PageLoader";

// Must be logged in.
export default function ProtectedRoute({ children }) {
  const { user, status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === "idle" || status === "loading") return <PageLoader />;
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return children;
}