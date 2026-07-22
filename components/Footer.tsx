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
        staggerChildren: 0.12
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_ENTRANCE }
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

  // Raw inline outline SVG nodes for bulletproof asset compiling
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    }
  ];

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      role="contentinfo"
      aria-label="Villa Sérénité Brand Directory"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-[#0D0D0D] text-[#F6F3EB] w-full max-w-full pt-[100px] pb-[calc(60px+env(safe-area-inset-bottom))] lg:pb-[60px] relative overflow-x-hidden select-none box-border"
    >
      {/* Subtle luxury dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      {/* Ambient gold glow anchoring the closing statement -- a quiet echo of the same
          detail used in FAQ/Contact, so the footer doesn't read as an afterthought */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C8A96A]/[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-[80px] relative z-10 box-border">

        {/* Closing Statement + CTA -- a deliberate final beat rather than dropping straight
            into utility link columns */}
        <motion.div
          variants={columnVariants}
          className="flex flex-col items-center text-center border-b border-white/10 pb-14 mb-14 lg:pb-20 lg:mb-20"
        >
          <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5 block">
            {t("contact.badges.1")}
          </span>
          <h2 className="font-serif text-[#F6F3EB] font-light text-[clamp(32px,6vw,64px)] leading-[1.1] tracking-tight max-w-2xl mb-8">
            {language === "hr" ? "Vaše utočište vas čeka." : "Your sanctuary awaits."}
          </h2>
          <button
            onClick={handleScrollToContact}
            className="group/cta relative flex items-center gap-2 bg-[#C8A96A] text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#D6B15C] hover:shadow-[0_12px_32px_rgba(200,169,106,0.25)] focus-visible:outline-none"
          >
            {t("navbar.cta")}
          </button>
        </motion.div>

        {/* Responsive Grid Columns (Collapses to 1 column on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-12">

          {/* COLUMN 1: Brand Information & Developer Credit */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left sm:col-span-2 lg:col-span-1"
          >
            {/* Logo Row */}
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/shield_icon.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-auto object-contain select-none pointer-events-none"
              />
              <span className="text-[14px] font-sans font-bold tracking-[0.08em] uppercase text-[#F6F3EB]">
                {t("hero.brand")}
              </span>
            </div>
            <p className="font-serif text-[#F6F3EB]/80 text-[13px] font-light tracking-wide">
              {t("footer.tagline")}
            </p>
            <div className="text-[#B8B8B8]/60 text-[13px] font-mono tracking-wider uppercase mt-auto hidden sm:block">
              {t("footer.credit")}
            </div>
          </motion.div>

          {/* COLUMN 2: Explore -- sitemap anchors across every homepage section */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
              {language === "hr" ? "Istražite" : "Explore"}
            </h3>
            <nav className="flex flex-col gap-2 w-full" aria-label="Section directory">
              {exploreLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative self-center sm:self-start py-2.5 text-[#F6F3EB] hover:text-[#C8A96A] text-[15px] font-normal leading-none tracking-wide transition-colors duration-300 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] px-2 rounded"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* COLUMN 3: Legal Navigation Directory */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
              {t("footer.legal")}
            </h3>
            <nav className="flex flex-col gap-2 w-full" aria-label="Legal documents directory">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative self-center sm:self-start py-2.5 text-[#F6F3EB] hover:text-[#C8A96A] text-[15px] font-normal leading-none tracking-wide transition-colors duration-300 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] px-2 rounded"
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

          {/* COLUMN 4: Contact Channels & Social Handles */}
          <motion.div
            variants={columnVariants}
            className="flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
              {t("footer.contact")}
            </h3>
            <address className="not-italic flex flex-col gap-4 text-[#F6F3EB] text-[15px] font-normal leading-[1.8] w-full">
              <a
                href="mailto:concierge@villaserenite.com"
                className="hover:text-[#C8A96A] transition-colors duration-300 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-center sm:self-start"
              >
                concierge@villaserenite.com
              </a>
              <a
                href="tel:+385215550190"
                className="hover:text-[#C8A96A] transition-colors duration-300 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-center sm:self-start"
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Copyright & Credit */}
          <div className="pt-3 border-t border-white/10 w-full max-w-[280px] flex flex-col items-center gap-0.5 text-[11px] text-[#B8B8B8]/60 font-sans tracking-wide">
            <span>© 2026 Villa Sérénité</span>
            <span className="text-[10px] text-[#B8B8B8]/40 font-mono uppercase">
              {t("footer.credit")}
            </span>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════
            DESKTOP FOOTER (≥ md: 768px) - 100% UNCHANGED
        ════════════════════════════════════════════════════════ */}
        <div className="hidden md:block">
          {/* Responsive Grid Columns */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16">
            
            {/* COLUMN 1: Brand Information & Developer Credit */}
            <motion.div 
              variants={columnVariants}
              className="flex flex-col items-start text-left"
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
              <h4 className="font-serif text-[#F6F3EB] text-[16px] font-normal tracking-wide mb-3 leading-snug">
                {t("footer.tagline")}
              </h4>
              <p className="text-[#B8B8B8] text-[15px] font-normal leading-[1.8] mb-6 max-w-sm">
                {t("footer.desc")}
              </p>
              <div className="text-[#B8B8B8]/60 text-[13px] font-mono tracking-wider uppercase mt-auto">
                {t("footer.credit")}
              </div>
            </motion.div>

            {/* COLUMN 2: Legal Navigation Directory */}
            <motion.div 
              variants={columnVariants}
              className="flex flex-col items-start text-left"
            >
              <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
                {t("footer.legal")}
              </h3>
              <nav className="flex flex-col gap-2 w-full" aria-label="Legal documents directory">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative self-start py-2.5 text-[#F6F3EB] hover:text-[#C8A96A] text-[15px] font-normal leading-none tracking-wide transition-colors duration-300 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] px-2 rounded"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* COLUMN 3: Contact Channels & Social Handles */}
            <motion.div 
              variants={columnVariants}
              className="flex flex-col items-start text-left"
            >
              <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
                {t("footer.contact")}
              </h3>
              <address className="not-italic flex flex-col gap-4 text-[#F6F3EB] text-[15px] font-normal leading-[1.8] w-full">
                <a
                  href="mailto:concierge@villaserenite.com"
                  className="hover:text-[#C8A96A] transition-colors duration-300 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-start"
                >
                  concierge@villaserenite.com
                </a>
                <a
                  href="tel:+123456789012"
                  className="hover:text-[#C8A96A] transition-colors duration-300 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-start"
                >
                  +123 45 678 9012
                </a>
                <span className="py-1.5">
                  {t("footer.address").replace("Address: ", "").replace("Adresa: ", "")}
                </span>
              </address>

              {/* Social Icons row */}
              <div className="flex gap-4 mt-8 items-center" aria-label="Social media channels">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="p-2 border border-[#F6F3EB]/10 rounded-full hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(200,169,106,0.3)] text-[#F6F3EB] flex items-center justify-center w-10 h-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </motion.div>

        {/* BOTTOM BAR: Divider & Horizontal Copyright Notices */}
        <div className="border-t border-white/10 w-full mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Left copyright (Exact requested wording) */}
          <div className="text-[#B8B8B8] text-[13px] md:text-[14px] tracking-wide font-normal">
            {language === "hr" ? "© 2026 Villa Sérénité. Sva prava pridržana." : "© 2026 Villa Sérénité. All Rights Reserved."}
          </div>

          {/* BOTTOM BAR: Divider & Horizontal Copyright Notices */}
          <div className="border-t border-white/10 w-full mt-16 pt-8 flex flex-row justify-between items-center gap-4">
            
            {/* Left copyright */}
            <div className="text-[#B8B8B8] text-[14px] tracking-wide font-normal">
              {language === "hr" ? "© 2026 Villa Sérénité. Sva prava pridržana." : "© 2026 Villa Sérénité. All Rights Reserved."}
            </div>

            {/* Right developer credit */}
            <div className="text-[#B8B8B8] text-[14px] tracking-wide font-normal">
              {t("footer.credit")}
            </div>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
