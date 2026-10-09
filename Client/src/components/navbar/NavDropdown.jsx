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
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-red"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Our businesses
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full w-[325px] border border-border bg-white py-2 shadow-lg">
          {businessLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-muted hover:text-red"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
