import ResourceManager from "@/components/admin/ResourceManager";
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/api/testimonials.api.js";

const Testimonials = () => (
  <ResourceManager
    title="Testimonials"
    description="Client quotes shown on the website."
    module="testimonials"
    listFn={async () => (await getAdminTestimonials()).data?.testimonials || []}
    createFn={createTestimonial}
    updateFn={updateTestimonial}
    deleteFn={deleteTestimonial}
    emptyText="No testimonials yet"
    fields={[
      { name: "client", label: "Client name", required: true, minLength: 2 },
      { name: "role", label: "Role / company" },
      { name: "rating", label: "Rating (1–5)", type: "number", defaultValue: 5 },
      { name: "quote", label: "Quote", type: "textarea", rows: 4, full: true, required: true, minLength: 10 },
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
