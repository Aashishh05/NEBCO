import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/uiSlice";
import { IMAGES } from "@/utils/constants";
import Container from "@/components/common/Container";

const Hero = () => {
  const dispatch = useDispatch();

  return (
    <section className="relative min-h-[750px] overflow-hidden bg-[#f1f0ec] max-[960px]:min-h-[660px] max-[700px]:flex max-[700px]:min-h-0 max-[700px]:flex-col">
      {/* Hero image */}
      <div className="absolute inset-y-0 right-0 w-[72%] max-[960px]:w-[78%] max-[700px]:static max-[700px]:order-2 max-[700px]:h-[260px] max-[700px]:w-full">
        <img
          src={IMAGES.hero}
          alt="Illustrative architectural concept of a contemporary building in Nepal"
          className="h-full w-full object-cover object-[50%_73%] max-[700px]:object-[65%_50%]"
        />
      </div>

      {/* Left fade */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#f1f0ec_0%,#f1f0ecf5_30%,#f1f0eccc_42%,#f1f0ec00_64%)] max-[700px]:hidden" />

      {/* Content */}
      <Container className="relative z-10 pt-[90px] pb-[60px] max-[700px]:order-1 max-[700px]:pt-[38px] max-[700px]:pb-[30px]">
        {/* Eyebrow */}
        <p className="flex items-center gap-[15px] text-[14px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#5d5d56] max-[700px]:text-[12px]">
          <span aria-hidden="true" className="h-[2px] w-[30px] shrink-0 bg-red" />
          A-Class construction company · Nepal
        </p>

        {/* Heading */}
        <h1 className="mt-6 text-[clamp(64px,5.7vw,108px)] font-normal leading-[1.1] tracking-[-0.06em] text-ink max-[960px]:text-[68px] max-[700px]:text-[clamp(41px,11.1vw,68px)]">
          From land to
          <br />
          <strong className="text-[1.15em] font-bold uppercase leading-[1.1] text-red max-[700px]:text-[1.08em]">
            landmark.
          </strong>
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-[24px] font-medium leading-[1.5] tracking-[-0.02em] text-ink max-[700px]:text-[18px]">
          Construction. Consulting. Investments.
        </p>

        {/* Description */}
        <p className="mt-3 max-w-[540px] text-[22px] leading-[1.8] text-[#51544d] max-[700px]:max-w-[320px] max-[700px]:text-[17px]">
          Construction, development consulting and real estate partnerships in
          Nepal—built on experience since 2001.
        </p>

        {/* Actions */}
        <div className="mt-9 flex items-center gap-9 max-[700px]:mt-7 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-4">
          <button
            type="button"
            onClick={() => dispatch(openModal("enquiry"))}
            className="bg-red px-8 py-[21px] text-[19px] font-medium leading-none text-white transition-colors duration-300 hover:bg-[#a5191f] max-[700px]:py-4 max-[700px]:text-[16px]"
          >
            Discuss your project
          </button>

          <a
            href="#businesses"
            className="border-b border-ink pb-[2px] text-[19px] font-medium leading-snug text-ink transition-colors duration-300 hover:border-red hover:text-red max-[700px]:text-[16px]"
          >
            Explore NEBCO
          </a>
        </div>

        {/* Tagline */}
        <p className="mt-12 flex items-center gap-[14px] text-[17px] tracking-[0.02em] text-[#606459] max-[700px]:mt-7 max-[700px]:text-[14px]">
          <span aria-hidden="true" className="h-px w-[38px] shrink-0 bg-[#8a8d82]" />
          Quality. Integrity. Timely.
        </p>
      </Container>

      {/* Image caption */}
      <span className="absolute bottom-5 right-7 bg-black/70 px-3 py-2 text-[15px] leading-none text-white max-[700px]:bottom-2 max-[700px]:right-3 max-[700px]:text-[11px]">
        Architectural concept · illustrative
      </span>
    </section>
  );
};

export default Hero;
