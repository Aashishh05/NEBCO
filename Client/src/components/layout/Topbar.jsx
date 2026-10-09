import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, ExternalLink } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { toggleSidebar } from "@/store/slices/uiSlice";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-white px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="flex size-10 items-center justify-center text-ink transition-colors hover:text-red"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-6" />
        </button>

        <Link
          to="/admin"
          className="hidden text-xl font-extrabold tracking-[-0.02em] text-ink min-[961px]:block"
        >
          Admin Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 border border-border px-3 text-sm font-semibold text-ink transition-colors hover:border-red hover:text-red"
        >
          <ExternalLink className="size-4" />
          <span className="max-[700px]:hidden">View site</span>
        </a>

        <div className="hidden h-8 w-px bg-border max-[700px]:hidden" />

        <div className="text-right">
          <div className="text-sm font-semibold text-ink">{user?.name}</div>
          <div className="text-xs uppercase tracking-wide text-muted-fg">
            {user?.role?.name}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="inline-flex h-10 items-center gap-2 border border-border px-3 text-sm font-semibold text-ink transition-colors hover:border-red hover:text-red"
        >
          <LogOut className="size-4" />
          <span className="max-[700px]:hidden">Log out</span>
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Log out?"
        message="You will be returned to the sign-in page."
        confirmLabel="Log out"
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default Topbar;
