import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Inbox } from "lucide-react";

const items = [
  { label: "Submissions", to: "/admin", module: "dashboard", action: "read", icon: Inbox, end: true },
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
