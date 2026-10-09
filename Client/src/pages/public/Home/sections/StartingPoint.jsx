import { Link } from "react-router-dom";
import { LandPlot, PencilRuler, FileCheck2, Handshake } from "lucide-react";

const options = [
  {
    title: "Explore my land's potential",
    text: "Understand your options and plan a viable development.",
    label: "Development consulting",
    to: "/consulting#development-planning",
    icon: LandPlot,
  },
  {
    title: "Design and build a property",
    text: "Bring your requirements, site and working budget together.",
    label: "Design & Build",
    to: "/construction#design-build",
    icon: PencilRuler,
  },
  {
    title: "Build from existing drawings",
    text: "Review your plans, scope and construction requirements.",
    label: "Construction delivery",
    to: "/construction#from-drawings",
    icon: FileCheck2,
  },
  {
    title: "Explore a project partnership",
    text: "Connect land, capital, supply and buying interest.",
    label: "NEBCO Investments",
    to: "/investments#partnerships",
    icon: Handshake,
  },
];

const StartingPoint = () => {
  return (
    <section id="start" className="starting-section" aria-labelledby="starting-heading">
      <div className="container starting-grid">
        <div className="starting-intro">
          <p className="eyebrow">
            <span />
            Your starting point
          </p>
          <h2 id="starting-heading">
            What would you <br />
            like to do?
          </h2>
          <p>
            Start with what you have in mind. <br />
            We'll help you take the next step.
          </p>
        </div>

        <div className="starting-options">
          {options.map((option) => (
            <Link key={option.title} to={option.to} className="starting-option">
              <option.icon />
              <div>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <span>{option.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartingPoint;
