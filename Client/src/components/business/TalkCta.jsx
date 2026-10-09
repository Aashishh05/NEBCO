import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const TalkCta = ({ eyebrow, title, text }) => {
  const dispatch = useDispatch();

  return (
    <section className="service-contact">
      <div className="container">
        <div>
          {eyebrow && (
            <p className="eyebrow">
              <span />
              {eyebrow}
            </p>
          )}
          <h2>{title || "A conversation is a good place to start."}</h2>
          {text && <p>{text}</p>}
        </div>

        <PrimaryButton onClick={() => dispatch(openModal("appointment"))}>
          Schedule a call
        </PrimaryButton>
      </div>
    </section>
  );
};

export default TalkCta;
