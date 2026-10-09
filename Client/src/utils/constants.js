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

export const DEFAULT_CONTACT = {
  company: "National Estate Builders Co. Pvt. Ltd.",
  email: "nebconepal@gmail.com",
  phones: ["+977 980 385 0955"],
  address: "Kuleshwor, Kathmandu, Nepal",
  socials: {},
};

export const IMAGES = {
  hero: "/images/nebco-hero-architectural-concept-original.png",
  planning: "/images/nebco-planning-still-life-original.png",
  investments: "/images/investments-development-concept-original.png",
  overseas: "/images/nepalis-abroad-home-concept-original.png",
  kathmandu: "/images/kathmandu_valley_lidia_stawinska.jpg",
  team: "/images/binayak_bam_malla_4.png",
};
