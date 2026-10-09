import { STATUS_TONES } from "@/utils/constants";

const TONES = {
  info: "bg-muted text-ink",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  neutral: "bg-border text-muted-fg",
  danger: "bg-red-100 text-red-800",
};

const StatusBadge = ({ status = "", className = "" }) => {
  const tone = STATUS_TONES[status] || "neutral";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
