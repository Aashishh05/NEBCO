import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OptionCard = ({ title, text, label, to, icon: Icon, onClick }) => {
  const content = (
    <>
      {Icon && <Icon className="mt-1 size-6 shrink-0 text-red" />}
      <div>
        <h3 className="text-[18px] font-semibold leading-[1.35] tracking-[-0.02em] text-ink">
          {title}
        </h3>
        <p className="mt-1 text-[15px] leading-[1.65] text-[#676b61]">{text}</p>
        <span className="mt-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a8d82]">
          {label}
          <ArrowRight className="size-3.5 text-red" />
        </span>
      </div>
    </>
  );

  const classes =
    "flex items-start gap-5 border-b border-[#d8cdb8] py-6 text-left transition-colors hover:bg-white/40";

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`w-full ${classes}`}>
      {content}
    </button>
  );
};

export default OptionCard;
