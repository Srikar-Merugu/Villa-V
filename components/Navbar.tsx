"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrollState, setScrollState] = useState<"top" | "scrolling" | "solid">("top");
  const [isBrightVideoFrame, setIsBrightVideoFrame] = useState(false);
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

  // Monitor scroll height and dynamically adapt style & opacity based on scrubbing video scenes (Fix 1 & 2)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const totalScrubHeight = heroHeight * 4.2; // Match total ScrollVideoScrub height track

      // 1. Determine base Scroll State (Hero Top, Scroll started, Solid dark background)
      if (scrollY < 80) {
        setScrollState("top");
      } else if (scrollY >= 80 && scrollY < heroHeight * 4.2) {
        setScrollState("scrolling");
      } else {
        setScrollState("solid");
      }

      // 2. Video frame brightness adaptation (link scroll position to video content timeline)
      // Bright scenes correspond to Land, Structure, and Completed elevations (progress 5% to 60%)
      const pct = Math.max(0, Math.min(1, scrollY / totalScrubHeight));
      const isBrightZone = pct >= 0.05 && pct < 0.60;
      setIsBrightVideoFrame(scrollY < totalScrubHeight && isBrightZone);
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
      const offset = 88; // Locked height of navbar
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

  // Determine current classes for adaptive background & opacity levels based on scroll and frame brightness
  const getNavbarStyles = () => {
    const base = "fixed top-0 left-0 w-full z-45 transition-all duration-[600ms] ease-in-out border-b select-none h-[88px] md:h-[96px] flex items-center shadow-[0_12px_40px_rgba(0,0,0,0.25)]";
    
    if (scrollState === "solid") {
      return `${base} bg-[#0B0B0C] border-gold/10`;
    }

    // Adaptive transparency: increase background opacity slightly during bright video frames for text legibility
    const opacityVal = isBrightVideoFrame ? "0.65" : "0.42";
    return `${base} bg-[#0C0C0E]/${opacityVal} backdrop-blur-[24px] backdrop-saturate-[1.8] border-white/8`;
  };

  return (
    <>
      {/* Skip to Main Content Link (WCAG Accessibility compliance) */}
      <a href="#about" className="skip-link focus-visible:top-4">
        Skip to main content
      </a>

      <nav role="navigation" aria-label="Main Directory" className={getNavbarStyles()}>
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Luxury Logo (Warm Ivory: #F7F4EE) */}
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
            className="flex flex-col cursor-pointer group focus-visible:outline-none py-2"
          >
            <span className="text-[8px] tracking-[0.45em] uppercase text-gold font-sans font-semibold mb-1.5 transition-colors group-hover:text-[#E6D2A2]">
              Architectural Vision
            </span>
            <span className="text-2xl md:text-3xl font-serif tracking-[0.25em] md:tracking-[0.3em] text-[#F7F4EE] leading-none font-light transition-all duration-300 group-hover:tracking-[0.28em] select-none">
              VILLA V
            </span>
          </div>

          {/* Desktop Navigation Links (Large uppercase with centered expanding underlines) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative text-[14px] md:text-[15px] tracking-[0.12em] font-sans font-medium pb-2 transition-colors duration-300 cursor-pointer focus-visible:outline-none after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:bg-[#C8A96A] after:-translate-x-1/2 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[#C8A96A] after:w-full font-semibold"
                      : "text-white/95 hover:text-[#C8A96A] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Book Tour CTA Button (Luxury Gold border, 48px height, Warm Ivory label) */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative h-12 px-8 rounded-full border-2 border-[#C8A96A] bg-transparent hover:bg-[#C8A96A] hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none shadow-md hover:shadow-[0_4px_25px_rgba(200,169,106,0.3)]"
            >
              <span className="relative z-10 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#F7F4EE] group-hover:text-[#0B0B0C] transition-colors duration-300">
                Book a Private Tour
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle (Tabbable, safe touch target dimensions > 44x44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-white/90 hover:text-gold transition-colors cursor-pointer focus-visible:outline-none"
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
            className="mt-8 h-12 flex items-center justify-between bg-gold text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-6 hover:bg-gold-light transition-colors focus-visible:outline-none"
          >
            Book a Private Tour
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
