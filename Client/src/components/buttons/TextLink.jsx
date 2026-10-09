import { Link } from "react-router-dom";

const TextLink = ({ children, to, onClick, className = "", ...props }) => {
  const classes = `text-link ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} {...props}>
        {children}
      </button>
    );
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

export default TextLink;
