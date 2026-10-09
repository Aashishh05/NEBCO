import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowUp } from "lucide-react";
import { getContact } from "@/api/contact.api.js";
import { DEFAULT_CONTACT } from "@/utils/constants";
import { openModal, closeMobileMenu } from "@/store/slices/uiSlice";

const YEAR = new Date().getFullYear();

const exploreLinks = [
  { label: "About NEBCO", to: "/#about" },
  { label: "Our experience", to: "/#experience" },
  { label: "Overseas clients", to: "/#overseas" },
  { label: "Our approach", to: "/#about" },
];

const businessLinks = [
  { label: "Construction", to: "/construction" },
  { label: "Consulting", to: "/consulting" },
  { label: "Investments", to: "/investments" },
];

const Footer = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((payload) => setContact(payload.data?.contact || payload.data))
      .catch(() => setContact(null));
  }, []);

  const info = { ...DEFAULT_CONTACT, ...(contact || {}) };
  const phones = info.phones?.length ? info.phones : DEFAULT_CONTACT.phones;

  const discuss = () => {
    dispatch(closeMobileMenu());
    dispatch(openModal("enquiry"));
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link to="/" className="footer-logo-link" aria-label="NEBCO home">
              <span className="footer-logo-panel">
                <img
                  src="/images/nebco-logo.png"
                  alt="NEBCO — Quality, Integrity, Timely"
                  width="400"
                  height="446"
                />
              </span>
              <span>From land to landmark.</span>
            </Link>
            <p>{info.company}</p>
            <p className="footer-legacy">
              Established in 2001
              <br />
              A-Class construction company, Nepal
            </p>
          </div>

          <div className="footer-group">
            <h3>Explore</h3>
            {exploreLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-group">
            <h3>Our businesses</h3>
            {businessLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={() => dispatch(openModal("appointment"))}>
              Schedule a call
            </button>
          </div>

          <div className="footer-group footer-connect">
            <h3>Let’s connect</h3>
            <a href={`mailto:${info.email}`}>{info.email}</a>
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`}>
                {phone}
              </a>
            ))}
            <p>{info.address}</p>
            <button type="button" className="footer-cta" onClick={discuss}>
              Discuss your project
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {YEAR} NEBCO. All rights reserved.</p>
          <button type="button">Enquiry privacy</button>
          <a href="#top">
            Back to top
           
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
