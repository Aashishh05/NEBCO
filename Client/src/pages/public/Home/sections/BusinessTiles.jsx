import BusinessCard from "@/components/cards/BusinessCard";
import { IMAGES } from "@/utils/constants";

const businesses = [
  {
    name: "NEBCO Construction",
    shortName: "Construction",
    slug: "construction",
    tagline: "Built around your project.",
    audience: "For homes, businesses & developments",
    description:
      "From approved plans to a finished building. Or design and build with one coordinated team.",
    image: IMAGES.construction,
    scopeBullets: ["Design & Build", "Civil works & finishing", "Project & site management"],
  },
  {
    name: "NEBCO Consulting",
    shortName: "Consulting",
    slug: "consulting",
    tagline: "Clarity at every stage.",
    audience: "For landowners & project developers",
    description:
      "A clear development strategy, with the expertise and coordination to move your project forward.",
    image: IMAGES.planning,
    scopeBullets: [
      "Concept, feasibility & planning",
      "Design, approvals & finance coordination",
      "Development & project management",
    ],
  },
  {
    name: "NEBCO Investments",
    shortName: "Investments",
    slug: "investments",
    tagline: "The right people. A shared vision.",
    audience: "For landowners, investors & partners",
    description:
      "Connecting landowners, investors, suppliers and buyers to create real estate projects together.",
    image: IMAGES.investments,
    scopeBullets: [
      "A platform for project partnerships",
      "Transparent stakeholder coordination",
      "NEBCO-led facilitation & management",
    ],
  },
];

const BusinessTiles = () => {
  return (
    <section id="businesses" className="section business-section container" aria-labelledby="businesses-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span />
            Our businesses
          </p>
          <h2 id="businesses-heading">
            Three businesses.
            <br />
            One connected vision.
          </h2>
        </div>
        <p>
          Choose where you need us.
          <br />
          We'll help you move forward.
        </p>
      </div>

      <div className="business-grid">
        {businesses.map((business) => (
          <BusinessCard key={business.slug} {...business} />
        ))}
      </div>
    </section>
  );
};

export default BusinessTiles;
