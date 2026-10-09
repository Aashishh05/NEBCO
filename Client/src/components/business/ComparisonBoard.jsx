import { useDispatch } from "react-redux";
import { Check, ArrowRight } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import Container from "@/components/common/Container";

const ComparisonBoard = ({ eyebrow, lead, text, points = [], browse, note, ctaLabel }) => {
  const dispatch = useDispatch();

  return (
    <section className="border-y border-[#ddd8cd] bg-[#efede8] py-[70px] max-[700px]:py-[50px]">
      <Container>
        <p className="mb-[19px] flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#62645d]">
          <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-red" />
          {eyebrow}
        </p>

        <div className="grid min-h-[360px] grid-cols-[0.9fr_1.1fr] gap-[42px] border border-[#d8cdb8] bg-background p-[36px_39px] max-[960px]:grid-cols-1 max-[700px]:p-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#d8cdb8] bg-white p-5">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#8a8d82]">
                  Separate appointments
                </span>
              </div>
              <div className="border border-red bg-red p-5 text-white">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em]">
                  Through NEBCO
                </span>
              </div>
            </div>

            <span className="mt-7 block text-[13px] font-bold uppercase tracking-[0.12em] text-red">
              {lead}
            </span>
            <h3 className="mt-3 max-w-[340px] text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
              {text}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.8] text-[#62675b]">{browse}</p>
          </div>

          <div>
            <div className="relative border border-[#3b4236] bg-[#262b25] p-[24px_27px] text-white">
              <span className="text-[11px] uppercase tracking-[0.11em] text-[#d5c49e]">
                Your project · Brought together
              </span>
              <div className="mt-4 border-y border-[#d44649] bg-red py-5 px-1">
                <span className="text-[12px] uppercase tracking-[0.1em] text-white/75">
                  Your delivery lead
                </span>
                <strong className="mt-1 block text-[20px] font-semibold">NEBCO Consulting</strong>
                <p className="mt-1 text-[13px] text-white/80">
                  One lead for agreed development coordination.
                </p>
              </div>

              <ul className="mt-5 grid gap-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[14px] text-[#e8e9e3]">
                    <Check className="mt-0.5 size-[17px] shrink-0 text-[#d5c49e]" />
                    {point}
                  </li>
                ))}
              </ul>

              {note && (
                <p className="mt-5 border-t border-[#c5ae7655] pt-4 text-[12px] leading-[1.7] text-[#d2cbbf]">
                  {note}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => dispatch(openModal("enquiry"))}
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-red underline-offset-4 hover:underline"
            >
              {ctaLabel}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonBoard;
