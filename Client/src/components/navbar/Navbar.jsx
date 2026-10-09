import { Link } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import Container from "@/components/common/Container";
import NavDropdown from "./NavDropdown";
import MobileSheet from "./MobileSheet";
import { openModal, openMobileMenu } from "@/store/slices/uiSlice";

const navLinks = [
  { label: "Our experience", to: "/#experience" },
  { label: "About NEBCO", to: "/#about" },
  { label: "Overseas clients", to: "/#overseas" },
];

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header className="relative z-20 border-t-[3px] border-red border-b border-[#deded7]/40 bg-white">
        <Container className="flex h-24 items-center justify-between gap-7 max-[700px]:h-[88px]">
          <Link to="/" className="flex items-center" aria-label="NEBCO home">
            <img
              src="/images/nebco-logo.png"
              alt="NEBCO — Quality, Integrity, Timely"
              className="h-[74px] w-auto max-w-[220px] object-contain max-[700px]:h-[61px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 max-[960px]:hidden max-[1200px]:gap-5">
            <NavDropdown />
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-2 text-[14px] font-semibold text-ink transition-colors hover:text-red max-[1200px]:text-[13px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => dispatch(openModal("enquiry"))}
            className="hidden h-[53px] items-center gap-2 bg-red px-7 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-deep-red max-[960px]:ml-auto max-[960px]:flex max-[1200px]:px-5 max-[1200px]:text-[13px] max-[700px]:h-11"
          >
            Discuss your project
            <ArrowRight className="size-4 max-[700px]:size-3.5" />
          </button>

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
