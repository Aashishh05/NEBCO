import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus } from "lucide-react";
import { closeMobileMenu, openModal } from "@/store/slices/uiSlice";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const sections = [
  {
    title: "Our businesses",
    links: [
      { label: "Construction", to: "/construction" },
      { label: "Consulting", to: "/consulting" },
      { label: "Investments", to: "/investments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our experience", to: "/#experience" },
      { label: "About NEBCO", to: "/#about" },
      { label: "Overseas clients", to: "/#overseas" },
    ],
  },
];

const MobileSheet = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.mobileMenuOpen);
  const [expanded, setExpanded] = useState("Our businesses");

  const close = () => dispatch(closeMobileMenu());

  if (!open) return null;

  return (
    <div
      className="min-[961px]:hidden"
      style={{ position: "fixed", inset: 0, zIndex: 50 }}
    >
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
        onClick={close}
      />

      <aside
        className="navigation-sheet"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          background: "var(--background)",
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close navigation"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 44,
            height: 44,
            display: "grid",
            placeItems: "center",
            background: "none",
            border: 0,
            cursor: "pointer",
          }}
        >
          <X className="size-6" />
        </button>

        <nav>
          {sections.map((section) => {
            const isOpen = expanded === section.title;
            return (
              <div key={section.title}>
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? "" : section.title)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    borderBottom: "1px solid var(--border)",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    fontFamily: "inherit",
                    fontSize: 18,
                    background: "none",
                    border: 0,
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  {section.title}
                  {isOpen ? (
                    <Minus className="size-4 text-red" />
                  ) : (
                    <Plus className="size-4 text-red" />
                  )}
                </button>

                {isOpen &&
                  section.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={close}
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            );
          })}
        </nav>

        <PrimaryButton
          onClick={() => {
            close();
            dispatch(openModal("enquiry"));
          }}
        >
          Discuss your project
        </PrimaryButton>
      </aside>
    </div>
  );
};

export default MobileSheet;
