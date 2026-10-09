import { useDispatch } from "react-redux";
import { ArrowRight } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import { IMAGES } from "@/utils/constants";
import Container from "@/components/common/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const Hero = () => {
  const dispatch = useDispatch();

  return (
    <section className="relative min-h-[640px] overflow-hidden bg-[#eeefec] max-[960px]:min-h-[620px] max-[700px]:flex max-[700px]:min-h-0 max-[700px]:flex-col">
      <div className="absolute inset-y-0 right-0 w-[64%] max-[960px]:w-[73%] max-[700px]:static max-[700px]:order-2 max-[700px]:h-[260px] max-[700px]:w-full">
        <img
          src={IMAGES.hero}
          alt="Illustrative architectural concept of a contemporary building in Nepal"
          className="h-full w-full object-cover object-[50%_73%] max-[700px]:object-[65%_50%]"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#efefec_0%,#efefecf8_27%,#efefecb5_45%,#efefec00_72%)] max-[700px]:hidden" />

      <Container className="relative z-10 pt-[70px] pb-[38px] max-[700px]:order-1 max-[700px]:pt-[38px] max-[700px]:pb-[30px]">
        <p className="flex max-w-[320px] items-center gap-[9px] text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-[#62645d]">
          <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-red" />
          A-Class construction company · Nepal
        </p>

        <h1 className="mt-5 max-w-[830px] text-[clamp(64px,6.2vw,88px)] font-normal leading-[1.04] tracking-[-0.06em] text-ink max-[1200px]:text-[75px] max-[960px]:text-[68px] max-[700px]:text-[clamp(41px,11.1vw,68px)]">
          From land to
          <br />
          <strong className="text-[1.25em] font-bold leading-[1.1] text-red max-[700px]:text-[1.12em]">
            landmark.
          </strong>
        </h1>

        <p className="mt-[22px] text-[18px] font-semibold leading-[1.6] tracking-[-0.02em] text-ink max-[700px]:text-[14px]">
          Construction. Consulting. Investments.
        </p>

        <p className="mt-[10px] max-w-[470px] text-[17px] leading-[1.8] text-[#51544d] max-[700px]:max-w-[300px] max-[700px]:text-[16px]">
          Construction, development consulting and real estate partnerships in Nepal—built on
          experience since 2001.
        </p>

        <div className="mt-7 flex items-center gap-[30px] max-[700px]:mt-[25px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[10px]">
          <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>
            Discuss your project
          </PrimaryButton>

          <a
            href="#businesses"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink underline-offset-4 hover:text-red hover:underline"
          >
            Explore NEBCO
            <ArrowRight className="size-4" />
          </a>
        </div>

        <p className="mt-[41px] flex items-center gap-3 text-[12px] tracking-[0.025em] text-[#606459] max-[700px]:mt-[25px]">
          <span aria-hidden="true" className="h-px w-[30px] shrink-0 bg-gold" />
          Quality. Integrity. Timely.
        </p>
      </Container>

      <span className="absolute bottom-7 right-6 text-[12px] tracking-[0.18em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] [writing-mode:vertical-rl] max-[700px]:bottom-2 max-[700px]:right-3 max-[700px]:text-[10px]">
        Architectural concept · illustrative
      </span>
    </section>
  );
};

export default Hero;
