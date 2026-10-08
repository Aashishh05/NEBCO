import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ScrollToHash from "@/components/common/ScrollToHash";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToHash />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
