import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ScrollToHash from "@/components/common/ScrollToHash";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import FormModals from "@/components/forms/FormModals";

const PublicLayout = () => {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <ScrollToHash />
      <main id="main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <FormModals />
    </div>
  );
};

export default PublicLayout;
