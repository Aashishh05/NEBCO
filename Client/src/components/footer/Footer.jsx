import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "@/components/common/Container";
import { getContact } from "@/api/contact.api.js";
import { DEFAULT_CONTACT } from "@/utils/constants";
import { openModal, closeMobileMenu } from "@/store/slices/uiSlice";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./SocialIcons";

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

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

const headingClass = "text-[15px] font-medium leading-[1.4] text-[#dccaa2]";
const linkClass =
  "text-[14px] leading-[1.5] text-[#ece6da] transition-colors hover:text-white";
const columnClass =
  "flex flex-col items-start gap-[14px] border-l border-white/15 pl-8 max-[1200px]:pl-6 max-[700px]:border-l-0 max-[700px]:pl-0";

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

  const handleDiscuss = () => {
    dispatch(closeMobileMenu());
    dispatch(openModal("enquiry"));
  };

  return (
    <footer className="border-t-[5px] border-red bg-footer text-white">
      <Container className="pt-14 max-[700px]:pt-[48px]">
        <div className="grid grid-cols-[1.5fr_0.85fr_1fr_1fr] pb-[44px] max-[1200px]:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] max-[700px]:grid-cols-1 max-[700px]:gap-10 max-[700px]:pb-10">
          {/* Brand */}
          <div className="pr-10 max-[700px]:pr-0">
            <div className="flex items-center gap-5 max-[700px]:gap-4">
              <span className="flex size-[88px] shrink-0 items-center justify-center bg-white p-[6px] max-[700px]:size-[80px]">
                <img
                  src="/images/nebco-logo.png"
                  alt="NEBCO — Quality, Integrity, Timely"
                  className="h-full w-full object-contain"
                />
              </span>

              <span className="max-w-[120px] text-[16px] leading-[1.5] text-[#dccaa2]">
                From land to landmark.
              </span>
            </div>

            <p className="mt-6 text-[13px] text-[#ece6da]">{info.company}</p>

            <p className="mt-3 text-[13px] leading-[1.8] text-[#b9b8ac]">
              Established in 2001
              <br />
              A-Class construction company, Nepal
            </p>
          </div>

          {/* Explore */}
          <div className={columnClass}>
            <h3 className={headingClass}>Explore</h3>
            {exploreLinks.map((link) => (
              <Link key={link.label} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Our businesses */}
          <div className={columnClass}>
            <h3 className={headingClass}>Our businesses</h3>
            {businessLinks.map((link) => (
              <Link key={link.label} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => dispatch(openModal("appointment"))}
              className={linkClass}
            >
              Schedule a call
            </button>
          </div>

          {/* Let's connect */}
          <div className={columnClass}>
            <h3 className={headingClass}>Let's connect</h3>
            <a href={`mailto:${info.email}`} className={linkClass}>
              {info.email}
            </a>
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className={linkClass}>
                {phone}
              </a>
            ))}
            <p className="text-[14px] leading-[1.5] text-[#ece6da]">
              {info.address}
            </p>

            <button
              type="button"
              onClick={handleDiscuss}
              className="mt-1 text-[14px] leading-[1.5] text-[#dccaa2] transition-colors hover:text-white"
            >
              Discuss your project
            </button>

            {info.socials && Object.values(info.socials).some(Boolean) && (
              <div className="flex gap-4">
                {Object.entries(socialIcons).map(([key, Icon]) => {
                  const url = info.socials?.[key];
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={key}
                      className="text-[#ece6da]/70 transition-colors hover:text-white"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center gap-8 border-t border-white/15 pt-6 pb-7 text-[13px] text-[#b9b8ac] max-[700px]:flex-wrap max-[700px]:gap-4">
          <p>© {YEAR} NEBCO. All rights reserved.</p>

          <button
            type="button"
            className="ml-auto transition-colors hover:text-white max-[700px]:ml-0"
          >
            Enquiry privacy
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-white"
          >
            Back to top
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
