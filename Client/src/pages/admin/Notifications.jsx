import { useNavigate } from "react-router-dom";
import { Inbox, CalendarClock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import useNotifications from "@/hooks/useNotifications";
import { formatDateTime } from "@/utils/formatDate";

const kindIcon = (kind) => (kind === "Call request" ? CalendarClock : Inbox);

const Notifications = () => {
  const { items } = useNotifications();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="New enquiries and call requests that still need a reply."
      />

      {items.length === 0 ? (
        <p className="border border-border bg-white px-6 py-16 text-center text-muted-fg">
          You're all caught up. No new notifications.
        </p>
      ) : (
        <ul className="border border-border bg-white">
          {items.map((item) => {
            const Icon = kindIcon(item.kind);
            return (
              <li
                key={`${item.kind}-${item.id}`}
                className="border-b border-border last:border-0"
              >
                <button
                  type="button"
                  onClick={() => navigate(item.to)}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-muted"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center bg-[#f4f1ea] text-red">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink">{item.title}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wide text-red">
                        {item.kind}
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-sm text-muted-fg">
                      {item.text}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-fg">
                    {formatDateTime(item.at)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
