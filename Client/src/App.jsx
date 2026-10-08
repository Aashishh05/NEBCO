import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/index.jsx";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}