"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ScrollVideoScrub from "../components/ScrollVideoScrub";
import About from "../components/About";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import FloorPlans from "../components/FloorPlans";
import Location from "../components/Location";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import SmoothScroll from "../components/SmoothScroll";

// Reusable luxury inline Call-to-Action block (Conversion Optimization)
function CallToActionBlock() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 md:py-24 bg-[#0B0B0C] border-t border-b border-gold/5 flex flex-col items-center justify-center text-center px-6 select-none relative overflow-hidden">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none" />
      
      <div className="max-w-2xl flex flex-col items-center gap-6 relative z-10">
        <h3 className="font-serif text-2xl md:text-3xl text-[#F6F3EB] font-light tracking-wide leading-tight">
          Experience the Pinnacle of Horizon Living
        </h3>
        <button
          onClick={handleScrollToContact}
          className="group flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
        >
          Book a Private Tour
        </button>
        <p className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
          Private Consultation &bull; No Obligation &bull; Response within 24 Hours
        </p>
      </div>
    </div>
  );
}

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
            className="w-full bg-gold hover:bg-gold-light text-[#0B0B0C] font-sans font-semibold text-[10px] uppercase tracking-[0.2em] py-3.5 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            Book a Private Tour
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
        <CallToActionBlock />

        <Gallery />
        <CallToActionBlock />

        <FloorPlans />
        <CallToActionBlock />

        <Location />

        <Testimonials />
        <CallToActionBlock />

        <FAQ />
        <Contact />
      </main>

      {/* Sticky Mobile CTA Overlay */}
      <StickyMobileCTA />
    </SmoothScroll>
  );
}
