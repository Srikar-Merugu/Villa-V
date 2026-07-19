"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  // Track page scroll to set transparent gradients or solid post-hero bases
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const totalScrubHeight = heroHeight * 4.2; // Total scroll height of video scrub container

      if (scrollY < 80) {
        setScrollState("top");
      } else if (scrollY >= 80 && scrollY < totalScrubHeight) {
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
      const offset = 80;
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

  // Determine dynamic styles based on scroll state transitions
  const getNavbarStyles = () => {
    const base = "fixed top-0 left-0 w-full z-45 transition-all duration-[600ms] ease-in-out select-none py-6";
    
    if (scrollState === "solid") {
      // Post-hero: solid dark base, 10px blur, thin border
      return {
        className: `${base} py-4 bg-[#121214]/82 backdrop-blur-[10px] border-b border-white/5 shadow-md`
      };
    } else if (scrollState === "scrolling") {
      // Scrolled hero: increase gradient overlay slightly (~10%) to protect readability over bright video frames
      return {
        className: `${base} border-transparent`,
        style: {
          background: "linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.14) 60%, transparent 100%)",
        }
      };
    } else {
      // Hero top: fully transparent minimal base with light visual gradient
      return {
        className: `${base} border-transparent`,
        style: {
          background: "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)",
        }
      };
    }
  };

  const navStyles = getNavbarStyles();

  return (
    <>
      {/* Skip to Main Content Link (WCAG Accessibility compliance) */}
      <a href="#about" className="skip-link focus-visible:top-4">
        Skip to main content
      </a>

      <nav
        role="navigation"
        aria-label="Main Directory"
        className={navStyles.className}
        style={navStyles.style}
      >
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo (Warm Ivory: #F6F3EB, Small Label: #C8A96A with text-shadow) */}
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
            className="flex flex-col cursor-pointer group focus-visible:outline-none py-1 text-shadow-subtle"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#C8A96A] font-sans font-semibold mb-1 transition-colors group-hover:text-[#E6D2A2]">
              Architectural Vision
            </span>
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] text-[#F6F3EB] leading-tight font-light transition-all duration-300 group-hover:tracking-[0.22em] select-none">
              VILLA V
            </span>
          </div>

          {/* Desktop Navigation Links (Pure White #FFFFFF, Weight 600, tracking 0.08em, text shadow) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative text-[15px] lg:text-[16px] xl:text-[17px] uppercase tracking-[0.08em] font-semibold pb-1.5 transition-colors duration-300 cursor-pointer focus-visible:outline-none text-shadow-subtle after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-[#C8A96A] after:-translate-x-1/2 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[#C8A96A] after:w-full font-bold"
                      : "text-[#FFFFFF] hover:text-[#C8A96A] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Book Tour CTA Button (Clean high contrast border, soft elevation and shadows) */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-[#C8A96A]/60 hover:border-[#C8A96A] px-6 py-2.5 rounded-none bg-transparent hover:bg-[#C8A96A] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,169,106,0.3)] transition-all duration-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none text-shadow-subtle"
            >
              <span className="relative z-10 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#FFFFFF] group-hover:text-[#0B0B0C] transition-colors duration-300">
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

      {/* Mobile Drawer Menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-45 bg-[#0B0B0C]/96 backdrop-blur-xl border-l border-gold/10 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 lg:hidden ${
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
                  isActive ? "text-gold font-normal" : "text-[#FFFFFF]"
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
