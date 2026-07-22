"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_CONTAINER } from "../lib/motion";

const statIcons = [
  <svg key="beach" className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
  </svg>,
  <svg key="marina" className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>,
  <svg key="dining" className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
];

export default function Location() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Scroll parallax image scales and transform bindings
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.08, 1.00]);

  const headingLines = t("location.headings") as string[];
  const highlights = t("location.highlights") as string[];
  const travelStats = (t("location.stats") as { label: string; time: string }[]).map((s, i) => ({
    ...s,
    icon: statIcons[i]
  }));

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className={`relative w-full max-w-full bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border ${SECTION_PADDING}`}
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className={SECTION_CONTAINER}>

        {/* Split Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 xl:gap-24 items-center w-full max-w-full box-border">

          {/* COLUMN 1: Location Editorial Details (Responsive Order 2 on Mobile) */}
          <div className="order-2 lg:order-1 flex flex-col w-full min-w-0 max-w-full box-border">

            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              {t("location.label")}
            </span>

            {/* Editorial Heading Line-by-Line */}
            <h3 className="font-serif text-[#F6F3EB] font-light text-[38px] sm:text-[46px] lg:text-[60px] xl:text-[68px] leading-[1.05] tracking-tight mb-6">
              {headingLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.7] max-w-[480px] mb-8"
            >
              {t("location.desc")}
            </motion.p>

            {/* Checklist Highlights */}
            <ul className="flex flex-col gap-3.5 mb-6">
              {highlights.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="text-[#F6F3EB] text-[15px] sm:text-[16px] flex items-center gap-3.5 font-medium select-none"
                >
                  <span className="text-[#C8A96A] text-[18px] font-bold">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Horizontal Mini Stats (Mobile stacks to 1 column) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8 mt-8 w-full">
              {travelStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 + idx * 0.1 }}
                  className="flex flex-col items-start gap-1 select-none"
                >
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="font-serif text-[#C8A96A] text-[16px] sm:text-[18px] font-light">
                      {stat.time}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.15em] text-[#F6F3EB]/60 font-medium uppercase mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Action CTA Explore Button */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={handleScrollToContact}
              className="group/cta relative self-start flex items-center gap-2 text-[#C8A96A] font-sans font-semibold text-[13px] uppercase tracking-[0.15em] hover:text-[#F6F3EB] transition-colors duration-300 min-h-[44px] mt-10 focus-visible:outline-none"
            >
              <span>{t("location.cta")}</span>
              <span className="group-hover/cta:translate-x-1.5 transition-transform duration-300 select-none">
                →
              </span>
              <span className="absolute bottom-1 left-0 w-0 group-hover/cta:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
            </motion.button>

          </div>

          {/* COLUMN 2: Large Visual Showcase (Responsive Order 1 on Mobile) */}
          <div className="order-1 lg:order-2 flex flex-col w-full min-w-0 max-w-full box-border">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/40 shadow-[0_20px_45px_rgba(0,0,0,0.55)] bg-black/40 group cursor-pointer"
            >
              {/* Internal Bezel Decoration */}
              <div className="absolute inset-0 border border-white/5 rounded-[28px] z-10 pointer-events-none" />

              {/* Ambient Dark Overlay (15% coverage) */}
              <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none transition-opacity duration-300 group-hover:bg-black/10" />

              {/* Parallax Image Render */}
              <motion.div
                style={{ y: yParallax, scale: scaleParallax }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/terrace.webp"
                  alt="Exclusive Oceanfront Coastal Horizon View"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103 filter brightness-95"
                  loading="lazy"
                />
              </motion.div>

              {/* Staggered bottom-left label badge overlay */}
              <div className="absolute bottom-8 left-8 z-20 font-sans text-[10px] sm:text-xs tracking-[0.25em] text-[#F6F3EB] uppercase font-semibold bg-black/45 backdrop-blur-md px-4 py-2 border border-white/10 rounded">
                {t("location.badge")}
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
