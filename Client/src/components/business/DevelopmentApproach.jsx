import { useState } from "react";
import { Check, Building2, PencilRuler, Handshake, HardHat } from "lucide-react";

const pillars = [
  { icon: PencilRuler, title: "Design team", text: "Architects & engineers" },
  { icon: Handshake, title: "Specialist inputs", text: "Finance & legal" },
  { icon: HardHat, title: "Delivery team", text: "Construction & supply" },
];

const tabs = {
  coordinated: {
    label: "Through NEBCO",
    kicker: "Development management",
    heading: "A connected team. A clearer way forward.",
    text: "With development management, we coordinate the specialist inputs and teams agreed for your project.",
    points: [
      "One lead for agreed development coordination",
      "Design, scope and budget reviewed together",
      "Documented decisions and progress reviews",
    ],
    topRight: "Brought together",
    leadLabel: "Your delivery lead",
    leadName: "NEBCO Consulting",
    leadText: "One lead for agreed development coordination.",
    result: "An agreed scope. A connected team.",
  },
  separate: {
    label: "Separate appointments",
    kicker: "Development management",
    heading: "You bring the different teams together.",
    text: "With separate appointments, you manage how the specialist inputs, information and decisions connect.",
    points: [
      "Coordinate the individual appointments",
      "Bring together design and cost information",
      "Follow up across the different teams",
    ],
    topRight: "Separate appointments",
    leadLabel: "You coordinate the teams",
    leadName: "Individual appointments",
    leadText: "You connect their work, information and decisions.",
    result: "Separate instructions. Individual follow-ups.",
  },
};

const DevelopmentApproach = () => {
  const [active, setActive] = useState("coordinated");
  const current = tabs[active];

  return (
    <section className="service-comparison-section" aria-label="Development approach">
      <div className="container">
        <div className="coordination-tabs construction-comparison" id="development-approach">
          <div className="comparison-top">
            <p>A coordinated approach to development</p>
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
                    <Check size={17} />
                    {point}
                  </li>
                ))}
              </ul>

              <a className="text-link" href="#development-management">
                Explore development management
              </a>
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
                Responsibilities follow your agreed development scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentApproach;
