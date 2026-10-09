import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormField from "@/components/forms/FormField";
import Spinner from "@/components/loaders/Spinner";
import usePermission from "@/hooks/usePermission";
import { getRoles, createRole, updateRole, deleteRole } from "@/api/roles.api.js";
import { getPermissionsByRole, updatePermissions } from "@/api/permissions.api.js";
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from "@/utils/constants";

const emptyRole = { name: "", slug: "", description: "" };

const buildMatrix = (modules = {}) => {
  const matrix = {};
  for (const module of PERMISSION_MODULES) {
    matrix[module] = {
      read: Boolean(modules[module]?.read),
      create: Boolean(modules[module]?.create),
      update: Boolean(modules[module]?.update),
      delete: Boolean(modules[module]?.delete),
    };
  }
  return matrix;
};

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(emptyRole);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [permRole, setPermRole] = useState(null);
  const [matrix, setMatrix] = useState(buildMatrix());
  const [permLoading, setPermLoading] = useState(false);
  const [permSaving, setPermSaving] = useState(false);

  const canCreate = usePermission("roles", "create");
  const canUpdate = usePermission("roles", "update");
  const canDelete = usePermission("roles", "delete");

  const load = async () => {
    setLoading(true);
    try {
      setRoles((await getRoles()).data?.roles || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setValues(emptyRole);
    setFormOpen(true);
  };

  const openEdit = (role) => {
    setEditing(role);
    setValues({ name: role.name, slug: role.slug, description: role.description || "" });
    setFormOpen(true);
  };

  const saveRole = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      if (editing) await updateRole(editing._id, { name: values.name, description: values.description });
      else await createRole(values);
      toast.success(editing ? "Role updated" : "Role created");
      setFormOpen(false);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const openPermissions = async (role) => {
    setPermRole(role);
    setPermLoading(true);
    try {
      const res = await getPermissionsByRole(role._id);
      setMatrix(buildMatrix(res.data?.permission?.modules || {}));
    } catch {
      setMatrix(buildMatrix());
    } finally {
      setPermLoading(false);
    }
  };

  const toggle = (module, action) => {
    setMatrix((current) => ({
      ...current,
      [module]: { ...current[module], [action]: !current[module][action] },
    }));
  };

  const savePermissions = async () => {
    try {
      setPermSaving(true);
      await updatePermissions(permRole._id, { modules: matrix });
      toast.success("Permissions updated");
      setPermRole(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save permissions");
    } finally {
      setPermSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRole(deleteId);
      toast.success("Role deleted");
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
      throw err;
    }
  };

  return (
    <div>
      <PageHeader title="Roles" description="Roles and what each one can do.">
        {canCreate && (
          <PrimaryButton onClick={openCreate}>
            <Plus className="size-4" />
            New role
          </PrimaryButton>
        )}
      </PageHeader>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center">
                  <Spinner className="size-6" />
                </td>
              </tr>
            )}
            {!loading && roles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-muted-fg">
                  No roles yet
                </td>
              </tr>
            )}
            {roles.map((role) => (
              <tr key={role._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">{role.name}</td>
                <td className="px-4 py-3 text-muted-fg">{role.slug}</td>
                <td className="px-4 py-3 text-muted-fg">{role.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {canUpdate && (
                      <button
                        type="button"
                        onClick={() => openPermissions(role)}
                        className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-muted"
                      >
                        <ShieldCheck className="size-4" />
                        Permissions
                      </button>
                    )}
                    {canUpdate && (
                      <button
                        type="button"
                        onClick={() => openEdit(role)}
                        className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-ink"
                        aria-label="Edit role"
                      >
                        <Pencil className="size-4" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => setDeleteId(role._id)}
                        className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-red"
                        aria-label="Delete role"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editing ? "Edit role" : "New role"}
      >
        <form onSubmit={saveRole} className="flex flex-col gap-4">
          <FormField label="Name" htmlFor="role-name" required>
            <input
              id="role-name"
              value={values.name}
              onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
              required
              className="h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
            />
          </FormField>

          <FormField label="Slug" htmlFor="role-slug" required>
            <input
              id="role-slug"
              value={values.slug}
              onChange={(event) => setValues((v) => ({ ...v, slug: event.target.value }))}
              required
              disabled={Boolean(editing)}
              placeholder="lowercase-with-hyphens"
              className="h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring disabled:opacity-60"
            />
          </FormField>

          <FormField label="Description" htmlFor="role-description">
            <textarea
              id="role-description"
              value={values.description}
              onChange={(event) => setValues((v) => ({ ...v, description: event.target.value }))}
              rows={3}
              className="rounded-none border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <SecondaryButton type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(permRole)}
        onOpenChange={(open) => !open && setPermRole(null)}
        title={`Permissions — ${permRole?.name || ""}`}
      >
        {permLoading ? (
          <div className="py-10 text-center">
            <Spinner className="size-6" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="max-h-[55vh] overflow-auto border border-border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Module</th>
                    {PERMISSION_ACTIONS.map((action) => (
                      <th key={action} className="px-3 py-2 text-center font-semibold">
                        {action}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSION_MODULES.map((module) => (
                    <tr key={module} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 font-semibold capitalize text-ink">{module}</td>
                      {PERMISSION_ACTIONS.map((action) => (
                        <td key={action} className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={matrix[module][action]}
                            onChange={() => toggle(module, action)}
                            className="size-4 accent-[var(--red)]"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <SecondaryButton type="button" onClick={() => setPermRole(null)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="button" onClick={savePermissions} disabled={permSaving}>
                {permSaving ? "Saving…" : "Save permissions"}
              </PrimaryButton>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete role?"
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Roles;
