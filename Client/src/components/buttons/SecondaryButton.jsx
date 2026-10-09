import { Link } from "react-router-dom";

const SecondaryButton = ({
  children,
  to,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const classes = `inline-flex h-[53px] items-center justify-center gap-2 border border-ink bg-transparent px-7 text-[14px] font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-60 ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
};

export default SecondaryButton;
