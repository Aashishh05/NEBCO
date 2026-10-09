import { Compass, Hammer, Ruler, Handshake } from "lucide-react";

import { Link } from "react-router-dom";
import Container from "@/components/common/Container";

const options = [
  {
    title: "Explore my land’s potential",
    text: "Understand your options and plan a viable development.",
    label: "Development consulting",
    to: "/consulting",
    icon: Compass,
  },
  {
    title: "Design and build a property",
    text: "Bring your requirements, site and working budget together.",
    label: "Design & Build",
    to: "/construction",
    icon: Ruler,
  },
  {
    title: "Build from existing drawings",
    text: "Review your plans, scope and construction requirements.",
    label: "Construction delivery",
    to: "/construction",
    icon: Hammer,
  },
  {
    title: "Explore a project partnership",
    text: "Connect land, capital, supply and buying interest.",
    label: "NEBCO Investments",
    to: "/investments",
    icon: Handshake,
  },
];

const StartingPoint = () => {
  return (
    <section
      id="starting-point"
      className="border-y border-[#dfd5c5] bg-[#f0ebe2]"
    >
      <Container className="py-20 max-[700px]:py-14">
        <div className="grid grid-cols-[0.95fr_1.75fr] items-center gap-16 max-[1050px]:grid-cols-1 max-[1050px]:gap-10">
          {/* Left heading */}
          <div>
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-[30px] bg-[#c51f2b]" />

              <p className="text-[14px] font-medium uppercase tracking-[0.12em] text-[#5d5d56]">
                Your starting point
              </p>
            </div>

            <h2 className="mt-7 max-w-[390px] text-[48px] font-normal leading-[1.2] tracking-[-0.055em] text-[#252623] max-[700px]:text-[38px]">
              What would you like to do?
            </h2>

            <p className="mt-6 max-w-[390px] text-[19px] leading-[1.9] text-[#6d6e67]">
              Start with what you have in mind. We’ll help you take the next
              step.
            </p>
          </div>

          {/* Right options grid */}
          <div className="grid grid-cols-2 gap-x-8 max-[700px]:grid-cols-1">
            {options.map((option) => {
              const Icon = option.icon;

              return (
                <Link
                  key={option.title}
                  to={option.to}
                  className="group flex min-h-[200px] gap-5 border-b border-[#d5c8b5] py-7 transition-colors duration-300 hover:bg-[#eae3d8]/60 max-[700px]:min-h-0"
                >
                  {/* Icon */}
                  <div className="shrink-0 pt-1">
                    <Icon
                      size={30}
                      strokeWidth={1.6}
                      className="text-[#c51f2b] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Option details */}
                  <div className="flex flex-1 flex-col items-start">
                    <h3 className="text-[23px] font-normal leading-snug tracking-[-0.035em] text-[#20211f] max-[700px]:text-[21px]">
                      {option.title}
                    </h3>

                    <p className="mt-3 text-[17px] leading-[1.8] text-[#6d6e67]">
                      {option.text}
                    </p>

                    <span className="mt-4 text-[15px] font-medium text-[#c51f2b]">
                      {option.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StartingPoint;