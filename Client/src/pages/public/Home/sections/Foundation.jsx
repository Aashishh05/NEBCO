import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Building2, HardHat, PackageCheck, ClipboardCheck } from "lucide-react";
import Container from "@/components/common/Container";
import Eyebrow from "@/components/common/Eyebrow";

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
      className="border-y border-[#ddd8cd] bg-[#efede8] py-[77px] max-[700px]:py-[55px]"
    >
      <Container>
        <div className="mb-10 grid grid-cols-[1.1fr_0.9fr] items-center gap-[100px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div>
            <Eyebrow className="mb-[19px]">The NEBCO foundation</Eyebrow>
            <h2 className="text-[46px] font-normal leading-[1.14] tracking-[-0.04em] text-ink max-[700px]:text-[34px]">
              Built on experience.
              <br />
              Focused on your future.
            </h2>
          </div>

          <div className="max-w-[425px]">
            <span className="mb-[10px] inline-block text-[13px] font-bold tracking-[0.055em] text-[#a51f25]">
              Established in 2001
            </span>
            <p className="text-[16px] leading-[1.8] text-[#62675b]">
              An A-Class construction company bringing construction, development guidance and
              project partnerships together.
            </p>
            <Link
              to="/#about"
              className="mt-4 inline-block text-[13px] font-semibold text-red underline-offset-4 hover:underline"
            >
              More about NEBCO
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-5 max-[700px]:flex-col max-[700px]:items-start">
            <p className="text-[15px] font-semibold text-[#62675b]">
              A clearer way to build.
            </p>

            <div className="inline-flex gap-1 border border-[#c6b99f] bg-[#e7ddca] p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`px-4 py-2 text-[13px] font-semibold transition-colors ${
                    active === tab.id
                      ? "bg-background text-ink"
                      : "text-[#62675b] hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid min-h-[390px] grid-cols-[0.9fr_1.1fr] items-center gap-[42px] border border-[#d8cdb8] bg-background p-[36px_39px] max-[960px]:grid-cols-1 max-[700px]:p-6">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-red">
                {current.kicker}
              </p>
              <h3 className="mt-3 max-w-[340px] text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
                {current.heading}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.8] text-[#62675b]">{current.text}</p>

              <ul className="mt-5 space-y-3">
                {current.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[14px] text-[#3d4039]">
                    <Check className="mt-0.5 size-[17px] shrink-0 text-red" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to="/construction"
                className="mt-6 inline-block text-[13px] font-semibold text-red underline-offset-4 hover:underline"
              >
                Explore NEBCO Construction
              </Link>
            </div>

            <div className="min-w-0">
              <div className="relative border border-[#3b4236] bg-[#262b25] p-[24px_27px_19px] text-white">
                <div className="flex items-center gap-3 text-[11px] uppercase leading-[1.4] tracking-[0.11em] text-[#d5c49e]">
                  <span>Your project</span>
                  <Building2 className="size-5" />
                  <span>Brought together</span>
                </div>

                <div className="-mx-[28px] mt-[22px] border-y border-[#d44649] bg-red px-[28px] py-[23px]">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-white/75">
                    Your delivery lead
                  </span>
                  <strong className="mt-1 block text-[20px] font-semibold tracking-[-0.02em]">
                    NEBCO Construction
                  </strong>
                  <p className="mt-1 text-[13px] text-white/80">
                    One lead for the agreed construction works.
                  </p>
                </div>

                <div className="mt-[22px] grid grid-cols-3 gap-5 border-t border-[#c5ae7655] pt-[31px]">
                  {pillars.map((pillar) => (
                    <div key={pillar.title}>
                      <span className="mb-3 flex size-8 items-center justify-center text-[#d5c49e]">
                        <pillar.icon className="size-5" />
                      </span>
                      <h4 className="text-[14px] font-semibold leading-tight">{pillar.title}</h4>
                      <p className="mt-1 text-[12px] leading-[1.5] text-[#d2cbbf]">
                        {pillar.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-[10px] border-t border-[#c5ae7655] pt-4 text-[12px] leading-[1.6] text-[#e2d1af]">
                  <span aria-hidden="true" className="size-1.5 shrink-0 bg-[#e2d1af]" />
                  An agreed scope. A connected team.
                </div>
              </div>

              <p className="mt-[13px] max-w-[560px] text-[12px] leading-[1.7] text-[#777467]">
                Your approvals remain central, with your architect or consultant's oversight
                where appointed.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Foundation;
