"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_CONTAINER, EASE_CINEMATIC } from "../lib/motion";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Bind scroll-linked parallax adjustments directly to the GPU rendering timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform shifts and scroll scales
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.08, 1.00]);

  const headingLines = t("about.headings") as string[];

  const features = [
    {
      title: t("about.features.0.title"),
      desc: t("about.features.0.desc"),
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 5.447-2.724A1 1 0 0121 3.176v10.764a1 1 0 01-.553.894L15 18l-6 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20V2m6 16V5" />
        </svg>
      )
    },
    {
      title: t("about.features.1.title"),
      desc: t("about.features.1.desc"),
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      )
    },
    {
      title: t("about.features.2.title"),
      desc: t("about.features.2.desc"),
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    }
  ];

  const metrics = t("about.metrics") as { val: string; label: string }[];

  // Divider borders for a stat strip that reflows from a 2x2 grid (mobile) to a single
  // row (sm+) without a border appearing on the wrong edge at either layout.
  const metricBorderClasses = (i: number) => {
    const classes: string[] = [];
    if (i % 2 === 1) classes.push("border-l");
    else if (i > 0) classes.push("sm:border-l");
    if (i >= 2) classes.push("border-t", "sm:border-t-0");
    return classes.join(" ");
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full max-w-full bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border ${SECTION_PADDING}`}
    >
      {/* Decorative Blueprint Background Grid - Reduced opacity to 4% (almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.04] pointer-events-none" />

      <div className={SECTION_CONTAINER}>
        
        {/* Two-Column Responsive Grid Layout (Desktop Left 45%, Right 55%) */}
        {/* Direct 2-column template instead of grid-cols-12 + col-span: with a 12-track grid,
            `gap` reserves space at all 11 internal lines regardless of how few items use them,
            so a large gap (here up to 128px) can need over 1000px of reserved gap alone --
            more than the whole container at common laptop widths (~1024-1500px) -- and the
            columns stop respecting their ratio, overflowing their own parent. A 2-column
            template has exactly one gap line, so it can't blow out this way. */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-24 xl:gap-32 items-center w-full">
          
          {/* COLUMN 1: Storytelling Details & Feature Cards (Responsive Order 2 on Mobile) */}
          <div className="order-2 lg:order-1 flex flex-col w-full min-w-0 max-w-full box-border">

            {/* Small Luxury Label */}
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              {t("about.label")}
            </span>

            {/* Editorial Heading (Line by Line reveal) */}
            <h3 className="font-serif text-[#F6F3EB] font-light text-[clamp(34px,7vw,46px)] lg:text-[clamp(52px,6.5vw,96px)] leading-[1.05] tracking-tight mb-5 lg:mb-8">
              {headingLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h3>

            {/* Premium single statement summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#F6F3EB] text-[16px] sm:text-[18px] font-normal leading-[1.6] text-shadow-subtle text-opacity-95 max-w-[520px] mb-8 lg:mb-12"
            >
              {t("about.tagline")}
            </motion.p>

            {/* Feature Cards Vertical Block */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col w-full"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="border-t border-white/10 py-5 flex items-start gap-4"
                >
                  <div className="p-2 border border-white/5 bg-white/[0.02] rounded-lg shrink-0 mt-0.5">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#F6F3EB] text-[14px] sm:text-[16px] font-semibold tracking-[0.15em] uppercase mb-1 leading-none">
                      {feature.title}
                    </span>
                    <span className="text-[#B8B8B8] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                      {feature.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* COLUMN 2: Hero Visual Showcase & Metric Overlay (Responsive Order 1 on Mobile) */}
          <div className="order-1 lg:order-2 relative w-full min-w-0 max-w-full flex flex-col box-border">
            
            <motion.div
              style={{ y: yParallax }}
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: EASE_CINEMATIC }}
              className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] xl:aspect-[11/13] w-full max-w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#C8A96A]/20 shadow-[0_24px_50px_rgba(0,0,0,0.6)] group isolate"
            >
              {/* Luxury interior outline overlay */}
              <div className="absolute inset-0 border border-white/5 z-10 rounded-[24px] sm:rounded-[32px] pointer-events-none" />

              <motion.div
                style={{ scale: scaleParallax }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/about.webp"
                  alt="Villa Sérénité Exterior Concept View"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95"
                  priority
                  loading="eager"
                />
              </motion.div>

              {/* Decorative HUD Coordinates */}
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-widest text-[#F6F3EB]/50 bg-[#0A0A0A]/40 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded uppercase">
                {t("about.hud")}
              </div>
            </motion.div>

            {/* Signature Stats Strip: a bordered row of figures beneath the image, in normal
                document flow. Replaces the old floating corner badges, which overlapped the
                photo with negative offsets and clipped at several viewport widths. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-full mt-8 rounded-[16px] border border-white/10 bg-[#121214] overflow-hidden box-border"
            >
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`flex flex-col items-center justify-center text-center gap-1.5 px-2 py-5 sm:py-6 border-white/10 min-w-0 ${metricBorderClasses(i)}`}
                >
                  <span className="font-serif text-[#C8A96A] text-lg sm:text-xl md:text-2xl font-light tracking-wide">
                    {metric.val}
                  </span>
                  <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] text-[#F6F3EB] font-medium uppercase leading-tight">
                    {metric.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
