"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Find the offset height of navbar to scroll accurately
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

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Amenities", id: "amenities" },
    { name: "Gallery", id: "gallery" },
    { name: "Floor Plans", id: "floor-plans" },
    { name: "Location", id: "location" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b select-none ${
          scrolled
            ? "py-4 bg-[#0A0A0A]/85 backdrop-blur-md border-gold/10 shadow-lg"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Luxury Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col cursor-pointer group"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans font-medium transition-colors group-hover:text-gold-light">
              Architectural Vision
            </span>
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] text-white leading-tight font-light transition-all duration-300 group-hover:tracking-[0.25em]">
              VILLA V
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.id)}
                className="text-xs uppercase tracking-[0.2em] font-sans font-light text-white/70 hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Book Tour CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-gold/40 hover:border-gold px-6 py-2.5 bg-transparent hover:bg-gold transition-all duration-500 cursor-pointer"
            >
              <span className="relative z-10 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-gold group-hover:text-[#0A0A0A] transition-colors duration-300">
                Book Tour
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-gold transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-gold/10 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 lg:hidden ${
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
              className="text-left text-2xl font-serif tracking-widest text-white/85 hover:text-gold hover:translate-x-2 transition-all duration-300 cursor-pointer"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo("contact")}
            className="mt-8 flex items-center justify-between bg-gold text-[#0A0A0A] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-6 py-4 hover:bg-gold-light transition-colors"
          >
            Book Private Tour
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
