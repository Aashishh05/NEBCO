import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const BusinessHero = ({ name, title, description, ctaLabel, image, imageCaption }) => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Link to="/#businesses" className="service-back">
        NEBCO / Our businesses
      </Link>

      <div className="service-hero">
        <div>
          <p className="eyebrow">
            <span />
            {name}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
          <PrimaryButton onClick={() => dispatch(openModal("enquiry"))}>
            {ctaLabel}
          </PrimaryButton>
        </div>

        <figure>
          {image && (
            <img src={image} alt={`${name} illustrative concept`} width="1536" height="1024" />
          )}
          <figcaption>{imageCaption || "Illustrative architectural concept"}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default BusinessHero;
