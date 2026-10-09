import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal, openMobileMenu } from "@/store/slices/uiSlice";
import NavDropdown from "./NavDropdown";
import MobileSheet from "./MobileSheet";

const navLinks = [
  { label: "Our experience", to: "/#experience" },
  { label: "About NEBCO", to: "/#about" },
  { label: "Overseas clients", to: "/#overseas" },
];

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <Link to="/" className="brand" aria-label="NEBCO home">
            <img
              src="/images/nebco-logo.png"
              alt="NEBCO — Quality, Integrity, Timely"
              width="400"
              height="446"
            />
          </Link>

          <div className="desktop-nav">
            <NavDropdown />
            <nav aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className="button header-cta"
            onClick={() => dispatch(openModal("enquiry"))}
          >
            Discuss your project
            
          </button>

          <button
            type="button"
            className="mobile-menu"
            onClick={() => dispatch(openMobileMenu())}
            aria-label="Open navigation"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <MobileSheet />
    </>
  );
};

export default Navbar;
