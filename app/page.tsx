"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ScrollVideoScrub from "../components/ScrollVideoScrub";
import SmoothScroll from "../components/SmoothScroll";
import dynamic from "next/dynamic";

// Code-split dynamic loading of offscreen sections to improve LCP & reduce initial JS bundle sizes
const About = dynamic(() => import("../components/About"));
const Amenities = dynamic(() => import("../components/Amenities"));
const Gallery = dynamic(() => import("../components/Gallery"));
const Contact = dynamic(() => import("../components/Contact"));
const Footer = dynamic(() => import("../components/Footer"));

// Sticky Mobile Bottom CTA Bar (visible on viewports < 768px past Hero)
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after user scrolls past the main viewport fold
      if (window.scrollY > window.innerHeight * 0.95) {
        setVisible(true);
      } else {
        setVisible(false);
      }
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-[#0B0B0C]/90 backdrop-blur-md border-t border-gold/10 px-6 py-4 flex flex-col gap-1 items-center shadow-[0_-8px_30px_rgba(0,0,0,0.55)]"
        >
          <button
            onClick={handleScrollToContact}
            className="w-full bg-[#C8A96A] hover:bg-[#D6B15C] text-[#0B0B0C] font-sans font-semibold text-[10px] uppercase tracking-[0.2em] py-3.5 flex items-center justify-center transition-colors focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
          >
            Book Consultation
          </button>
          <span className="text-[8px] font-mono tracking-wider text-white/35 uppercase text-center mt-1">
            Private Consultation &bull; Response within 24h
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const videoUrl = "/videos/hero.mp4?v=3";

  return (
    <SmoothScroll>
      <Navbar />
      <ScrollVideoScrub videoUrl={videoUrl} />
      
      {/* Post-Video Luxury Editorial Sections */}
      <main id="main-content" className="relative z-10 bg-[#0B0B0C]">
        <About />
        
        <Amenities />

        <Gallery />

        <Contact />
        <Footer />
      </main>

      {/* Sticky Mobile CTA Overlay */}
      <StickyMobileCTA />
    </SmoothScroll>
  );
}
