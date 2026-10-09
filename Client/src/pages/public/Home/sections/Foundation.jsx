import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Building2, HardHat, PackageCheck, ClipboardCheck } from "lucide-react";

const pillars = [
  { icon: HardHat, title: "Site execution", text: "People & work sequence" },
  { icon: PackageCheck, title: "Materials & trades", text: "Procurement & coordination" },
  { icon: ClipboardCheck, title: "Quality & progress", text: "Checks & reporting" },
];

const tabs = {
  coordinated: {
    id: "coordinated",
    label: "Building with NEBCO",
    kicker: "Construction delivery",
    heading: "One accountable construction team.",
    text: "We manage the people, materials and checks within your agreed construction scope.",
    points: [
      "A managed site team and work programme",
      "Agreed costs, specifications and recorded changes",
      "Site supervision, quality checks and progress updates",
    ],
    topRight: "Brought together",
    leadLabel: "Your delivery lead",
    leadName: "NEBCO Construction",
    leadText: "One lead for the agreed construction works.",
    result: "An agreed scope. A connected team.",
  },
  separate: {
    id: "separate",
    label: "Managing separate trades",
    kicker: "Construction delivery",
    heading: "You connect the work on site.",
    text: "When engaging separate trades, you take the lead in bringing their work, costs and schedules together.",
    points: [
      "Coordinate individual crews and work sequences",
      "Bring together quotations, quantities and changes",
      "Arrange supervision and follow up across teams",
    ],
    topRight: "Separate appointments",
    leadLabel: "You coordinate the teams",
    leadName: "Individual appointments",
    leadText: "You connect their work, information and decisions.",
    result: "Separate instructions. Individual follow-ups.",
  },
};

const Foundation = () => {
  const [active, setActive] = useState("coordinated");
  const current = tabs[active];

  return (
    <section id="about" className="about-section approach-foundation" aria-labelledby="about-heading">
      <div className="container">
        <div className="foundation-heading">
          <div>
            <p className="eyebrow">
              <span />
              The NEBCO foundation
            </p>
            <h2 id="about-heading">
              Built on experience.
              <br />
              Focused on your future.
            </h2>
          </div>

          <div className="foundation-intro">
            <span className="established-label">Established in 2001</span>
            <p>
              An A-Class construction company bringing construction, development guidance and
              project partnerships together.
            </p>
            <a
              className="text-link"
              href="https://nebco.com.np/"
              target="_blank"
              rel="noreferrer"
            >
              More about NEBCO
            </a>
          </div>
        </div>

        <div className="coordination-tabs construction-comparison">
          <div className="comparison-top">
            <p>A clearer way to build.</p>
            <div className="coordination-tab-list" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={active === "separate"}
                className={active === "separate" ? "is-active" : ""}
                onClick={() => setActive("separate")}
              >
                {tabs.separate.label}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={active === "coordinated"}
                className={active === "coordinated" ? "is-active" : ""}
                onClick={() => setActive("coordinated")}
              >
                {tabs.coordinated.label}
              </button>
            </div>
          </div>

          <div className="coordination-panel construction-panel">
            <div className="comparison-copy">
              <p className="comparison-kicker">{current.kicker}</p>
              <h3>{current.heading}</h3>
              <p>{current.text}</p>

              <ul>
                {current.points.map((point) => (
                  <li key={point}>
                    <Check />
                    {point}
                  </li>
                ))}
              </ul>

              <Link className="text-link" to="/construction">
                Explore NEBCO Construction
              </Link>
            </div>

            <div className="construction-visual">
              <div
                className={`delivery-board ${
                  active === "coordinated" ? "is-led" : "is-independent"
                }`}
              >
                <div className="delivery-board-top">
                  <span>Your project</span>
                  <Building2 />
                  <span>{current.topRight}</span>
                </div>

                <div className="delivery-lead">
                  <span>{current.leadLabel}</span>
                  <strong>{current.leadName}</strong>
                  <p>{current.leadText}</p>
                </div>

                <div className="delivery-pillars">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="delivery-pillar">
                      <span className="delivery-pillar-icon">
                        <pillar.icon />
                      </span>
                      <h4>{pillar.title}</h4>
                      <p>{pillar.text}</p>
                    </div>
                  ))}
                </div>

                <div className="delivery-result">
                  <span />
                  {current.result}
                </div>
              </div>

              <p className="construction-oversight">
                Your approvals remain central, with your architect or consultant’s oversight
                where appointed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Foundation;
