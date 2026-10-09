import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { toggleSidebar } from "@/store/slices/uiSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-white px-6">
      <button
        type="button"
        onClick={() => dispatch(toggleSidebar())}
        className="flex size-10 items-center justify-center text-ink min-[961px]:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="size-6" />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-ink">{user?.name}</div>
          <div className="text-xs uppercase tracking-wide text-muted-fg">
            {user?.role?.name}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex size-10 items-center justify-center border border-border text-ink transition-colors hover:bg-muted"
          aria-label="Log out"
        >
          <LogOut className="size-5" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
