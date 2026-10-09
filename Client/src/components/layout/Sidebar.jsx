import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  CalendarClock,
  Quote,
  Users,
  UserCog,
  Shield,
  ScrollText,
  Settings,
  LogOut,
} from "lucide-react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { logout } from "@/store/slices/authSlice";

const items = [
  { label: "Dashboard", to: "/admin", module: "dashboard", action: "read", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/admin/projects", module: "projects", action: "read", icon: FolderKanban },
  { label: "Enquiries", to: "/admin/enquiries", module: "enquiries", action: "read", icon: Inbox },
  { label: "Call requests", to: "/admin/appointments", module: "appointments", action: "read", icon: CalendarClock },
  { label: "Testimonials", to: "/admin/testimonials", module: "testimonials", action: "read", icon: Quote },
  { label: "Team", to: "/admin/team", module: "team", action: "read", icon: Users },
  { label: "Users", to: "/admin/users", module: "users", action: "read", icon: UserCog },
  { label: "Roles", to: "/admin/roles", module: "roles", action: "read", icon: Shield },
  { label: "Audit logs", to: "/admin/audit", module: "audit", action: "read", icon: ScrollText },
  { label: "Settings", to: "/admin/settings", module: "settings", action: "read", icon: Settings },
];

const Sidebar = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.auth.permissions);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const visible = items.filter((item) => permissions?.[item.module]?.[item.action]);

  const handleLogout = async () => {
    await dispatch(logout());
    onNavigate?.();
    navigate("/admin/login");
  };

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-white">
      <div className="flex flex-col gap-2 border-b border-border px-6 py-4">
        <img
          src="/images/nebco-logo.png"
          alt="NEBCO"
          className="h-12 w-auto max-w-[170px] object-contain"
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-fg">
          Admin dashboard
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {visible.length === 0 && (
          <p className="px-6 py-4 text-sm text-muted-fg">No permissions assigned.</p>
        )}
        {visible.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-[15px] font-semibold transition-colors ${
                isActive ? "bg-muted text-red" : "text-ink hover:bg-muted"
              }`
            }
          >
            <item.icon className="size-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="flex w-full items-center gap-3 px-2 py-3 text-[15px] font-semibold text-ink transition-colors hover:text-red"
        >
          <LogOut className="size-5" />
          Log out
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
    </aside>
  );
};

export default Sidebar;
