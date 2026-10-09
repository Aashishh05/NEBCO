import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Building2, HardHat, PackageCheck, ClipboardCheck, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";

const pillars = [
  { icon: HardHat, title: "Site execution", text: "People & work sequence" },
  { icon: PackageCheck, title: "Materials & trades", text: "Procurement & coordination" },
  { icon: ClipboardCheck, title: "Quality & progress", text: "Checks & reporting" },
];

const tabs = {
  separate: {
    label: "Managing separate trades",
    kicker: "Construction delivery",
    heading: "You connect the work on site.",
    text: "When engaging separate trades, you take the lead in bringing their work, costs and schedules together.",
    points: [
      "Coordinate individual crews and work sequences",
      "Bring together quotations, quantities and changes",
      "Arrange supervision and follow up across teams",
    ],
    boardTag: "Separate appointments",
    leadLabel: "You coordinate the teams",
    leadName: "Individual appointments",
    leadText: "You connect their work, information and decisions.",
    result: "Separate instructions. Individual follow-ups.",
    theme: {
      board: "border border-[#d3cdbd] bg-[#ebe7de] text-[#252623]",
      top: "border-b border-[#d3cdbd] text-[#7a7c72]",
      lead: "border-b border-[#cfcabb] bg-[#d7d8cd]",
      leadLabel: "text-[#7a7c72]",
      leadText: "text-[#5d5d56]",
      hline: "border-dashed border-[#a9a89c]",
      vline: "bg-[#a9a89c]",
      icon: "border-[#bdb8a8] bg-[#f6f3ec] text-[#6d6e67]",
      pillarText: "text-[#7a7c72]",
      footer: "border-[#cfcabb] text-[#6d6e67]",
      dash: "bg-[#8a8d82]",
    },
  },
  coordinated: {
    label: "Building with NEBCO",
    kicker: "Construction delivery",
    heading: "One accountable construction team.",
    text: "We manage the people, materials and checks within your agreed construction scope.",
    points: [
      "A managed site team and work programme",
      "Agreed costs, specifications and recorded changes",
      "Site supervision, quality checks and progress updates",
    ],
    boardTag: "Brought together",
    leadLabel: "Your delivery lead",
    leadName: "NEBCO Construction",
    leadText: "One lead for the agreed construction works.",
    result: "An agreed scope. A connected team.",
    theme: {
      board: "bg-[#262b25] text-white",
      top: "text-[#d5c49e]",
      lead: "bg-[#bd1f26]",
      leadLabel: "text-white/85",
      leadText: "text-white/90",
      hline: "border-solid border-[#9c8a4f]",
      vline: "bg-[#9c8a4f]",
      icon: "border-[#9c8a4f] bg-[#262b25] text-[#d5c49e]",
      pillarText: "text-[#d2cbbf]",
      footer: "border-white/15 text-[#e6dfcf]",
      dash: "bg-[#c51f2b]",
    },
  },
};

const Foundation = () => {
  const [active, setActive] = useState("coordinated");
  const current = tabs[active];
  const t = current.theme;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-y border-[#ddd3c0] bg-[#eee6d8] py-[72px] max-[700px]:py-[55px]"
    >
      <Container>
        {/* Header */}
        <div className="mb-10 grid grid-cols-[1.1fr_0.9fr] items-start gap-[90px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-6 bg-[#c51f2b]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#5d5d56]">
                The NEBCO foundation
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-7 text-[44px] font-normal leading-[1.17] tracking-[-0.06em] text-[#252623] max-[700px]:text-[34px]"
            >
              Built on experience.
              <br />
              Focused on your future.
            </h2>
          </div>

          <div className="max-w-[440px]">
            <span className="mb-3 inline-block text-[13px] font-bold tracking-[0.06em] text-[#a51f25]">
              Established in 2001
            </span>
            <p className="text-[17px] leading-[1.75] text-[#6d6e67]">
              An A-Class construction company bringing construction, development guidance and
              project partnerships together.
            </p>
            <a
              href="https://nebco.com.np/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[#c51f2b] underline-offset-4 hover:underline"
            >
              More about NEBCO
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 max-[700px]:flex-col max-[700px]:items-start">
          <p className="text-[22px] font-normal tracking-[-0.04em] text-[#252623]">
            A clearer way to build.
          </p>

          <div role="tablist" className="inline-flex border border-[#cfc6b4] bg-[#f3ede2]">
            {Object.entries(tabs).map(([id, tab]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active === id}
                onClick={() => setActive(id)}
                className={`h-[48px] px-[22px] text-[14px] font-medium transition-colors ${
                  active === id
                    ? "bg-[#c51f2b] text-white"
                    : "text-[#62675b] hover:text-[#252623]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="grid grid-cols-[1fr_1.62fr] items-center gap-[60px] border border-[#ddd3c3] bg-background p-[35px] max-[960px]:grid-cols-1 max-[960px]:gap-10 max-[700px]:p-6">
          {/* Left content */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#c51f2b]">
              {current.kicker}
            </p>

            <h3 className="mt-6 max-w-[340px] text-[34px] font-normal leading-[1.15] tracking-[-0.045em] text-[#20211f] max-[700px]:text-[28px]">
              {current.heading}
            </h3>

            <p className="mt-6 text-[17px] leading-[1.7] text-[#6d6e67]">{current.text}</p>

            <ul className="mt-6 space-y-[14px]">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14.5px] text-[#3d4039]">
                  <Check className="mt-[3px] size-4 shrink-0 text-[#c51f2b]" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              to="/construction"
              className="mt-8 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#c51f2b] underline-offset-4 hover:underline"
            >
              Explore NEBCO Construction
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right panel */}
          <div className="min-w-0">
            <div className={t.board}>
              {/* Top row */}
              <div
                className={`flex items-center justify-between px-7 py-[26px] text-[11px] uppercase leading-[1.4] tracking-[0.11em] ${t.top}`}
              >
                <span>Your project</span>
                <Building2 className="size-[18px]" />
                <span>{current.boardTag}</span>
              </div>

              {/* Lead band */}
              <div className={`px-7 py-[25px] ${t.lead}`}>
                <span className={`text-[12.5px] ${t.leadLabel}`}>{current.leadLabel}</span>
                <strong className="mt-2 block text-[32px] font-normal leading-tight tracking-[-0.04em]">
                  {current.leadName}
                </strong>
                <p className={`mt-2 text-[13px] ${t.leadText}`}>{current.leadText}</p>
              </div>

              {/* Pillars */}
              <div className="relative mx-7 mt-[23px]">
                {/* Horizontal connector */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[25px] top-0 border-t max-[700px]:hidden ${t.hline}`}
                  style={{ width: "calc((100% + 20px) * 2 / 3)" }}
                />

                <div className="grid grid-cols-3 gap-5 max-[700px]:grid-cols-1">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="relative pt-[30px] max-[700px]:pt-0">
                      {/* Vertical connector */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-[25px] top-0 h-[30px] w-px max-[700px]:hidden ${t.vline}`}
                      />

                      <span
                        className={`relative flex size-[50px] items-center justify-center rounded-full border ${t.icon}`}
                      >
                        <pillar.icon className="size-[22px]" strokeWidth={1.5} />
                      </span>

                      <h4 className="mt-[17px] text-[17px] font-normal leading-tight tracking-[-0.02em]">
                        {pillar.title}
                      </h4>
                      <p className={`mt-2 text-[14px] leading-[1.5] ${t.pillarText}`}>
                        {pillar.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer line */}
              <div
                className={`mx-7 mt-[25px] flex items-center gap-3 border-t pb-5 pt-[18px] text-[13px] leading-[1.6] ${t.footer}`}
              >
                <span aria-hidden="true" className={`h-[2px] w-5 shrink-0 ${t.dash}`} />
                {current.result}
              </div>
            </div>

            <p className="mt-3 max-w-[620px] text-[12.5px] leading-[1.7] text-[#777467]">
              Your approvals remain central, with your architect or consultant's oversight
              where appointed.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Foundation;