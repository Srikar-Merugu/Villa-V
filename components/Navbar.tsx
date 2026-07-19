"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver-based Scroll Spy logic (WCAG and UX compliance)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section occupies core viewport heights
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
      const offset = scrolled ? 70 : 90;
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

  return (
    <>
      {/* Skip to Main Content Link (WCAG Accessibility compliance) */}
      <a href="#about" className="skip-link focus-visible:top-4">
        Skip to main content
      </a>

      <nav
        role="navigation"
        aria-label="Main Directory"
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 border-b select-none ${
          scrolled
            ? "py-4 bg-[#0B0B0C]/90 backdrop-blur-md border-gold/10 shadow-lg"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Luxury Logo */}
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
            className="flex flex-col cursor-pointer group focus-visible:ring-1 focus-visible:ring-gold"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans font-medium transition-colors group-hover:text-[#E6D2A2]">
              Architectural Vision
            </span>
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] text-[#F6F3EB] leading-tight font-light transition-all duration-300 group-hover:tracking-[0.25em]">
              VILLA V
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.id)}
                className={`text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer focus-visible:ring-1 focus-visible:ring-gold ${
                  activeSection === link.id
                    ? "text-gold font-normal border-b border-gold/30 pb-0.5"
                    : "text-white/70 hover:text-gold"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Book Tour CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-gold/40 hover:border-gold px-6 py-2.5 bg-transparent hover:bg-gold transition-all duration-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="relative z-10 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-gold group-hover:text-[#0B0B0C] transition-colors duration-300">
                Book a Private Tour
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-gold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
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
        className={`fixed inset-0 z-40 bg-[#0B0B0C]/95 backdrop-blur-xl border-l border-gold/10 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 lg:hidden ${
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Architectural Background Grid in Mobile Menu */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.id)}
              className={`text-left text-2xl font-serif tracking-widest hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold ${
                activeSection === link.id ? "text-gold font-normal" : "text-white/85"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo("contact")}
            className="mt-8 flex items-center justify-between bg-gold text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-6 py-4 hover:bg-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            Book a Private Tour
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
