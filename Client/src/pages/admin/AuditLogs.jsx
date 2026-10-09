import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Spinner from "@/components/loaders/Spinner";
import { getAuditLogs } from "@/api/audit.api.js";
import { formatDateTime } from "@/utils/formatDate";

const AuditLogs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs({ limit: 100 });
      setItems(res.data?.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <PageHeader title="Audit logs" description="Who changed what, and when.">
        <button
          type="button"
          onClick={load}
          className="inline-flex min-h-[42px] items-center gap-2 border border-border bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-muted"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </PageHeader>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
            <tr>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Action</th>
              <th className="px-4 py-3 font-semibold">Resource</th>
              <th className="px-4 py-3 font-semibold">IP</th>
              <th className="px-4 py-3 font-semibold">When</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center">
                  <Spinner className="size-6" />
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-fg">
                  No audit entries yet
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-ink">{item.userEmail || "—"}</td>
                <td className="px-4 py-3 font-semibold text-ink">{item.action}</td>
                <td className="px-4 py-3 text-muted-fg">
                  {item.resource}
                  {item.resourceId ? ` · ${item.resourceId}` : ""}
                </td>
                <td className="px-4 py-3 text-muted-fg">{item.ip}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-fg">
                  {formatDateTime(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
