import CrudPage from "@/components/admin/CrudPage";
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/api/testimonials.api.js";

const Testimonials = () => (
  <CrudPage
    title="Testimonials"
    description="Client quotes shown on the website."
    module="testimonials"
    listFn={async () => (await getAdminTestimonials()).data?.testimonials || []}
    createFn={createTestimonial}
    updateFn={updateTestimonial}
    deleteFn={deleteTestimonial}
    emptyText="No testimonials yet"
    fields={[
      { name: "client", label: "Client name", required: true },
      { name: "role", label: "Role / company" },
      { name: "rating", label: "Rating (1–5)", type: "number", defaultValue: 5 },
      { name: "quote", label: "Quote", type: "textarea", rows: 4, full: true },
      { name: "avatar", label: "Avatar", type: "image" },
    ]}
    columns={[
      { key: "client", header: "Client" },
      { key: "role", header: "Role" },
      { key: "rating", header: "Rating" },
    ]}
  />
);

export default Testimonials;
