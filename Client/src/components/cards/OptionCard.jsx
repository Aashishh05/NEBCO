import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OptionCard = ({ title, text, to, icon: Icon, onClick }) => {
  const content = (
    <div className="flex h-full flex-col gap-3 border border-border bg-white p-7 transition-colors hover:border-red">
      {Icon && <Icon className="size-7 text-red" />}
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      {text && <p className="flex-1 text-[15px] leading-relaxed text-muted-fg">{text}</p>}
      <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-red">
        Get started
        <ArrowRight className="size-4" />
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      {content}
    </button>
  );
};

export default OptionCard;
