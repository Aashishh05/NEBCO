import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { uploadMedia } from "@/api/media.api.js";
import Spinner from "@/components/loaders/Spinner";

const ImageUploader = ({ value, onChange, label = "Image" }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const payload = await uploadMedia(file);
      const media = payload.data?.media;
      onChange?.({ publicId: media?.publicId || "", url: media?.url || "" });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clear = () => onChange?.({ publicId: "", url: "" });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>

      {value?.url ? (
        <div className="relative w-fit border border-border bg-white p-2">
          <img src={value.url} alt={label} className="h-32 w-auto object-contain" />
          <button
            type="button"
            onClick={clear}
            aria-label="Remove image"
            className="absolute -right-3 -top-3 flex size-7 items-center justify-center bg-red text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-48 flex-col items-center justify-center gap-2 border border-dashed border-border bg-white text-muted-fg transition-colors hover:border-red hover:text-red disabled:opacity-60"
        >
          {uploading ? <Spinner className="size-6" /> : <Upload className="size-6" />}
          <span className="text-sm">{uploading ? "Uploading…" : "Choose image"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
