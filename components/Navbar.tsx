"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrollState, setScrollState] = useState<"top" | "scrolling" | "solid">("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Amenities", id: "amenities" },
    { name: "Gallery", id: "gallery" },
    { name: "Floor Plans", id: "floor-plans" },
    { name: "Location", id: "location" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" }
  ];

  // Monitor window scroll coordinates to shift between the 3 adaptive states
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY < 80) {
        setScrollState("top");
      } else if (scrollY >= 80 && scrollY < heroHeight * 0.9) {
        setScrollState("scrolling");
      } else {
        setScrollState("solid");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver scroll spy active section highlights
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0.05
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset matches current navbar height specs
      const offset = scrollState === "top" ? 90 : 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Determine current classes for adaptive scroll states
  const getNavbarClasses = () => {
    const base = "fixed top-0 left-0 w-full z-45 transition-all duration-500 ease-in-out border-b select-none";
    if (scrollState === "top") {
      return `${base} py-5 bg-[#0A0A0A]/18 backdrop-blur-[18px] border-white/8 shadow-sm`;
    } else if (scrollState === "scrolling") {
      return `${base} py-4 bg-[#0A0A0A]/50 backdrop-blur-[20px] border-white/12 shadow-md`;
    } else {
      return `${base} py-4 bg-[#0B0B0C] border-gold/10 shadow-lg`;
    }
  };

  return (
    <>
      {/* Skip to Main Content Link (WCAG Accessibility compliance) */}
      <a href="#about" className="skip-link focus-visible:top-4">
        Skip to main content
      </a>

      <nav role="navigation" aria-label="Main Directory" className={getNavbarClasses()}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Luxury Logo (Warm Ivory: #F6F3EB) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            role="link"
            tabIndex={0}
            aria-label="VILLA V logo. Go back to top."
            className="flex flex-col cursor-pointer group focus-visible:outline-none"
          >
            <span className="text-[8px] tracking-[0.45em] uppercase text-gold font-sans font-semibold transition-colors group-hover:text-[#E6D2A2]">
              Architectural Vision
            </span>
            <span className="text-xl md:text-2xl font-serif tracking-[0.25em] text-[#F6F3EB] leading-tight font-light transition-all duration-300 group-hover:tracking-[0.28em]">
              VILLA V
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.name} className="relative flex flex-col items-center py-1">
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className={`text-[11px] uppercase tracking-[0.22em] font-sans font-medium transition-colors duration-300 cursor-pointer focus-visible:outline-none pb-1.5 ${
                      isActive ? "text-gold font-semibold" : "text-white/95 hover:text-gold"
                    }`}
                  >
                    {link.name}
                  </button>
                  
                  {/* Springs-based active indicator line (Awwwards design aesthetic) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Book Tour CTA Button (Luxury Gold rounded outline with scale hover) */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-gold hover:bg-gold text-gold hover:text-[#0B0B0C] px-7 py-2.5 rounded-full bg-transparent hover:scale-105 hover:shadow-[0_4px_20px_rgba(214,177,92,0.25)] transition-all duration-300 cursor-pointer focus-visible:outline-none"
            >
              <span className="relative z-10 text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                Book a Private Tour
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/90 hover:text-gold transition-colors cursor-pointer focus-visible:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Luxury Glass background) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-40 bg-[#0B0B0C]/96 backdrop-blur-xl border-l border-gold/10 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 lg:hidden ${
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Architectural Background Grid in Mobile Menu */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.id)}
                className={`text-left text-2xl font-serif tracking-widest hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                  isActive ? "text-gold font-normal" : "text-white/85"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </button>
            );
          })}
          <button
            onClick={() => handleScrollTo("contact")}
            className="mt-8 flex items-center justify-between bg-gold text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-6 py-4 hover:bg-gold-light transition-colors focus-visible:outline-none"
          >
            Book a Private Tour
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
