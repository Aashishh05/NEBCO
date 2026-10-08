import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import { closeMobileMenu } from "@/store/slices/uiSlice";

const sections = [
  {
    title: "What we do",
    links: [
      { label: "Construction", to: "/construction" },
      { label: "Consulting", to: "/consulting" },
      { label: "Investments", to: "/investments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Projects", to: "/projects" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const MobileSheet = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.mobileMenuOpen);
  const [expanded, setExpanded] = useState("What we do");

  const close = () => dispatch(closeMobileMenu());

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 min-[961px]:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      <aside className="absolute right-0 top-0 flex h-full w-[min(390px,90%)] flex-col overflow-y-auto bg-background">
        <div className="flex h-24 items-center justify-between border-t-[3px] border-red px-6">
          <img
            src="/images/nebco-logo.png"
            alt="NEBCO"
            className="h-16 w-auto max-w-[200px] object-contain"
          />
          <button
            type="button"
            onClick={close}
            className="flex size-11 items-center justify-center text-ink"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-col border-t border-border">
          {sections.map((section) => {
            const isOpen = expanded === section.title;
            return (
              <div key={section.title} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? "" : section.title)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-[15px] font-semibold text-ink"
                  aria-expanded={isOpen}
                >
                  {section.title}
                  {isOpen ? (
                    <Minus className="size-4 text-red" />
                  ) : (
                    <Plus className="size-4 text-red" />
                  )}
                </button>

                {isOpen && (
                  <div className="bg-muted pb-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={close}
                        className="block px-6 py-3 text-[15px] text-ink transition-colors hover:text-red"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6">
          <Link
            to="/contact"
            onClick={close}
            className="flex h-[53px] items-center justify-center gap-2 bg-red text-[14px] font-semibold text-white transition-colors hover:bg-deep-red"
          >
            Discuss your project
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default MobileSheet;
