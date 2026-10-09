import { useEffect, useState } from "react";
import ResourceManager from "@/components/admin/ResourceManager";
import { getUsers, createUser, updateUser, deleteUser } from "@/api/users.api.js";
import { getRoles } from "@/api/roles.api.js";

const Users = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles()
      .then((res) => setRoles(res.data?.roles || []))
      .catch(() => setRoles([]));
  }, []);

  const roleOptions = roles.map((role) => ({ value: role._id, label: role.name }));

  return (
    <ResourceManager
      title="Users"
      description="Staff accounts and the role each one holds."
      module="users"
      listFn={async () => (await getUsers({ limit: 100 })).data?.items || []}
      createFn={createUser}
      updateFn={(id, data) =>
        updateUser(id, data.password ? data : { ...data, password: undefined })
      }
      deleteFn={deleteUser}
      emptyText="No users yet"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "password", label: "Password", requiredOnCreate: true, placeholder: "min 6 characters" },
        { name: "role", label: "Role", type: "select", required: true, options: roleOptions },
        { name: "isActive", label: "Active", type: "checkbox", defaultValue: true },
      ]}
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role", render: (row) => row.role?.name || "—" },
        { key: "isActive", header: "Active", render: (row) => (row.isActive ? "Yes" : "No") },
      ]}
    />
  );
};

export default Users;
