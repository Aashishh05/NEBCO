import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormField from "@/components/forms/FormField";
import ImageUploader from "@/components/forms/ImageUploader";
import StatusBadge from "@/components/common/StatusBadge";
import Spinner from "@/components/loaders/Spinner";
import usePermission from "@/hooks/usePermission";

const emptyFromFields = (fields) => {
  const values = {};
  for (const field of fields) {
    if (field.type === "image") values[field.name] = { publicId: "", url: "" };
    else if (field.type === "checkbox") values[field.name] = false;
    else if (field.type === "number") values[field.name] = field.defaultValue ?? 0;
    else values[field.name] = field.defaultValue ?? "";
  }
  return values;
};

const CrudPage = ({
  title,
  description,
  module,
  listFn,
  createFn,
  updateFn,
  deleteFn,
  fields,
  columns,
  emptyText = "Nothing here yet",
  searchable = true,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(() => emptyFromFields(fields));
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const canCreate = usePermission(module, "create");
  const canUpdate = usePermission(module, "update");
  const canDelete = usePermission(module, "delete");

  const load = async () => {
    setLoading(true);
    try {
      setItems(await listFn());
    } catch (err) {
      toast.error(err.response?.data?.message || `Could not load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setValues(emptyFromFields(fields));
    setModalOpen(true);
  };

  const openEdit = (row) => {
    const next = {};
    for (const field of fields) {
      next[field.name] = row[field.name] ?? emptyFromFields(fields)[field.name];
    }
    setEditing(row);
    setValues(next);
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      if (editing) await updateFn(editing._id, values);
      else await createFn(values);
      toast.success(editing ? `${title} updated` : `${title} created`);
      setModalOpen(false);
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFn(deleteId);
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
      throw err;
    }
  };

  const filtered = search
    ? items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  return (
    <div>
      <PageHeader title={title} description={description}>
        {canCreate && (
          <PrimaryButton onClick={openCreate}>
            <Plus className="size-4" />
            New
          </PrimaryButton>
        )}
      </PageHeader>

      {searchable && (
        <div className="mb-4 flex items-center gap-2 border border-border bg-white px-3">
          <Search className="size-4 text-muted-fg" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}…`}
            className="h-11 w-full bg-transparent text-sm outline-none"
          />
        </div>
      )}

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-fg">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.header}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center">
                  <Spinner className="size-6" />
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-muted-fg"
                >
                  {emptyText}
                </td>
              </tr>
            )}
            {!loading &&
              filtered.map((row) => (
                <tr key={row._id} className="border-b border-border last:border-0">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-middle text-ink">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {canUpdate && (
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-ink"
                          aria-label="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          type="button"
                          onClick={() => setDeleteId(row._id)}
                          className="flex size-8 items-center justify-center text-muted-fg transition-colors hover:text-red"
                          aria-label="Delete"
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
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editing ? `Edit ${title}` : `New ${title}`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-1 max-[700px]:grid-cols-1">
            {fields.map((field) => {
              if (field.type === "image") {
                return (
                  <div key={field.name} className="col-span-2">
                    <ImageUploader
                      label={field.label}
                      value={values[field.name]}
                      onChange={(value) =>
                        setValues((current) => ({ ...current, [field.name]: value }))
                      }
                    />
                  </div>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <label
                    key={field.name}
                    className="col-span-2 flex items-center gap-3 text-sm font-semibold text-ink"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.checked,
                        }))
                      }
                      className="size-4 accent-[var(--red)]"
                    />
                    {field.label}
                  </label>
                );
              }

              const common = {
                id: field.name,
                value: values[field.name] ?? "",
                placeholder: field.placeholder,
                required: field.required,
                onChange: (event) =>
                  setValues((current) => ({
                    ...current,
                    [field.name]:
                      field.type === "number" ? Number(event.target.value) : event.target.value,
                  })),
                className: "h-11 rounded-none",
              };

              return (
                <FormField
                  key={field.name}
                  label={field.label}
                  htmlFor={field.name}
                  required={field.required}
                  className={field.full ? "col-span-2" : ""}
                >
                  {field.type === "textarea" ? (
                    <textarea
                      {...common}
                      rows={field.rows || 4}
                      className="rounded-none border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
                    />
                  ) : field.type === "select" ? (
                    <select
                      {...common}
                      className="h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
                    >
                      <option value="">Select…</option>
                      {(field.options || []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...common}
                      type={field.type === "number" ? "number" : "text"}
                      className="h-11 w-full rounded-none border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
                    />
                  )}
                </FormField>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <SecondaryButton type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={`Delete ${title.toLowerCase()}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export { StatusBadge };
export default CrudPage;
