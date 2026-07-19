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
      const offset = 76; // Match the height threshold of the navbar
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

  // Determine dynamic styles based on scroll state transitions (Locked at 72px–76px)
  const getNavbarStyles = () => {
    const base = "fixed top-0 left-0 w-full z-45 transition-all duration-[600ms] ease-in-out select-none h-[72px] md:h-[76px] flex items-center";
    
    if (scrollState === "solid") {
      return {
        className: `${base} bg-[#121214]/82 backdrop-blur-[10px] border-b border-white/5 shadow-md`
      };
    } else if (scrollState === "scrolling") {
      return {
        className: `${base} border-transparent`,
        style: {
          background: "linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.14) 60%, transparent 100%)",
        }
      };
    } else {
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
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex items-center justify-between h-full">
          
          {/* Rebranded Villa Sérénité Logo */}
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
            aria-label="Villa Sérénité logo. Go back to top."
            className="flex items-center gap-3 cursor-pointer focus-visible:outline-none shrink-0 py-1"
          >
            <img
              src="/shield_icon.png"
              alt=""
              className="h-[38px] sm:h-[48px] md:h-[50px] lg:h-[54px] w-auto object-contain select-none pointer-events-none"
            />
            <div className="flex flex-col text-left select-none leading-none">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.26em] md:tracking-[0.3em] uppercase text-[#C8A96A] font-sans font-medium mb-1.5 whitespace-nowrap">
                timeless, calm luxury
              </span>
              <span className="text-[18px] sm:text-[22px] md:text-[25px] lg:text-[28px] font-serif tracking-[0.08em] sm:tracking-[0.1em] text-[#F6F3EB] leading-none font-normal transition-all duration-300 group-hover:tracking-[0.12em] whitespace-nowrap">
                Villa Sérénité
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Warm Ivory #F6F3EB, Weight 500, tracking 0.12em, 2px active underline) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative text-[13px] md:text-[14px] lg:text-[15px] uppercase tracking-[0.12em] font-medium leading-none pb-1.5 transition-colors duration-300 cursor-pointer focus-visible:outline-none text-shadow-subtle whitespace-nowrap after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-[#C8A96A] after:-translate-x-1/2 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[#C8A96A] after:w-full font-semibold"
                      : "text-[#F6F3EB] hover:text-[#C8A96A] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Book Tour CTA Button (Pill shaped, 46-48px height, Champagne Gold border, Warm Ivory text - Center alignment lock) */}
          <div className="hidden lg:block shrink-0">
            <button
              onClick={() => handleScrollTo("contact")}
              className="group relative h-11 md:h-12 px-6 xl:px-8 rounded-full border-[1.2px] border-[#C8A96A] bg-transparent hover:bg-[#C8A96A] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,169,106,0.3)] transition-all duration-300 ease-out cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none text-shadow-subtle"
            >
              <span className="relative z-10 text-[11px] md:text-[12px] lg:text-[13px] font-sans font-semibold uppercase tracking-[0.18em] text-[#F6F3EB] group-hover:text-[#0B0B0C] transition-colors duration-300 whitespace-nowrap">
                Book a Private Tour
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle (Tabbable, safe touch target dimensions > 44x44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-[#F6F3EB] hover:text-gold transition-colors cursor-pointer focus-visible:outline-none shrink-0"
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
                  isActive ? "text-gold font-normal" : "text-[#F6F3EB]"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </button>
            );
          })}
          <button
            onClick={() => handleScrollTo("contact")}
            className="mt-8 h-12 flex items-center justify-between bg-gold text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-6 hover:bg-gold-light transition-colors focus-visible:outline-none rounded-full"
          >
            Book a Private Tour
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
