import { useEffect, useState } from "react";
import { getEnquiries } from "@/api/enquiries.api.js";
import { getAppointments } from "@/api/appointments.api.js";

// Unread submissions = enquiries still "new" + call requests still "pending".
const useNotifications = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;

    Promise.all([getEnquiries({ limit: 100 }), getAppointments({ limit: 100 })])
      .then(([enquiryRes, appointmentRes]) => {
        if (!active) return;
        const enquiries = (enquiryRes.data?.items || []).filter(
          (item) => item.status === "new",
        );
        const appointments = (appointmentRes.data?.items || []).filter(
          (item) => item.status === "pending",
        );

        const merged = [
          ...enquiries.map((item) => ({
            id: item._id,
            kind: "Enquiry",
            title: item.name,
            text: item.message || item.email,
            at: item.createdAt,
            to: "/admin/enquiries",
          })),
          ...appointments.map((item) => ({
            id: item._id,
            kind: "Call request",
            title: item.name,
            text: item.preferredTime || item.email,
            at: item.createdAt,
            to: "/admin/appointments",
          })),
        ].sort((a, b) => new Date(b.at) - new Date(a.at));

        setItems(merged);
      })
      .catch(() => {
        if (active) setItems([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return { count: items.length, items };
};

export default useNotifications;
