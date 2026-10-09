export const PROJECT_CATEGORIES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "hospitality", label: "Hospitality" },
];

export const ENQUIRY_STATUSES = ["new", "contacted", "closed"];
export const APPOINTMENT_STATUSES = ["pending", "confirmed", "cancelled"];

export const PERMISSION_ACTIONS = ["read", "create", "update", "delete"];

export const STATUS_TONES = {
  new: "info",
  pending: "info",
  contacted: "warning",
  confirmed: "success",
  closed: "neutral",
  cancelled: "danger",
};
