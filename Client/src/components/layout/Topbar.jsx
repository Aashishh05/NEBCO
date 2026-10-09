import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, ExternalLink, Bell } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { toggleSidebar } from "@/store/slices/uiSlice";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import useNotifications from "@/hooks/useNotifications";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const { count, items } = useNotifications();

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

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setBellOpen((value) => !value)}
            className="relative flex size-10 items-center justify-center text-ink transition-colors hover:text-red"
            aria-label={`Notifications${count ? ` (${count} new)` : ""}`}
          >
            <Bell className="size-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-red px-1 text-[11px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          {bellOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-[340px] border border-border bg-white shadow-[0_10px_40px_#43381b1f]">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-sm font-bold text-ink">Notifications</span>
                  <span className="text-xs text-muted-fg">{count} new</span>
                </div>

                {items.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-fg">
                    You're all caught up.
                  </p>
                ) : (
                  items.slice(0, 5).map((item) => (
                    <button
                      key={`${item.kind}-${item.id}`}
                      type="button"
                      onClick={() => {
                        setBellOpen(false);
                        navigate(item.to);
                      }}
                      className="block w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink">{item.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-red">
                          {item.kind}
                        </span>
                      </div>
                      <div className="mt-1 truncate text-xs text-muted-fg">{item.text}</div>
                    </button>
                  ))
                )}

                <button
                  type="button"
                  onClick={() => {
                    setBellOpen(false);
                    navigate("/admin/notifications");
                  }}
                  className="block w-full px-4 py-3 text-center text-sm font-semibold text-red transition-colors hover:bg-muted"
                >
                  View all notifications
                </button>
              </div>
            </>
          )}
        </div>

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

        <div className="hidden text-right min-[961px]:block">
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
