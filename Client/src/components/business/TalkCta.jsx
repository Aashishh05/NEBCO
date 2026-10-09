import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/uiSlice";
import Container from "@/components/common/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const TalkCta = ({ eyebrow = "Let's talk about your project", title, text }) => {
  const dispatch = useDispatch();

  return (
    <section className="bg-dark text-white">
      <Container className="flex items-center justify-between gap-10 py-[62px] max-[960px]:flex-col max-[960px]:items-start max-[700px]:py-11">
        <div>
          <p className="mb-[19px] flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#cdbd9f]">
            <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-[#bda178]" />
            {eyebrow}
          </p>
          <h2 className="text-[clamp(34px,3.6vw,50px)] font-normal leading-[1.14] tracking-[-0.05em]">
            {title || (
              <>
                A conversation is
                <br />a good place to start.
              </>
            )}
          </h2>
          {text && <p className="mt-4 max-w-[520px] text-[16px] text-white/70">{text}</p>}
        </div>

        <PrimaryButton
          onClick={() => dispatch(openModal("appointment"))}
          className="shrink-0 !bg-white !text-ink hover:!bg-[#efede8]"
        >
          Schedule a call
        </PrimaryButton>
      </Container>
    </section>
  );
};

export default TalkCta;
