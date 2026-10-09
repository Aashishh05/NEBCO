import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "@/store/slices/uiSlice";
import Container from "@/components/common/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const BusinessHero = ({ name, title, description, ctaLabel, image, imageCaption }) => {
  const dispatch = useDispatch();

  return (
    <section className="border-b border-[#e2ded6] bg-background">
      <Container className="py-[54px] max-[700px]:py-[38px]">
        <nav className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a8d82]">
          <Link to="/" className="transition-colors hover:text-red">
            NEBCO
          </Link>
          <span>/</span>
          <span className="text-[#62675b]">Our businesses</span>
        </nav>

        <div className="mt-9 grid grid-cols-[1.05fr_0.95fr] items-center gap-[70px] max-[960px]:grid-cols-1 max-[960px]:gap-8">
          <div>
            <p className="mb-[18px] flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#62645d]">
              <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-red" />
              {name}
            </p>

            <h1 className="max-w-[590px] text-[54px] font-medium leading-[1.12] tracking-[-0.055em] text-ink max-[1200px]:text-[46px] max-[700px]:text-[36px]">
              {title}
            </h1>

            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.85] text-[#656b5f] max-[700px]:text-[16px]">
              {description}
            </p>

            <div className="mt-8">
              <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>
                {ctaLabel}
              </PrimaryButton>
            </div>
          </div>

          <div className="relative h-[420px] overflow-hidden bg-[#e9e3d9] max-[960px]:h-[300px] max-[700px]:h-[240px]">
            {image && (
              <img src={image} alt={`${name} concept`} className="h-full w-full object-cover" />
            )}
            <span className="absolute bottom-[11px] right-[15px] text-[12px] text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
              {imageCaption || "Illustrative architectural concept"}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BusinessHero;
