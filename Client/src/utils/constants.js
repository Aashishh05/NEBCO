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
  hero: "/images/final/hero-concept.webp",
  planning: "/images/final/planning-concept.webp",
  investments: "/images/final/investments-concept.webp",
  overseas: "/images/final/overseas-home-concept.webp",
  construction: "/images/final/construction-site.webp",
  kathmandu: "/images/final/kathmandu.webp",
};

// NEBCO's official project photographs (remote until approved local masters exist).
export const PROJECT_IMAGES = {
  sukedhara: "https://nebco.com.np/wp-content/uploads/2024/06/DSC01007-scaled.jpg",
  khanal: "https://nebco.com.np/wp-content/uploads/2024/06/IMG_7544_11zon.jpg",
  hotelYatri: "https://nebco.com.np/wp-content/uploads/2024/06/1-81_11zon.jpg",
};
