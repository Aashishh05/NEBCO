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

// NEBCO's official project photographs (served locally from public/images/projects).
export const PROJECT_IMAGES = {
  sukedhara: "/images/projects/project-sukedhara.jpg",
  khanal: "/images/projects/project-khanal.jpg",
  hotelYatri: "/images/projects/project-hotel-yatri.jpg",
};

export const PROJECT_IMAGE_BY_SLUG = {
  "sukedhara-private-house": PROJECT_IMAGES.sukedhara,
  "khanal-commercial-building": PROJECT_IMAGES.khanal,
  "hotel-yatri": PROJECT_IMAGES.hotelYatri,
};

// Homepage "Selected experience" copy (matches the reference site).
export const PROJECT_COPY_BY_SLUG = {
  "sukedhara-private-house": {
    label: "Residential / Sukedhara",
    summary: "From NEBCO’s project portfolio",
  },
  "khanal-commercial-building": {
    label: "Commercial / Nepalgunj",
    summary: "Project concept visualization",
  },
  "hotel-yatri": {
    label: "Hospitality / Thamel",
    summary: "Planning & design involvement",
  },
};
