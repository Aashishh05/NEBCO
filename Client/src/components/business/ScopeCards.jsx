import { useDispatch } from "react-redux";
import { Check } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const ScopeCard = ({ id, title, text, points = [], ctaLabel }) => {
  const dispatch = useDispatch();

  return (
    <article id={id}>
      <h2>{title}</h2>
      <p>{text}</p>

      {points.length > 0 && (
        <ul>
          {points.map((point) => (
            <li key={point}>
              <Check size={17} />
              {point}
            </li>
          ))}
        </ul>
      )}

      <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>{ctaLabel}</PrimaryButton>
    </article>
  );
};

const ScopeCards = ({ cards = [], label = "Construction scope" }) => {
  return (
    <section className="service-scope container" aria-label={label}>
      {cards.map((card) => (
        <ScopeCard key={card.title} {...card} />
      ))}
    </section>
  );
};

export { ScopeCard };
export default ScopeCards;
