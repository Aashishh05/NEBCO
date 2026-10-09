import BusinessHero from "@/components/business/BusinessHero";
import ScopeCards from "@/components/business/ScopeCards";
import TalkCta from "@/components/business/TalkCta";
import { IMAGES } from "@/utils/constants";

const cards = [
  {
    id: "design-build",
    title: "Design & Build",
    text: "Start with your requirements, site and working budget. We coordinate design development, approvals, costing and construction through an agreed scope.",
    points: [
      "Site assessment and requirement planning",
      "Architectural, structural and MEP coordination",
      "Specifications and BOQ for informed budgeting",
      "Construction, finishing and handover",
    ],
    ctaLabel: "Discuss Design & Build",
  },
  {
    id: "from-drawings",
    title: "Build from existing drawings",
    text: "If your plans are ready, we review the drawings and specifications with you, clarify the work and prepare a construction proposal.",
    points: [
      "Drawing, scope and specification review",
      "Construction costing and work programme",
      "Site management and quality checks",
      "Progress reviews and handover",
    ],
    ctaLabel: "Discuss construction delivery",
  },
];

const Construction = () => {
  return (
    <>
      <BusinessHero
        name="NEBCO Construction"
        title="From your plans to a place that lasts."
        description="Build with a team that connects design, budget and site execution. Whether you have a plot or approved drawings, we shape the right construction scope around your project."
        ctaLabel="Discuss your build"
        image={IMAGES.hero}
      />
      <ScopeCards cards={cards} />
      <TalkCta />
    </>
  );
};

export default Construction;
