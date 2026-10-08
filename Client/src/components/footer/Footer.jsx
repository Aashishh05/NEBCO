import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/common/Container";
import { getContact } from "@/api/contact.api.js";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const businessLinks = [
  { label: "Construction", to: "/construction" },
  { label: "Consulting", to: "/consulting" },
  { label: "Investments", to: "/investments" },
];

const YEAR = new Date().getFullYear();

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

const Footer = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((payload) => setContact(payload.data?.contact || payload.data))
      .catch(() => setContact(null));
  }, []);

  return (
    <footer className="border-t-[5px] border-red bg-footer text-white">
      <Container className="grid grid-cols-4 gap-10 py-16 max-[960px]:grid-cols-2 max-[700px]:grid-cols-1">
        <div>
          <span className="inline-block bg-white p-3">
            <img
              src="/images/nebco-logo.png"
              alt="NEBCO"
              className="h-14 w-auto max-w-[200px] object-contain"
            />
          </span>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            From land to landmark. Building with care across Nepal and beyond.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
            Company
          </h3>
          <ul className="mt-4 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
            What we do
          </h3>
          <ul className="mt-4 space-y-3">
            {businessLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-[15px] text-white/80">
            {contact?.email && (
              <li className="flex items-start gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-red" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
            {contact?.phones?.map((phone) => (
              <li key={phone} className="flex items-start gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-red" />
                <a href={`tel:${phone}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
            {contact?.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-red" />
                <span>{contact.address}</span>
              </li>
            )}
          </ul>

          {contact?.socials && (
            <div className="mt-5 flex gap-4">
              {Object.entries(socialIcons).map(([key, Icon]) => {
                const url = contact.socials[key];
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
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex items-center justify-between py-6 text-sm text-white/50 max-[700px]:flex-col max-[700px]:gap-2">
          <span>© {YEAR} NEBCO. All rights reserved.</span>
          <span>From land to landmark.</span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
