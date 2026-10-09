import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Trash2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import Spinner from "@/components/loaders/Spinner";
import { getAppointments, updateAppointment, deleteAppointment } from "@/api/appointments.api.js";
import { formatDateTime } from "@/utils/formatDate";
import { APPOINTMENT_STATUSES } from "@/utils/constants";

const Appointments = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setItems((await getAppointments({ limit: 100 })).data?.items || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load call requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    try {
      await updateAppointment(id, { status });
      setItems((current) =>
        current.map((item) => (item._id === id ? { ...item, status } : item)),
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this call request?")) return;
    try {
      await deleteAppointment(id);
      setItems((current) => current.filter((item) => item._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <PageHeader title="Call requests" description="Schedule-a-call requests from the website.">
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
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Preferred time</th>
              <th className="px-4 py-3 font-semibold">Message</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Received</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center">
                  <Spinner className="size-6" />
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-fg">
                  No call requests yet
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className="border-b border-border last:border-0 align-top">
                <td className="px-4 py-3 font-semibold text-ink">{item.name}</td>
                <td className="px-4 py-3 text-muted-fg">{item.email}</td>
                <td className="px-4 py-3 text-ink">{item.preferredTime}</td>
                <td className="max-w-[320px] px-4 py-3 text-ink">{item.message}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <StatusBadge status={item.status} />
                    <select
                      value={item.status}
                      onChange={(event) => setStatus(item._id, event.target.value)}
                      className="h-9 rounded-none border border-input bg-white px-2 text-xs outline-none focus-visible:border-ring"
                    >
                      {APPOINTMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-fg">
                  {formatDateTime(item.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => remove(item._id)}
                    className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-red"
                    aria-label="Delete appointment"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
