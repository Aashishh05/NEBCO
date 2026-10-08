import { Link } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import NavDropdown from "./NavDropdown";
import MobileSheet from "./MobileSheet";
import { useDispatch } from "react-redux";
import { openMobileMenu } from "@/store/slices/uiSlice";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header className="sticky top-0 z-40 border-t-[3px] border-red bg-background">
        <Container className="flex h-24 items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="NEBCO home">
            <img
              src="/images/nebco-logo.png"
              alt="NEBCO"
              className="h-16 w-auto max-w-[220px] object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 max-[960px]:hidden">
            <NavDropdown />
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-2 text-[15px] font-semibold text-ink transition-colors hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden h-[53px] items-center gap-2 bg-red px-7 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-deep-red max-[960px]:hidden"
          >
            Discuss your project
            <ArrowRight className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => dispatch(openMobileMenu())}
            className="flex size-11 items-center justify-center text-ink min-[961px]:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-7" />
          </button>
        </Container>
      </header>

      <MobileSheet />
    </>
  );
};

export default Navbar;
