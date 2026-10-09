import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const TalkCta = ({ eyebrow = "Let’s talk about your project" }) => {
  const dispatch = useDispatch();

  return (
    <section className="service-contact">
      <div className="container">
        <div>
          <p className="eyebrow">
            <span />
            {eyebrow}
          </p>
          <h2>
            A conversation is
            <br />a good place to start.
          </h2>
        </div>

        <PrimaryButton onClick={() => dispatch(openModal("appointment"))}>
          Schedule a call
        </PrimaryButton>
      </div>
    </section>
  );
};

export default TalkCta;
