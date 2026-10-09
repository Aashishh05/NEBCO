import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const BusinessCard = ({ name, shortName, slug, tagline, audience, description, image, accentColor, scopeBullets = [] }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="group relative [perspective:1200px]">
      <div className="relative border border-[#dedbd3] border-t-[3px] border-t-red bg-white">
        <div className="[perspective:1100px]">
          <button
            type="button"
            onClick={() => setFlipped((value) => !value)}
            aria-label={`Reveal ${shortName} services`}
            aria-pressed={flipped}
            className="relative block h-[222px] w-full"
          >
            <span
              className={`relative block h-full w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${
                flipped
                  ? "[transform:rotateY(180deg)]"
                  : "group-hover:[transform:rotateY(180deg)]"
              }`}
            >
              <span className="absolute inset-0 overflow-hidden bg-[#e9e3d9] [backface-visibility:hidden]">
                <img src={image} alt={name} className="h-full w-full object-cover" />
              </span>

              <span
                className="absolute inset-0 flex flex-col overflow-hidden p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backgroundColor: accentColor }}
              >
                <span className="mb-[9px] block text-[12px] uppercase tracking-[0.08em] text-white/75">
                  {name}
                </span>
                <span className="mb-[13px] block max-w-[290px] text-[23px] font-medium leading-[1.3] tracking-[-0.025em]">
                  {tagline}
                </span>
                <span className="grid gap-[7px] text-[14px] leading-[1.45]">
                  {scopeBullets.slice(0, 3).map((bullet) => (
                    <span key={bullet} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" />
                      {bullet}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </button>
        </div>

        <Link to={`/${slug}`} className="block border-t-[3px] border-t-red px-[26px] pb-[23px] pt-[25px]">
          <p className="mb-[11px] min-h-[20px] text-[12px] text-[#676b61]">{audience}</p>
          <h3 className="text-[30px] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
            {shortName}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#676b61]">{description}</p>
          <span className="mt-5 flex items-center justify-between gap-[10px] border-t border-[#dedbd3] pt-[19px] text-[14px] font-semibold text-red">
            Explore {shortName.toLowerCase()}
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
