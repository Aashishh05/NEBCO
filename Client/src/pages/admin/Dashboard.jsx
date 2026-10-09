import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, CalendarClock, FolderKanban, Quote } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import Spinner from "@/components/loaders/Spinner";
import { getEnquiries } from "@/api/enquiries.api.js";
import { getAppointments } from "@/api/appointments.api.js";
import { getAdminProjects } from "@/api/projects.api.js";
import { getAdminTestimonials } from "@/api/testimonials.api.js";
import { formatDateTime } from "@/utils/formatDate";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getEnquiries({ limit: 5 }),
      getAppointments({ limit: 100 }),
      getAdminProjects(),
      getAdminTestimonials(),
    ])
      .then(([enq, app, projects, testimonials]) => {
        setStats({
          enquiries: enq.data?.total ?? enq.data?.items?.length ?? 0,
          appointments: app.data?.total ?? app.data?.items?.length ?? 0,
          projects: projects.data?.total ?? projects.data?.items?.length ?? 0,
          testimonials: testimonials.data?.total ?? testimonials.data?.items?.length ?? 0,
        });
        setLatest(enq.data?.items || []);
      })
      .catch(() => setStats({ enquiries: 0, appointments: 0, projects: 0, testimonials: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Enquiries", value: stats?.enquiries, icon: Inbox },
    { label: "Call requests", value: stats?.appointments, icon: CalendarClock },
    { label: "Projects", value: stats?.projects, icon: FolderKanban },
    { label: "Testimonials", value: stats?.testimonials, icon: Quote },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="A quick view of what is coming in." />

      <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2">
        {cards.map((card) => (
          <div key={card.label} className="border border-border bg-white p-5">
            <card.icon className="size-5 text-red" />
            <div className="mt-3 text-3xl font-extrabold text-ink">
              {loading ? "—" : card.value}
            </div>
            <div className="text-sm text-muted-fg">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Latest enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm font-semibold text-red hover:underline">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Received</th>
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
              {!loading && latest.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-fg">
                    No enquiries yet
                  </td>
                </tr>
              )}
              {latest.map((item) => (
                <tr key={item._id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{item.name}</td>
                  <td className="px-4 py-3 text-muted-fg">{item.email}</td>
                  <td className="max-w-[320px] px-4 py-3 text-ink">{item.message}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-fg">
                    {formatDateTime(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
