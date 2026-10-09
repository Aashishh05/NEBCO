import { useDispatch } from "react-redux";
import { Video, Images, FileCheck2 } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import { IMAGES } from "@/utils/constants";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const points = [
  { icon: Video, text: "Conversations around your time zone" },
  { icon: Images, text: "Site updates and progress reviews" },
  { icon: FileCheck2, text: "Written approvals for key decisions" },
];

const Overseas = () => {
  const dispatch = useDispatch();

  return (
    <section id="overseas" className="overseas-section" aria-labelledby="overseas-heading">
      <div className="container overseas-grid">
        <div className="overseas-copy">
          <p className="eyebrow">
            <span />
            Overseas clients
          </p>
          <h2 id="overseas-heading">
            Your life is abroad.
            <br />
            Your vision is <em>here.</em>
          </h2>
          <p>
            Build, develop or explore a project partnership in Nepal with a local team that
            keeps you involved.
          </p>

          <ul className="overseas-benefits">
            {points.map((point) => (
              <li key={point.text}>
                <point.icon />
                {point.text}
              </li>
            ))}
          </ul>

          <PrimaryButton
            className="light-button"
            onClick={() => dispatch(openModal("appointment"))}
          >
            Schedule an online call
          </PrimaryButton>
        </div>

        <div className="overseas-visual">
          <img
            src={IMAGES.overseas}
            alt="Illustrative contemporary Nepali home with welcoming warm lights"
            width="1448"
            height="1086"
            loading="lazy"
          />
          <div className="overseas-image-overlay" />

          <div className="overseas-photo-copy">
            <span>Closer to home.</span>
            <p>A place for your future in Nepal.</p>
          </div>

          <span className="overseas-concept-note">Architectural concept</span>
        </div>
      </div>
    </section>
  );
};

export default Overseas;
