import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Trash2, Copy } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Spinner from "@/components/loaders/Spinner";
import usePermission from "@/hooks/usePermission";
import { getMedia, uploadMedia, deleteMedia } from "@/api/media.api.js";

const Media = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const canCreate = usePermission("media", "create");
  const canDelete = usePermission("media", "delete");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMedia({ limit: 100 });
      setItems(res.data?.items || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      await uploadMedia(file);
      toast.success("Uploaded");
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteMedia(id);
      setItems((current) => current.filter((item) => item._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div>
      <PageHeader title="Media" description="Images uploaded to Cloudinary.">
        {canCreate && (
          <>
            <PrimaryButton onClick={() => inputRef.current?.click()} disabled={uploading}>
              <Upload className="size-4" />
              {uploading ? "Uploading…" : "Upload"}
            </PrimaryButton>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />
          </>
        )}
      </PageHeader>

      {loading ? (
        <div className="py-16 text-center">
          <Spinner className="size-6" />
        </div>
      ) : items.length === 0 ? (
        <p className="border border-border bg-white px-6 py-12 text-center text-muted-fg">
          No media yet.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-3 max-[700px]:grid-cols-2">
          {items.map((item) => (
            <div key={item._id} className="group relative border border-border bg-white">
              <img src={item.url} alt={item.fileName} className="h-40 w-full object-cover" />
              <div className="flex items-center justify-between border-t border-border p-2">
                <button
                  type="button"
                  onClick={() => copy(item.url)}
                  className="flex size-8 items-center justify-center text-muted-fg hover:text-ink"
                  aria-label="Copy URL"
                >
                  <Copy className="size-4" />
                </button>
                {canDelete && (
                  <button
                    type="button"
                    onClick={() => remove(item._id)}
                    className="flex size-8 items-center justify-center text-muted-fg hover:text-red"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
