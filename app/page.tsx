"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ScrollVideoScrub from "../components/ScrollVideoScrub";
import SmoothScroll from "../components/SmoothScroll";
import dynamic from "next/dynamic";
import { useLanguage } from "../context/LanguageContext";

// Code-split dynamic loading of offscreen sections to improve LCP & reduce initial JS bundle sizes
const About = dynamic(() => import("../components/About"));
const Amenities = dynamic(() => import("../components/Amenities"));
const Gallery = dynamic(() => import("../components/Gallery"));
const FloorPlans = dynamic(() => import("../components/FloorPlans"));
const Location = dynamic(() => import("../components/Location"));
const FAQ = dynamic(() => import("../components/FAQ"));
const Contact = dynamic(() => import("../components/Contact"));
const Footer = dynamic(() => import("../components/Footer"));

// Sticky Mobile Bottom CTA Bar (visible on viewports < 768px past Hero)
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const pastHero = currentScrollY > window.innerHeight * 0.9;
      const scrollingUp = currentScrollY < lastScrollY.current;

      // Visible only after hero AND when scrolling up (with a small scroll tolerance)
      if (pastHero && (scrollingUp || currentScrollY <= lastScrollY.current - 5)) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-[#0B0B0C]/95 backdrop-blur-md border-t border-[#C8A96A]/20 px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex flex-col justify-center items-center shadow-[0_-8px_32px_rgba(0,0,0,0.7)] h-[calc(72px+env(safe-area-inset-bottom))]"
        >
          <button
            onClick={handleScrollToContact}
            className="w-full h-[46px] rounded-full bg-[#C8A96A] text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300"
          >
            {t("navbar.cta")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollVideoScrub />
      
      {/* Post-Video Luxury Editorial Sections */}
      <main id="main-content" className="relative z-10 bg-[#0B0B0C] w-full max-w-full overflow-x-hidden box-border">
        <About />

        <Amenities />

        <Gallery />

        <FloorPlans />

        <Location />

        <FAQ />

        <Contact />
        <Footer />
      </main>

      {/* Sticky Mobile CTA Overlay */}
      <StickyMobileCTA />
    </SmoothScroll>
  );
}
