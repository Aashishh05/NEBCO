import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowUp, ArrowRight } from "lucide-react";
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
      <Container className="pt-16 max-[700px]:pt-[48px]">
        <div className="grid grid-cols-[1.5fr_0.8fr_1fr_1.1fr] gap-[42px] pb-[44px] max-[1200px]:grid-cols-[1.25fr_0.7fr_0.9fr_1.1fr] max-[1200px]:gap-[25px] max-[700px]:grid-cols-1 max-[700px]:gap-9">
          <div>
            <span className="inline-flex items-center justify-center bg-white p-[9px_13px]">
              <img
                src="/images/nebco-logo.png"
                alt="NEBCO — Quality, Integrity, Timely"
                className="h-14 w-auto max-w-[200px] object-contain"
              />
            </span>
            <span className="mt-4 block text-sm text-white/80">From land to landmark.</span>
            <p className="mt-6 text-[12px] text-[#c4c7bc]">{info.company}</p>
            <p className="mt-4 text-[12px] leading-relaxed text-[#9aa093]">
              Established in 2001
              <br />
              A-Class construction company, Nepal
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 border-l border-[#aa926950] pl-7 max-[700px]:border-l-0 max-[700px]:pl-0">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">
              Explore
            </h3>
            {exploreLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[13px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3 border-l border-[#aa926950] pl-7 max-[700px]:border-l-0 max-[700px]:pl-0">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">
              Our businesses
            </h3>
            {businessLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[13px] text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => dispatch(openModal("appointment"))}
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              Schedule a call
            </button>
          </div>

          <div className="flex flex-col items-start gap-3 border-l border-[#aa926950] pl-[26px] max-[700px]:border-l-0 max-[700px]:pl-0">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">
              Let's connect
            </h3>
            <a
              href={`mailto:${info.email}`}
              className="text-[13px] text-white/80 transition-colors hover:text-white"
            >
              {info.email}
            </a>
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="text-[13px] text-white/80 transition-colors hover:text-white"
              >
                {phone}
              </a>
            ))}
            <p className="text-[13px] text-white/70">{info.address}</p>

            <button
              type="button"
              onClick={handleDiscuss}
              className="mt-3 inline-flex h-[53px] items-center gap-2 bg-red px-6 text-[13px] font-semibold text-white transition-colors hover:bg-deep-red"
            >
              Discuss your project
              <ArrowRight className="size-4" />
            </button>

            {info.socials && Object.values(info.socials).some(Boolean) && (
              <div className="mt-2 flex gap-4">
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
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-7 border-t border-[#4a4b40] pt-5 pb-8 text-[12px] text-[#aeb4a4] max-[700px]:flex-wrap max-[700px]:gap-4">
          <p>© {YEAR} NEBCO. All rights reserved.</p>
          <button type="button" className="transition-colors hover:text-white">
            Enquiry privacy
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-auto inline-flex items-center gap-2 transition-colors hover:text-white max-[700px]:ml-0"
          >
            Back to top
            <ArrowUp className="size-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
