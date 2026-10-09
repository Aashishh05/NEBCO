import Eyebrow from "./Eyebrow";

const SectionHeading = ({ eyebrow, title, description, align = "left", className = "" }) => {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="text-3xl font-extrabold leading-tight text-ink max-[700px]:text-2xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-[640px] text-[17px] leading-relaxed text-muted-fg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
