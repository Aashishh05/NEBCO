import Eyebrow from "./Eyebrow";

const SectionHeading = ({ eyebrow, title, description, className = "" }) => {
  return (
    <div
      className={`flex items-end justify-between gap-[45px] mb-[43px] max-[700px]:mb-[28px] max-[700px]:block ${className}`}
    >
      <div>
        {eyebrow && <Eyebrow className="mb-[19px]">{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="font-normal leading-[1.15] tracking-[-0.04em] text-ink text-[44px] max-[700px]:text-[34px]">
            {title}
          </h2>
        )}
      </div>

      {description && (
        <p className="min-w-[265px] max-w-[350px] text-[16px] leading-[1.85] text-[#676b61] max-[700px]:mt-[16px] max-[700px]:min-w-0">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
