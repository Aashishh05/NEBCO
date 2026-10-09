import ResourceManager from "@/components/admin/ResourceManager";
import { getAdminTeam, createMember, updateMember, deleteMember } from "@/api/team.api.js";

const Team = () => (
  <ResourceManager
    title="Team"
    description="Team members shown on the About page."
    module="team"
    listFn={async ({ page, limit, search }) => {
      const { data } = await getAdminTeam({ page, limit, search });
      return { items: data?.items || [], total: data?.total || 0 };
    }}
    createFn={createMember}
    updateFn={updateMember}
    deleteFn={deleteMember}
    emptyText="No team members yet"
    fields={[
      { name: "name", label: "Name", required: true, minLength: 2 },
      { name: "position", label: "Position" },
      { name: "bio", label: "Bio", type: "textarea", rows: 3, full: true },
      { name: "photo", label: "Photo", type: "image" },
    ]}
    columns={[
      {
        key: "photo",
        header: "Photo",
        render: (row) =>
          row.photo?.url ? (
            <img src={row.photo.url} alt="" className="size-10 object-cover" />
          ) : (
            "—"
          ),
      },
      { key: "name", header: "Name" },
      { key: "position", header: "Position" },
    ]}
  />
);

export default Team;
