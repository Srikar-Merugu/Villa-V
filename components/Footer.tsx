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

  // Raw inline outline SVG nodes
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
      ),
      svgMobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      ),
      svgMobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      ),
      svgMobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      className="bg-[#0D0D0D] text-[#F6F3EB] w-full max-w-full pt-10 pb-[calc(24px+env(safe-area-inset-bottom))] md:pt-[100px] md:pb-[60px] relative overflow-x-hidden select-none box-border"
    >
      {/* Subtle luxury dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      {/* Ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C8A96A]/[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-5 md:px-12 lg:px-[80px] relative z-10 box-border">

        {/* DESKTOP FOOTER (md:block) — UNTOUCHED */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* COLUMN 1: Brand Information & Developer Credit */}
            <motion.div
              variants={columnVariants}
              className="flex flex-col items-start text-left sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/shield_icon.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain select-none pointer-events-none"
                />
                <span className="text-[15px] font-sans font-bold tracking-[0.08em] uppercase text-[#F6F3EB]">
                  {t("hero.brand")}
                </span>
              </div>
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

            {/* COLUMN 2: Explore */}
            <motion.div
              variants={columnVariants}
              className="flex flex-col items-start text-left"
            >
              <h3 className="text-[#C8A96A] text-[13px] font-bold tracking-[0.20em] uppercase mb-8 leading-none">
                {language === "hr" ? "Istražite" : "Explore"}
              </h3>
              <nav className="flex flex-col gap-2 w-full" aria-label="Section directory">
                {exploreLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group relative self-start py-2.5 text-[#F6F3EB] hover:text-[#C8A96A] text-[15px] font-normal leading-none tracking-wide transition-colors duration-300 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] px-2 rounded"
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

            {/* COLUMN 4: Contact Channels & Social Handles */}
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
                  href="tel:+385215550190"
                  className="hover:text-[#C8A96A] transition-colors duration-300 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded self-start"
                >
                  +385 (0) 21 555 0190
                </a>
                <span className="py-1.5">
                  {t("footer.address").replace("Address: ", "").replace("Adresa: ", "")}
                </span>
              </address>

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
          </div>

          <div className="border-t border-white/10 w-full mt-16 pt-8 flex flex-row justify-between items-center gap-4">
            <div className="text-[#B8B8B8] text-[14px] tracking-wide font-normal">
              {language === "hr" ? "© 2026 Villa Sérénité. Sva prava pridržana." : "© 2026 Villa Sérénité. All Rights Reserved."}
            </div>
            <div className="text-[#B8B8B8] text-[14px] tracking-wide font-normal">
              {t("footer.credit")}
            </div>
          </div>
        </div>

        {/* MOBILE FOOTER (< 768px) — MINIMAL & COMPACT LUXURY EXPERIENCE */}
        <motion.div variants={columnVariants} className="block md:hidden text-center max-w-sm mx-auto">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Image
                src="/shield_icon.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-auto object-contain select-none pointer-events-none"
              />
              <span className="text-[14px] font-sans font-bold tracking-[0.08em] uppercase text-[#F6F3EB]">
                {t("hero.brand")}
              </span>
            </div>
            <p className="font-serif text-[#F6F3EB]/90 text-[13px] font-light tracking-wide">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Compact Contact Channels List */}
          <address className="not-italic flex flex-col items-center gap-1.5 text-[13px] text-[#B8B8B8] font-normal mb-5 leading-normal">
            <a
              href="mailto:concierge@villaserenite.com"
              className="hover:text-[#C8A96A] transition-colors duration-300"
            >
              concierge@villaserenite.com
            </a>
            <a
              href="tel:+123456789012"
              className="hover:text-[#C8A96A] transition-colors duration-300"
            >
              +123 45 678 9012
            </a>
            <span className="text-[#B8B8B8]/80 text-[12px] leading-snug">
              Put Marjana 12, 21000 Split, Croatia
            </span>
          </address>

          {/* Centered Social Icons */}
          <div className="flex items-center justify-center gap-3 mb-5" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.name} page`}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#F6F3EB]/80 hover:text-[#C8A96A] hover:border-[#C8A96A]/50 transition-all duration-300"
              >
                {social.svgMobile}
              </a>
            ))}
          </div>

          {/* Compact Centered Copyright & Credit */}
          <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-1 text-[11px] text-[#B8B8B8]/70 font-sans tracking-wide">
            <span>© 2026 Villa Sérénité</span>
            <span>{t("footer.credit")}</span>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}
