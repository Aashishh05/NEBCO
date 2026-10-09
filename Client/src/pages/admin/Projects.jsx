import ResourceManager from "@/components/admin/ResourceManager";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/api/projects.api.js";
import { PROJECT_CATEGORIES } from "@/utils/constants";

const Projects = () => (
  <ResourceManager
    title="Projects"
    description="Portfolio projects shown on the website."
    module="projects"
    listFn={async () => (await getAdminProjects()).data?.projects || []}
    createFn={createProject}
    updateFn={updateProject}
    deleteFn={deleteProject}
    emptyText="No projects yet"
    fields={[
      { name: "title", label: "Title", required: true, minLength: 1 },
      {
        name: "slug",
        label: "Slug",
        required: true,
        minLength: 1,
        placeholder: "lowercase-with-hyphens",
        pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        patternMessage: "Slug can only contain lowercase letters, numbers and hyphens",
      },
      { name: "category", label: "Category", type: "select", required: true, options: PROJECT_CATEGORIES },
      { name: "location", label: "Location" },
      { name: "year", label: "Year" },
      { name: "status", label: "Status" },
      { name: "link", label: "External link", full: true },
      { name: "summary", label: "Summary", type: "textarea", rows: 2, full: true },
      { name: "description", label: "Description", type: "textarea", rows: 4, full: true },
      { name: "image", label: "Cover image", type: "image" },
      { name: "featured", label: "Featured on homepage", type: "checkbox" },
    ]}
    columns={[
      {
        key: "image",
        header: "Image",
        render: (row) =>
          row.image?.url ? (
            <img src={row.image.url} alt="" className="h-10 w-14 object-cover" />
          ) : (
            "—"
          ),
      },
      { key: "title", header: "Title" },
      { key: "category", header: "Category" },
      { key: "location", header: "Location" },
      { key: "featured", header: "Featured", render: (row) => (row.featured ? "Yes" : "—") },
    ]}
  />
);

export default Projects;
