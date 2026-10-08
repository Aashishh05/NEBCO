import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OFFSET = 28;

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const element = document.querySelector(hash);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
