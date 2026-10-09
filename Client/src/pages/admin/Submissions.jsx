import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Trash2, Inbox, CalendarClock } from "lucide-react";
import { getEnquiries, deleteEnquiry } from "@/api/enquiries.api.js";
import { getAppointments, deleteAppointment } from "@/api/appointments.api.js";
import { formatDateTime } from "@/utils/formatDate";
import StatusBadge from "@/components/common/StatusBadge";

const Submissions = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [enquiryRes, appointmentRes] = await Promise.all([
        getEnquiries({ limit: 100 }),
        getAppointments({ limit: 100 }),
      ]);
      setEnquiries(enquiryRes.data?.items || []);
      setAppointments(appointmentRes.data?.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const removeEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((items) => items.filter((item) => item._id !== id));
      toast.success("Enquiry deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const removeAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await deleteAppointment(id);
      setAppointments((items) => items.filter((item) => item._id !== id));
      toast.success("Appointment deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Submissions</h1>
          <p className="mt-1 text-sm text-muted-fg">
            Enquiries and call requests submitted from the website.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex min-h-[42px] items-center gap-2 border border-border bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-muted"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <p className="border border-border bg-white p-4 text-sm text-red">{error}</p>}

      {/* Enquiries */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Inbox className="size-5 text-red" />
          <h2 className="text-lg font-bold text-ink">Enquiries</h2>
          <span className="text-sm text-muted-fg">({enquiries.length})</span>
        </div>

        <div className="overflow-x-auto border border-border bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Received</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {!loading && enquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-fg">
                    No enquiries yet.
                  </td>
                </tr>
              )}
              {enquiries.map((item) => (
                <tr key={item._id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3 font-semibold text-ink">{item.name}</td>
                  <td className="px-4 py-3 text-muted-fg">
                    <div>{item.email}</div>
                    {item.location && <div>{item.location}</div>}
                    {item.phone && <div>{item.phone}</div>}
                  </td>
                  <td className="max-w-[320px] px-4 py-3 text-ink">{item.message}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-fg">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeEnquiry(item._id)}
                      className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-red"
                      aria-label="Delete enquiry"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Appointments */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarClock className="size-5 text-red" />
          <h2 className="text-lg font-bold text-ink">Call requests</h2>
          <span className="text-sm text-muted-fg">({appointments.length})</span>
        </div>

        <div className="overflow-x-auto border border-border bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
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
              {!loading && appointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-fg">
                    No call requests yet.
                  </td>
                </tr>
              )}
              {appointments.map((item) => (
                <tr key={item._id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3 font-semibold text-ink">{item.name}</td>
                  <td className="px-4 py-3 text-muted-fg">{item.email}</td>
                  <td className="px-4 py-3 text-ink">{item.preferredTime}</td>
                  <td className="max-w-[320px] px-4 py-3 text-ink">{item.message}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-fg">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeAppointment(item._id)}
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
      </section>
    </div>
  );
};

export default Submissions;
