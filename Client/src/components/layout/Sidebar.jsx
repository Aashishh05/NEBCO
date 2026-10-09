import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  CalendarClock,
  Quote,
  Users,
  Image,
  UserCog,
  Shield,
  ScrollText,
  Settings,
} from "lucide-react";

const items = [
  { label: "Dashboard", to: "/admin", module: "dashboard", action: "read", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/admin/projects", module: "projects", action: "read", icon: FolderKanban },
  { label: "Enquiries", to: "/admin/enquiries", module: "enquiries", action: "read", icon: Inbox },
  { label: "Appointments", to: "/admin/appointments", module: "appointments", action: "read", icon: CalendarClock },
  { label: "Testimonials", to: "/admin/testimonials", module: "testimonials", action: "read", icon: Quote },
  { label: "Team", to: "/admin/team", module: "team", action: "read", icon: Users },
  { label: "Media", to: "/admin/media", module: "media", action: "read", icon: Image },
  { label: "Users", to: "/admin/users", module: "users", action: "read", icon: UserCog },
  { label: "Roles", to: "/admin/roles", module: "roles", action: "read", icon: Shield },
  { label: "Audit logs", to: "/admin/audit", module: "audit", action: "read", icon: ScrollText },
  { label: "Settings", to: "/admin/settings", module: "settings", action: "read", icon: Settings },
];

const Sidebar = ({ onNavigate }) => {
  const permissions = useSelector((state) => state.auth.permissions);

  const visible = items.filter((item) => permissions?.[item.module]?.[item.action]);

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-20 items-center border-b border-border px-6">
        <img
          src="/images/nebco-logo.png"
          alt="NEBCO"
          className="h-12 w-auto max-w-[170px] object-contain"
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
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
    </aside>
  );
};

export default Sidebar;
