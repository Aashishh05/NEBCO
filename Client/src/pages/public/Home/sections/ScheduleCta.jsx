import { useDispatch } from "react-redux";
import { CalendarDays } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const ScheduleCta = () => {
  const dispatch = useDispatch();

  return (
    <section id="schedule" className="schedule-section" aria-labelledby="schedule-heading">
      <div className="container schedule-grid">
        <div>
          <p className="eyebrow">
            <span />
            Let's talk about what comes next
          </p>
          <h2 id="schedule-heading">
            Let's talk about
            <br />
            your <em>next project.</em>
          </h2>
          <p>
            A home, a development or a partnership.
            <br />
            Let's understand what you have in mind.
          </p>
        </div>

        <div className="schedule-card">
          <CalendarDays />
          <h3>Schedule a call</h3>
          <p>
            Choose a convenient time.
            <br />
            Our team will confirm it with you.
          </p>

          <PrimaryButton onClick={() => dispatch(openModal("appointment"))}>
            Find a time to talk
          </PrimaryButton>

          <span>In Nepal or overseas. We'll connect.</span>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCta;
