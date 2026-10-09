import BusinessHero from "@/components/business/BusinessHero";
import ScopeCards from "@/components/business/ScopeCards";
import ComparisonBoard from "@/components/business/ComparisonBoard";
import TalkCta from "@/components/business/TalkCta";
import { IMAGES } from "@/utils/constants";

const cards = [
  {
    id: "development-planning",
    title: "Plan the right development",
    text: "Understand what your land can support and how a project could be developed around your objectives, budget and market.",
    points: [
      "Concept and feasibility assessment",
      "Development strategy and project brief",
      "Design coordination and approval planning",
      "Budget planning and bank liaison",
    ],
    ctaLabel: "Discuss development planning",
  },
  {
    id: "development-management",
    title: "Coordinate the way forward",
    text: "Bring the specialist inputs and project decisions together with clear responsibilities at each stage.",
    points: [
      "Legal and commercial coordination",
      "Tendering and construction readiness",
      "Project and development management",
      "Realtor, marketing, sales and leasing coordination",
    ],
    ctaLabel: "Discuss development management",
  },
];

const Consulting = () => {
  return (
    <>
      <BusinessHero
        name="NEBCO Consulting"
        title="A clear direction for your development."
        description="End-to-end real estate development support, from understanding your land's potential to coordinating design, approvals, finance planning, delivery and sales or leasing support."
        ctaLabel="Discuss your development"
        image={IMAGES.planning}
      />
      <ScopeCards cards={cards} />
      <ComparisonBoard
        eyebrow="A coordinated approach to development"
        lead="Development management"
        text="A connected team. A clearer way forward."
        browse="With development management, we coordinate the specialist inputs and teams agreed for your project."
        points={[
          "One lead for agreed development coordination",
          "Design, scope and budget reviewed together",
          "Documented decisions and progress reviews",
        ]}
        note="Responsibilities follow your agreed development scope."
        ctaLabel="Explore development management"
      />
      <TalkCta />
    </>
  );
};

export default Consulting;
