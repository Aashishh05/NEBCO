import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PrimaryButton = ({
  children,
  to,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const classes = `inline-flex h-[53px] items-center justify-center gap-2 bg-red px-7 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-deep-red disabled:pointer-events-none disabled:opacity-60 ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
        <ArrowRight className="size-4" />
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
      <ArrowRight className="size-4" />
    </button>
  );
};

export default PrimaryButton;
