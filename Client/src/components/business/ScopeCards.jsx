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
              <Check />
              {point}
            </li>
          ))}
        </ul>
      )}

      <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>{ctaLabel}</PrimaryButton>
    </article>
  );
};

const ScopeCards = ({ cards = [] }) => {
  return (
    <div className="container">
      <div className="service-scope">
        {cards.map((card) => (
          <ScopeCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export { ScopeCard };
export default ScopeCards;
