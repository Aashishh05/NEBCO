import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
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
    accentColor: "#b82026",
    image: IMAGES.hero,
    scopeBullets: [
      "Design & Build",
      "Civil works & finishing",
      "Project & site management",
    ],
  },
  {
    name: "NEBCO Consulting",
    shortName: "Consulting",
    slug: "consulting",
    tagline: "Clarity at every stage.",
    audience: "For landowners & project developers",
    description:
      "A clear development strategy, with the expertise and coordination to move your project forward.",
    accentColor: "#232720",
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
    accentColor: "#aa8c56",
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
    <section id="businesses" className="pb-[65px] pt-20 max-[700px]:pt-[60px]">
      <Container>
        <SectionHeading
          eyebrow="Our businesses"
          title={
            <>
              Three businesses.
              <br />
              One connected vision.
            </>
          }
          description={
            <>
              Choose where you need us.
              <br />
              We'll help you move forward.
            </>
          }
        />

        <div className="grid grid-cols-3 gap-5 max-[960px]:gap-[13px] max-[700px]:grid-cols-1 max-[700px]:gap-[25px]">
          {businesses.map((business) => (
            <BusinessCard key={business.slug} {...business} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BusinessTiles;
