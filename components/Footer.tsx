"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const legalLinks = [
    { name: language === "hr" ? "Pravila o privatnosti" : "Privacy Policy", href: "/privacy" },
    { name: language === "hr" ? "Uvjeti i odredbe" : "Terms & Conditions", href: "/terms" },
    { name: language === "hr" ? "Pravila o kolačićima" : "Cookie Policy", href: "/cookies" },
    { name: language === "hr" ? "Izjava o odricanju odgovornosti" : "Disclaimer", href: "/disclaimer" }
  ];

  // Raw inline outline SVG nodes for bulletproof asset compiling
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-[#0D0D0D] text-[#F6F3EB] w-full max-w-full pt-[50px] lg:pt-[100px] pb-[calc(40px+env(safe-area-inset-bottom))] lg:pb-[60px] relative overflow-x-hidden select-none box-border"
    >
      {/* Subtle luxury dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-[80px] relative z-10 box-border">
        
        {/* Responsive Grid Columns (Collapses to 1 column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          
          {/* COLUMN 1: Brand Information & Developer Credit */}
          <motion.div 
            variants={columnVariants}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* Logo Row */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/shield_icon.png"
                alt=""
                className="h-8 w-auto object-contain select-none pointer-events-none"
              />
              <span className="text-[15px] font-sans font-bold tracking-[0.08em] uppercase text-[#F6F3EB]">
                {t("hero.brand")}
              </span>
            </div>

            {/* Tagline & Description */}
            <h4 className="font-serif text-[#F6F3EB] text-[15px] md:text-[16px] font-normal tracking-wide mb-2 md:mb-3 leading-snug">
              {t("footer.tagline")}
            </h4>
            <p className="text-[#B8B8B8] text-[13px] md:text-[15px] font-normal leading-[1.6] md:leading-[1.8] mb-4 md:mb-6 max-w-sm">
              {t("footer.desc")}
            </p>
            <div className="text-[#B8B8B8]/60 text-[13px] font-mono tracking-wider uppercase mt-auto hidden md:block">
              {t("footer.credit")}
            </div>
          </motion.div>

          {/* COLUMN 2: Legal Navigation Directory */}
          <motion.div 
            variants={columnVariants}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-[#C8A96A] text-[11px] md:text-[13px] font-bold tracking-[0.20em] uppercase mb-3 md:mb-8 leading-none">
              {t("footer.legal")}
            </h3>
            <nav className="flex flex-col gap-2 w-full" aria-label="Legal documents directory">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative self-center md:self-start py-1.5 md:py-2.5 text-[#F6F3EB] hover:text-[#C8A96A] text-[13px] md:text-[15px] font-normal leading-none tracking-wide transition-colors duration-300 min-h-[36px] md:min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] px-2 rounded"
                >
                  <span className="relative">
                    {link.name}
                    {/* Animated Underline grows from center */}
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* COLUMN 3: Contact Channels & Social Handles */}
          <motion.div 
            variants={columnVariants}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-[#C8A96A] text-[11px] md:text-[13px] font-bold tracking-[0.20em] uppercase mb-3 md:mb-8 leading-none">
              {t("footer.contact")}
            </h3>
            <address className="not-italic flex flex-col gap-2 md:gap-4 text-[#F6F3EB] text-[13px] md:text-[15px] font-normal leading-[1.6] md:leading-[1.8] w-full">
              <a
                href="mailto:concierge@villaserenite.com"
                className="hover:text-[#C8A96A] transition-colors duration-300 py-1 md:py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-center md:self-start"
              >
                concierge@villaserenite.com
              </a>
              <a
                href="tel:+385215550199"
                className="hover:text-[#C8A96A] transition-colors duration-300 py-1 md:py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-center md:self-start"
              >
                +385 21 555 0199
              </a>
              <span className="py-1 md:py-1.5">
                {t("footer.address").replace("Address: ", "").replace("Adresa: ", "")}
              </span>
            </address>

            {/* Social Icons row */}
            <div className="flex gap-3 md:gap-4 mt-5 md:mt-8 items-center" aria-label="Social media channels">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="p-2 border border-[#F6F3EB]/10 rounded-full hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(200,169,106,0.3)] text-[#F6F3EB] flex items-center justify-center w-9 h-9 md:w-10 md:h-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
                  >
                    {social.svg}
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM BAR: Divider & Horizontal Copyright Notices */}
        <div className="border-t border-white/10 w-full mt-8 md:mt-16 pt-5 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          
          {/* Left copyright (Exact requested wording) */}
          <div className="text-[#B8B8B8] text-[12px] md:text-[14px] tracking-wide font-normal">
            {language === "hr" ? "© 2026 Villa Sérénité. Sva prava pridržana." : "© 2026 Villa Sérénité. All Rights Reserved."}
          </div>

          {/* Right developer credit (Exact requested wording) */}
          <div className="text-[#B8B8B8] text-[12px] md:text-[14px] tracking-wide font-normal">
            {t("footer.credit")}
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
