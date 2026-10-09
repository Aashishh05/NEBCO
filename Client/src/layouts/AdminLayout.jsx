import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { toggleSidebar } from "@/store/slices/uiSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const closeSidebar = () => dispatch(toggleSidebar());

  return (
    <div className="flex min-h-screen bg-muted">
      <div className="sticky top-0 hidden h-screen min-[961px]:block">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 min-[961px]:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeSidebar} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        </div>
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
