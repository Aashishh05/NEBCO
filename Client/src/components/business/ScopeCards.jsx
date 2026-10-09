import { useDispatch } from "react-redux";
import { Check, ArrowRight } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import Container from "@/components/common/Container";

const ScopeCard = ({ id, title, text, points = [], ctaLabel }) => {
  const dispatch = useDispatch();

  return (
    <article
      id={id}
      className="border border-[#dedbd3] border-t-[3px] border-t-red bg-white p-[30px_30px_28px]"
    >
      <h2 className="text-[26px] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-[1.8] text-[#62675b]">{text}</p>

      {points.length > 0 && (
        <ul className="mt-5 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[14px] text-[#3d4039]">
              <Check className="mt-0.5 size-[17px] shrink-0 text-red" />
              {point}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => dispatch(openModal("enquiry"))}
        className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-red underline-offset-4 hover:underline"
      >
        {ctaLabel}
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
};

const ScopeCards = ({ cards = [] }) => {
  return (
    <section className="py-16 max-[700px]:py-12">
      <Container className="grid grid-cols-2 gap-[30px] max-[960px]:grid-cols-1">
        {cards.map((card) => (
          <ScopeCard key={card.title} {...card} />
        ))}
      </Container>
    </section>
  );
};

export { ScopeCard };
export default ScopeCards;
