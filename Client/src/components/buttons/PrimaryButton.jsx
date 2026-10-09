import { Link } from "react-router-dom";

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
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
