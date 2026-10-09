import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const BusinessCard = ({
  name,
  shortName,
  slug,
  tagline,
  audience,
  description,
  image,
  scopeBullets = [],
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`business-card-shell business-${slug}`}>
      <div className="business-card">
        <button
          type="button"
          className={`tile-visual tile-visual-control ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((value) => !value)}
          aria-pressed={flipped}
          aria-label={`Reveal ${shortName} services`}
        >
          <span className="tile-rotator">
            <span className="tile-front" aria-hidden={flipped}>
              <img
                src={image}
                alt={`${name} illustrative concept`}
                width="1536"
                height="1024"
                loading="lazy"
              />
            </span>

            <span className="tile-back" aria-hidden={!flipped}>
              <span className="tile-back-label">{name}</span>
              <span className="tile-back-heading">{tagline}</span>
              <span className="tile-scope-list">
                {scopeBullets.slice(0, 3).map((bullet) => (
                  <span key={bullet}>
                    <Check />
                    {bullet}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </button>

        <Link to={`/${slug}`} className="tile-copy" aria-label={`Explore ${name}`}>
          <p className="business-audience">{audience}</p>
          <h3>{shortName}</h3>
          <p className="tile-description">{description}</p>
          <span className="business-link">Explore {shortName.toLowerCase()}</span>
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
