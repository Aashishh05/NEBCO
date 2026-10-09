import { useDispatch } from "react-redux";
import { CalendarDays } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import Container from "@/components/common/Container";
import Eyebrow from "@/components/common/Eyebrow";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const ScheduleCta = () => {
  const dispatch = useDispatch();

  return (
    <section id="schedule" className="py-[66px] max-[700px]:py-[53px]">
      <Container className="grid grid-cols-[1.25fr_0.75fr] items-center gap-[100px] max-[1200px]:gap-[70px] max-[960px]:grid-cols-[1.1fr_0.9fr] max-[700px]:grid-cols-1 max-[700px]:gap-7">
        <div>
          <Eyebrow className="mb-[23px]">Let's talk about what comes next</Eyebrow>
          <h2 className="text-[clamp(42px,4.6vw,65px)] font-normal leading-[1.14] tracking-[-0.055em] text-ink max-[700px]:text-[44px]">
            Let's talk about
            <br />
            your <em className="not-italic text-red">next project.</em>
          </h2>
          <p className="mt-[23px] text-[17px] leading-[1.8] text-[#62665b] max-[700px]:text-[16px]">
            A home, a development or a partnership.
            <br />
            Let's understand what you have in mind.
          </p>
        </div>

        <div className="border-t-[3px] border-red bg-background p-[32px_33px] shadow-[0_4px_24px_#43381b05] max-[700px]:p-[28px_25px]">
          <CalendarDays className="size-6 text-red" />
          <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-ink">
            Schedule a call
          </h3>
          <p className="mt-2 text-[15px] leading-[1.75] text-[#676b61]">
            Choose a convenient time.
            <br />
            Our team will confirm it with you.
          </p>

          <div className="mt-6">
            <PrimaryButton
              onClick={() => dispatch(openModal("appointment"))}
              className="w-full"
            >
              Find a time to talk
            </PrimaryButton>
          </div>

          <span className="mt-4 block text-[13px] text-[#8a8d82]">
            In Nepal or overseas. We'll connect.
          </span>
        </div>
      </Container>
    </section>
  );
};

export default ScheduleCta;
