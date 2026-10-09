import BusinessHero from "@/components/business/BusinessHero";
import ScopeCards from "@/components/business/ScopeCards";
import TalkCta from "@/components/business/TalkCta";
import { IMAGES } from "@/utils/constants";

const cards = [
  {
    id: "partnerships",
    title: "A platform for project partnerships",
    text: "NEBCO connects landowners, investors, suppliers and buyers around viable real estate projects, with a professional and transparent approach.",
    points: [
      "Landowners contributing development opportunities",
      "Investors exploring project participation",
      "Suppliers supporting agreed project requirements",
      "Buyers connecting with suitable project opportunities",
    ],
    ctaLabel: "Explore a project partnership",
  },
  {
    id: "nebco-role",
    title: "NEBCO's role",
    text: "We serve as facilitator, project manager and consultant, helping the participants define their roles and coordinate a way forward.",
    points: [
      "Bring relevant stakeholders together",
      "Coordinate project assessment and planning",
      "Clarify responsibilities and commercial arrangements",
      "Manage agreed project coordination",
    ],
    ctaLabel: "Discuss NEBCO's involvement",
  },
];

const Investments = () => {
  return (
    <>
      <BusinessHero
        name="NEBCO Investments"
        title="The right people. A shared project."
        description="NEBCO brings the right stakeholders together and serves as facilitator, project manager and consultant. Where appropriate, we may also invest and take equity, strengthening our commitment to the project."
        ctaLabel="Explore a partnership"
        image={IMAGES.investments}
      />
      <ScopeCards cards={cards} />
      <TalkCta />
    </>
  );
};

export default Investments;
