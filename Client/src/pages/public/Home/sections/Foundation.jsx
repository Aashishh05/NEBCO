import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Building2, HardHat, PackageCheck, ClipboardCheck } from "lucide-react";
import Container from "@/components/common/Container";

const tabs = [
  {
    id: "separate",
    label: "Managing separate trades",
    kicker: "Managing separate trades",
    heading: "A simpler way to keep the build moving.",
    text: "We manage the people, materials and checks within your agreed construction scope.",
    points: [
      "A managed site team and work programme",
      "Agreed costs, specifications and recorded changes",
      "Site supervision, quality checks and progress updates",
    ],
  },
  {
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
  },
];

const pillars = [
  { icon: HardHat, title: "Site execution", text: "People & work sequence" },
  { icon: PackageCheck, title: "Materials & trades", text: "Procurement & coordination" },
  { icon: ClipboardCheck, title: "Quality & progress", text: "Checks & reporting" },
];

const Foundation = () => {
  const [active, setActive] = useState("coordinated");
  const current = tabs.find((tab) => tab.id === active);

  return (
    <section
      id="about"
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

            <h2 className="mt-7 text-[44px] font-normal leading-[1.17] tracking-[-0.06em] text-[#252623] max-[700px]:text-[34px]">
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
            <Link
              to="/#about"
              className="mt-5 inline-block text-[14px] font-medium text-[#c51f2b] underline-offset-4 hover:underline"
            >
              More about NEBCO
            </Link>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 max-[700px]:flex-col max-[700px]:items-start">
          <p className="text-[22px] font-normal tracking-[-0.04em] text-[#252623]">
            A clearer way to build.
          </p>

          <div className="inline-flex border border-[#cfc6b4] bg-[#f3ede2]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`h-[48px] px-[22px] text-[14px] font-medium transition-colors ${
                  active === tab.id
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
              className="mt-8 inline-block text-[14.5px] font-medium text-[#c51f2b] underline-offset-4 hover:underline"
            >
              Explore NEBCO Construction
            </Link>
          </div>

          {/* Right panel */}
          <div className="min-w-0">
            <div className="bg-[#262b25] text-white">
              {/* Top row */}
              <div className="flex items-center justify-between px-7 py-[26px] text-[11px] uppercase leading-[1.4] tracking-[0.11em] text-[#d5c49e]">
                <span>Your project</span>
                <Building2 className="size-[18px]" />
                <span>Brought together</span>
              </div>

              {/* Delivery lead band */}
              <div className="bg-[#bd1f26] px-7 py-[25px]">
                <span className="text-[12.5px] text-white/85">Your delivery lead</span>
                <strong className="mt-2 block text-[32px] font-normal leading-tight tracking-[-0.04em]">
                  NEBCO Construction
                </strong>
                <p className="mt-2 text-[13px] text-white/90">
                  One lead for the agreed construction works.
                </p>
              </div>

              {/* Pillars */}
              <div className="relative mx-7 mt-[23px]">
                {/* Horizontal connector */}
                <span
                  aria-hidden="true"
                  className="absolute left-[25px] top-0 h-px bg-[#9c8a4f] max-[700px]:hidden"
                  style={{ width: "calc((100% + 20px) * 2 / 3)" }}
                />

                <div className="grid grid-cols-3 gap-5 max-[700px]:grid-cols-1">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="relative pt-[30px] max-[700px]:pt-0">
                      {/* Vertical connector */}
                      <span
                        aria-hidden="true"
                        className="absolute left-[25px] top-0 h-[30px] w-px bg-[#9c8a4f] max-[700px]:hidden"
                      />

                      <span className="relative flex size-[50px] items-center justify-center rounded-full border border-[#9c8a4f] bg-[#262b25] text-[#d5c49e]">
                        <pillar.icon className="size-[22px]" strokeWidth={1.5} />
                      </span>

                      <h4 className="mt-[17px] text-[17px] font-normal leading-tight tracking-[-0.02em]">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-[14px] leading-[1.5] text-[#d2cbbf]">
                        {pillar.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer line */}
              <div className="mx-7 mt-[25px] flex items-center gap-3 border-t border-white/15 pb-5 pt-[18px] text-[13px] leading-[1.6] text-[#e6dfcf]">
                <span aria-hidden="true" className="h-[2px] w-5 shrink-0 bg-[#c51f2b]" />
                An agreed scope. A connected team.
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