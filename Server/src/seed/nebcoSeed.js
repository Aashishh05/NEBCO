// Backend-managed content for NEBCO.
// Hero, about, services and homepage stats are static frontend text (see Client).

export const CONTACT = {
  company: "National Estate Builders Co. Pvt. Ltd.",
  email: "nebconepal@gmail.com",
  phones: ["+977 980 385 0955"],
  address: "Kuleshwor, Kathmandu, Nepal",
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
};

export const PROJECTS = [
  {
    title: "Sukedhara Private House",
    slug: "sukedhara-private-house",
    category: "residential",
    location: "Sukedhara",
    year: "2025",
    status: "Completed",
    summary: "From NEBCO’s project portfolio",
    description:
      "A private house in Sukedhara, delivered through NEBCO's managed construction scope: a coordinated site team, agreed specifications and quality checks from foundations to handover.",
    featured: true,
    image: { publicId: "", url: "/images/projects/project-sukedhara.jpg" },
    gallery: [],
  },
  {
    title: "Khanal Commercial Building",
    slug: "khanal-commercial-building",
    category: "commercial",
    location: "Nepalgunj",
    year: "2026",
    status: "Concept",
    summary: "Project concept visualization",
    description:
      "A commercial building concept in Nepalgunj, developed from the client's site and requirements through planning, design coordination and construction readiness.",
    featured: true,
    image: { publicId: "", url: "/images/projects/project-khanal.jpg" },
    gallery: [],
  },
  {
    title: "Hotel Yatri",
    slug: "hotel-yatri",
    category: "hospitality",
    location: "Thamel",
    year: "2024",
    status: "Planning & design",
    summary: "Planning & design involvement",
    description:
      "Planning and design involvement for a hospitality project in Thamel: site assessment, design coordination and project brief development.",
    featured: true,
    image: { publicId: "", url: "/images/projects/project-hotel-yatri.jpg" },
    gallery: [],
  },
];

export const TEAM = [
  {
    name: "Team Member One",
    position: "Director",
    bio: "Leading NEBCO's construction, consulting and investments practice.",
    photo: { publicId: "", url: "" },
    socials: { facebook: "", linkedin: "", x: "", instagram: "" },
  },
  {
    name: "Team Member Two",
    position: "Project Manager",
    bio: "Coordinates design, approvals and site execution for client projects.",
    photo: { publicId: "", url: "" },
    socials: { facebook: "", linkedin: "", x: "", instagram: "" },
  },
  {
    name: "Team Member Three",
    position: "Design Coordinator",
    bio: "Connects architectural, structural and MEP inputs into buildable scopes.",
    photo: { publicId: "", url: "" },
    socials: { facebook: "", linkedin: "", x: "", instagram: "" },
  },
];

export const TESTIMONIALS = [
  {
    client: "Sukedhara Client",
    role: "Homeowner",
    quote:
      "NEBCO kept us informed at every stage and handed over exactly what was agreed.",
    rating: 5,
    isPublished: true,
    avatar: { publicId: "", url: "" },
  },
  {
    client: "Nepalgunj Developer",
    role: "Developer",
    quote:
      "Clear coordination across design, approvals and budget planning from the start.",
    rating: 4,
    isPublished: true,
    avatar: { publicId: "", url: "" },
  },
];