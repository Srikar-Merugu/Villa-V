"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const primaryLinks = [
    { name: "Amenities", id: "amenities" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" }
  ];

  const drawerLinks = [
    { name: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { name: "About", id: "about" },
    { name: "Amenities", id: "amenities" },
    { name: "Gallery", id: "gallery" },
    { name: "Floor Plans", id: "floor-plans" },
    { name: "Location", id: "location" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" }
  ];

  // Track page scroll to set transparent base or dark glass backing, and scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY >= 80);

      if (currentScrollY < 80) {
        setVisible(true);
      } else {
        if (currentScrollY > lastScrollY) {
          // Scroll down -> show navbar (comes back)
          setVisible(true);
        } else {
          // Scroll up -> hide navbar (disappears)
          setVisible(false);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

    drawerLinks.forEach((link) => {
      if (link.id) {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      }
    });

    return () => {
      drawerLinks.forEach((link) => {
        if (link.id) {
          const el = document.getElementById(link.id);
          if (el) observer.unobserve(el);
        }
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 60; // Match height boundary of header
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

  // Drawer Animation Configurations
  const drawerVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" as const, when: "afterChildren" as const }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const, when: "beforeChildren" as const }
    }
  };

  const listVariants = {
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 }
    },
    open: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 15, transition: { duration: 0.3, ease: "easeIn" as const } },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <>
      {/* Skip to Main Content Link (WCAG compliance) */}
      <a href="#main-content" className="skip-link focus-visible:top-4">
        Skip to main content
      </a>

      {/* Floating Slick Header - Compact & Flat */}
      <nav
        role="navigation"
        aria-label="Main Directory"
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-120px)] max-w-[1100px] z-45 transition-all duration-500 ease-in-out select-none h-[54px] md:h-[58px] flex items-center rounded-full px-5 sm:px-8 lg:px-10 border ${
          isScrolled 
            ? "bg-[#0a0a0a]/80 backdrop-blur-[16px] border-white/10" 
            : "bg-black/30 backdrop-blur-[10px] border-white/5"
        } ${visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}
      >
        <div className="w-full flex items-center justify-between h-full">
          
          {/* COLUMN 1: Rebranded Bold Sans Logo (Smaller, No Tagline, Clean left alignment) */}
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
            className="flex items-center gap-2 cursor-pointer focus-visible:outline-none shrink-0 py-1 transition-opacity duration-300 hover:opacity-90"
          >
            <img
              src="/shield_icon.png"
              alt=""
              className="h-[26px] lg:h-[30px] w-auto object-contain select-none pointer-events-none"
            />
            <span className="text-[12px] sm:text-[14px] md:text-[15px] font-sans font-bold tracking-[0.08em] uppercase text-[#F6F3EB] leading-none select-none whitespace-nowrap">
              Villa Sérénité
            </span>
          </div>

          {/* COLUMN 2: Navigation Links (Center, Simplified text sizing) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 mx-4">
            {primaryLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative text-[13px] uppercase tracking-[0.12em] font-medium leading-none pb-1 transition-colors duration-300 cursor-pointer focus-visible:outline-none text-shadow-subtle whitespace-nowrap after:absolute after:bottom-0 after:left-1/2 after:h-[1.5px] after:bg-[#C8A96A] after:-translate-x-1/2 after:transition-all after:duration-300 ${
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

          {/* COLUMN 3: CTA & Hamburger Menu (Right Aligned, Compact & Flat) */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Book Consultation CTA Button (Slick, Flat, Compact) */}
            <div className="hidden sm:block">
              <button
                onClick={() => handleScrollTo("contact")}
                className="group relative h-[36px] px-6 rounded-full border border-[#C8A96A]/60 hover:border-[#C8A96A] bg-transparent hover:bg-[#C8A96A] hover:-translate-y-[1.5px] transition-all duration-300 ease-out cursor-pointer flex items-center justify-center focus-visible:ring-1 focus-visible:ring-[#C8A96A] focus-visible:outline-none"
              >
                <span className="relative z-10 text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-[#F8F5EE] group-hover:text-[#111111] leading-none transition-colors duration-300 whitespace-nowrap">
                  Book Consultation
                </span>
              </button>
            </div>

            {/* Custom Morphing Hamburger Icon (3 thin lines, 22px size - HIDDEN ON DESKTOP) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] text-[#F6F3EB] hover:text-[#C8A96A] transition-colors cursor-pointer focus-visible:outline-none z-50 relative"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={`w-[20px] h-[1px] bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-[20px] h-[1px] bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-[20px] h-[1px] bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 translate-y-[-6px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Luxury Hamburger Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Directory Overlay"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[#0a0a0a]/94 backdrop-blur-[20px] flex flex-col justify-center items-center px-6"
          >
            {/* Ambient Background Grid in Drawer */}
            <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />

            <motion.div
              variants={listVariants}
              className="flex flex-col items-center gap-6 relative z-10"
            >
              {drawerLinks.map((link) => (
                <motion.button
                  key={link.name}
                  variants={linkVariants}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.action) {
                      link.action();
                    } else if (link.id) {
                      handleScrollTo(link.id);
                    }
                  }}
                  className={`text-2xl md:text-3xl font-serif tracking-[0.14em] text-[#F6F3EB] hover:text-[#C8A96A] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                    activeSection === link.id ? "text-[#C8A96A] font-light" : "font-extralight"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Mobile CTA (rendered in drawer layout only if screen is small) */}
              <motion.button
                variants={linkVariants}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleScrollTo("contact");
                }}
                className="sm:hidden mt-8 h-[38px] px-6 rounded-full border border-[#C8A96A]/60 bg-transparent text-[#F8F5EE] font-sans font-semibold text-[12px] uppercase tracking-[0.14em] leading-none hover:bg-[#C8A96A] hover:text-[#111111] transition-all duration-300 focus-visible:outline-none"
                style={{
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)"
                }}
              >
                Book Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
