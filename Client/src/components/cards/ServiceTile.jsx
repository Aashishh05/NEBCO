import { useState } from "react";
import { Link } from "react-router-dom";
import { RotateCw, ArrowRight } from "lucide-react";

const ServiceTile = ({ service }) => {
  const [flipped, setFlipped] = useState(false);
  const { name, tagline, image, accentColor = "#b82026", scopeBullets = [], slug } = service;

  return (
    <div className="group relative h-[360px] w-full [perspective:1100px]">
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped
            ? "[transform:rotateY(180deg)]"
            : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden bg-dark [backface-visibility:hidden]">
          {image?.url && (
            <img src={image.url} alt={name} className="h-full w-full object-cover opacity-70" />
          )}
          <div className="absolute inset-0 flex flex-col justify-end gap-2 p-7">
            <h3 className="text-2xl font-extrabold text-white">{name}</h3>
            {tagline && <p className="text-[15px] text-white/80">{tagline}</p>}
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center gap-4 p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: accentColor }}
        >
          <h3 className="text-xl font-extrabold">{name}</h3>
          <ul className="space-y-2 text-[15px] text-white/90">
            {scopeBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 bg-white" />
                {bullet}
              </li>
            ))}
          </ul>
          {slug && (
            <Link
              to={`/${slug}`}
              className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold underline-offset-4 hover:underline"
            >
              Learn more
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-label={`Flip ${name}`}
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center bg-white/90 text-ink"
      >
        <RotateCw className="size-4" />
      </button>
    </div>
  );
};

export default ServiceTile;
