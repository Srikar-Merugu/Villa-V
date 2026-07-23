"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { EASE_ENTRANCE } from "../lib/motion";

export default function Footer() {
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_ENTRANCE }
    }
  };

  const legalLinks = [
    { name: language === "hr" ? "Pravila o privatnosti" : "Privacy Policy", href: "/privacy" },
    { name: language === "hr" ? "Uvjeti i odredbe" : "Terms & Conditions", href: "/terms" },
    { name: language === "hr" ? "Pravila o kolačićima" : "Cookie Policy", href: "/cookies" },
    { name: language === "hr" ? "Izjava o odricanju odgovornosti" : "Disclaimer", href: "/disclaimer" }
  ];

  const exploreLinks = [
    { name: t("navbar.about"), href: "#about" },
    { name: t("navbar.amenities"), href: "#amenities" },
    { name: t("navbar.gallery"), href: "#gallery" },
    { name: t("navbar.floorPlans"), href: "#floor-plans" },
    { name: t("navbar.faq"), href: "#faq" },
    { name: t("navbar.contact"), href: "#contact" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    }
  ];

  return (
    <motion.footer
      role="contentinfo"
      aria-label="Villa Sérénité Brand Directory"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className="bg-[#0D0D0D] text-[#F6F3EB] w-full max-w-full pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10 relative overflow-x-hidden select-none box-border border-t border-white/5"
    >
      {/* Subtle luxury dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />

      {/* Ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-[#C8A96A]/[0.03] blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 box-border">

        {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 sm:pb-12">

          {/* COLUMN 1: Brand Information */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            {/* Logo Row */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <Image
                src="/shield_icon.png"
                alt="Villa Sérénité logo"
                width={28}
                height={28}
                className="h-7 w-auto object-contain select-none pointer-events-none"
              />
              <span className="text-[15px] font-sans font-bold tracking-[0.1em] uppercase text-[#F6F3EB]">
                {t("hero.brand")}
              </span>
            </div>

            {/* Tagline & Short Description */}
            <h4 className="font-serif text-[#F6F3EB] text-[15px] font-light tracking-wide mb-2 leading-snug">
              {t("footer.tagline")}
            </h4>
            <p className="text-[#B8B8B8] text-[13px] sm:text-[14px] font-normal leading-relaxed max-w-xs">
              {t("footer.desc")}
            </p>
          </motion.div>

          {/* COLUMN 2: Explore Navigation */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.25em] uppercase mb-4 leading-none">
              {language === "hr" ? "Istražite" : "Explore"}
            </h3>
            <nav className="flex flex-col gap-2 w-full" aria-label="Section directory">
              {exploreLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#F6F3EB]/80 hover:text-[#C8A96A] text-[14px] font-normal tracking-wide transition-colors duration-300 self-center sm:self-start py-0.5"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* COLUMN 3: Legal Navigation Directory */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.25em] uppercase mb-4 leading-none">
              {t("footer.legal")}
            </h3>
            <nav className="flex flex-col gap-2 w-full" aria-label="Legal documents directory">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#F6F3EB]/80 hover:text-[#C8A96A] text-[14px] font-normal tracking-wide transition-colors duration-300 self-center sm:self-start py-0.5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* COLUMN 4: Contact & Social Handles */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.25em] uppercase mb-4 leading-none">
              {t("footer.contact")}
            </h3>
            <address className="not-italic flex flex-col gap-2 text-[#F6F3EB]/80 text-[14px] font-normal leading-relaxed w-full mb-4">
              <a
                href="mailto:concierge@villaserenite.com"
                className="hover:text-[#C8A96A] transition-colors duration-300 self-center sm:self-start"
              >
                concierge@villaserenite.com
              </a>
              <a
                href="tel:+385215550190"
                className="hover:text-[#C8A96A] transition-colors duration-300 self-center sm:self-start"
              >
                +385 (0) 21 555 0190
              </a>
              <span className="text-[#B8B8B8]/80 text-[13px] self-center sm:self-start">
                Put Marjana 12, 21000 Split, Croatia
              </span>
            </address>

            {/* Social Icons directly beneath contact info */}
            <div className="flex gap-3 items-center justify-center sm:justify-start" aria-label="Social media channels">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-[#C8A96A]/60 text-[#F6F3EB]/80 hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.03]"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM BAR: Single Horizontal Divider & Non-Duplicated Copyright/Credit */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] sm:text-[13px] text-[#B8B8B8]/80 tracking-wide">
          <div>
            {language === "hr" ? "© 2026 Villa Sérénité. Sva prava pridržana." : "© 2026 Villa Sérénité. All Rights Reserved."}
          </div>
          <div className="font-sans">
            {t("footer.credit")}
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
