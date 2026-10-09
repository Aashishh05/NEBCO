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
  const classes = `button ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
        <ArrowRight />
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
      <ArrowRight />
    </button>
  );
};

export default PrimaryButton;
