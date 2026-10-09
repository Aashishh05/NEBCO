import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { toggleSidebar } from "@/store/slices/uiSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const closeSidebar = () => dispatch(toggleSidebar());
  const handleNavigate = () => {
    if (window.innerWidth <= 960) dispatch(toggleSidebar());
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 min-[961px]:hidden"
            onClick={closeSidebar}
          />
          <div className="fixed inset-y-0 left-0 z-50 h-screen min-[961px]:sticky min-[961px]:top-0 min-[961px]:z-auto min-[961px]:h-screen min-[961px]:shrink-0">
            <Sidebar onNavigate={handleNavigate} />
          </div>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6 max-[700px]:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
