import { useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const ConfirmDialog = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
      onOpenChange?.(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={message}
    >
      <div className="flex justify-end gap-3 pt-2">
        <SecondaryButton onClick={() => onOpenChange?.(false)}>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleConfirm} disabled={loading}>
          {loading ? "Working…" : confirmLabel}
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
