import { useDispatch } from "react-redux";
import { Video, Images, FileCheck2 } from "lucide-react";
import { openModal } from "@/store/slices/uiSlice";
import { IMAGES } from "@/utils/constants";
import Container from "@/components/common/Container";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const points = [
  { icon: Video, text: "Conversations around your time zone" },
  { icon: Images, text: "Site updates and progress reviews" },
  { icon: FileCheck2, text: "Written approvals for key decisions" },
];

const Overseas = () => {
  const dispatch = useDispatch();

  return (
    <section
      id="overseas"
      className="border-t-[5px] border-[#9b7c4f] bg-[#242925] py-[76px] text-[#f6f4ed] max-[700px]:py-[52px]"
    >
      <Container className="grid grid-cols-2 items-center gap-[88px] max-[1200px]:gap-[55px] max-[960px]:gap-[38px] max-[700px]:grid-cols-1 max-[700px]:gap-9">
        <div>
          <p className="mb-[23px] flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#cdbd9f]">
            <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-[#bda178]" />
            Overseas clients
          </p>

          <h2 className="text-[46px] font-normal leading-[1.24] tracking-[-0.04em] max-[1200px]:text-[40px] max-[700px]:text-[35px]">
            Your life is abroad.
            <br />
            Your vision is <em className="not-italic text-[#cdbd9c]">here.</em>
          </h2>

          <p className="mt-[22px] max-w-[435px] text-[16px] leading-[1.85] text-[#cbd0c6]">
            Build, develop or explore a project partnership in Nepal with a local team that
            keeps you involved.
          </p>

          <ul className="my-[28px] grid gap-4">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-4 text-[15px] text-[#e8e9e3]">
                <point.icon className="size-5 shrink-0 text-[#cdbd9f]" />
                {point.text}
              </li>
            ))}
          </ul>

          <PrimaryButton
            onClick={() => dispatch(openModal("appointment"))}
            className="!bg-white !text-ink hover:!bg-[#efede8]"
          >
            Schedule an online call
          </PrimaryButton>
        </div>

        <div className="relative h-[458px] overflow-hidden bg-[#656a54] max-[700px]:h-[300px]">
          <img
            src={IMAGES.overseas}
            alt="Illustrative contemporary Nepali home with welcoming warm lights"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(36,41,37,0.85)_0%,rgba(36,41,37,0)_55%)]" />

          <div className="absolute bottom-[30px] left-8 right-6 text-white">
            <span className="text-[13px] font-semibold text-[#d5c49e]">Closer to home.</span>
            <p className="mt-1 text-[17px] leading-[1.5]">
              A place for your future in Nepal.
            </p>
          </div>

          <span className="absolute bottom-[11px] right-[15px] text-[12px] text-[#eee6d2]">
            Architectural concept
          </span>
        </div>
      </Container>
    </section>
  );
};

export default Overseas;
