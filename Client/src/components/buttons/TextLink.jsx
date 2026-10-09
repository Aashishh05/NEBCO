import { Link } from "react-router-dom";

const TextLink = ({ children, to, className = "", ...props }) => {
  const classes = `inline-flex items-center gap-1 font-semibold text-red underline-offset-4 transition-colors hover:text-deep-red hover:underline ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

export default TextLink;
