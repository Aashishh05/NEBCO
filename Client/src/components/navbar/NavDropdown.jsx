import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const businessLinks = [
  { label: "Construction", to: "/construction" },
  { label: "Consulting", to: "/consulting" },
  { label: "Investments", to: "/investments" },
];

const NavDropdown = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="business-menu-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        Our businesses
        <ChevronDown className="size-3.5" />
      </button>

      {open && (
        <div className="business-menu-panel">
          {businessLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
