import { useDispatch } from "react-redux";
import { ArrowRight } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import { IMAGES } from "@/utils/constants";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const Hero = () => {
  const dispatch = useDispatch();

  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="hero-image">
        <img
          src={IMAGES.hero}
          alt="Illustrative architectural concept of a contemporary building in Nepal"
          width="1672"
          height="941"
          fetchPriority="high"
        />
      </div>

      <div className="hero-shade" />

      <div className="container hero-content">
        <p className="eyebrow">
          <span />
          A-Class construction company · Nepal
        </p>

        <h1 id="hero-heading">
          From land to
          <br />
          <strong>landmark.</strong>
        </h1>

        <p className="hero-businesses">Construction. Consulting. Investments.</p>

        <p className="hero-description">
          Construction, development consulting and real estate partnerships in Nepal—built on
          experience since 2001.
        </p>

        <div className="hero-actions">
          <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>
            Discuss your project
          </PrimaryButton>
          <a className="text-link" href="#businesses">
            Explore NEBCO
            <ArrowRight />
          </a>
        </div>

        <div className="hero-location">
          <span />
          Quality. Integrity. Timely.
        </div>
      </div>

      <span className="hero-caption">Architectural concept · illustrative</span>
    </section>
  );
};

export default Hero;
