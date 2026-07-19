"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Bind scroll-linked parallax adjustments directly to the GPU rendering timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform shifts and scroll scales
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.08, 1.00]);

  const headingLines = ["Sculpting", "Light,", "Space &", "Stone"];

  const features = [
    {
      title: "Architecture",
      desc: "Minimal contemporary design.",
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 5.447-2.724A1 1 0 0121 3.176v10.764a1 1 0 01-.553.894L15 18l-6 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20V2m6 16V5" />
        </svg>
      )
    },
    {
      title: "Craftsmanship",
      desc: "Every detail carefully finished.",
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      )
    },
    {
      title: "Panoramic Living",
      desc: "Uninterrupted mountain views.",
      icon: (
        <svg className="w-5 h-5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    }
  ];

  const metrics = [
    { val: "12,400", label: "SQ FT", posClass: "xl:top-[8%] xl:-left-12" },
    { val: "5", label: "Bedrooms", posClass: "xl:top-[38%] xl:-right-12" },
    { val: "Infinity", label: "Views", posClass: "xl:bottom-[38%] xl:-left-12" },
    { val: "Private", label: "Residence", posClass: "xl:bottom-[8%] xl:-right-12" }
  ];

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
      className="relative py-20 lg:py-36 bg-[#0B0B0C] overflow-hidden select-none scroll-mt-24 lg:scroll-mt-20"
    >
      {/* Decorative Blueprint Background Grid - Reduced opacity to 4% (almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.04] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20 relative z-10">
        
        {/* Two-Column Responsive Grid Layout (Desktop Left 45%, Right 55%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 xl:gap-32 items-center w-full">
          
          {/* COLUMN 1: Storytelling Details & Feature Cards (Responsive Order 2 on Mobile) */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 flex flex-col">
            
            {/* Small Luxury Label */}
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              THE CONCEPTION
            </span>

            {/* Editorial Heading (Line by Line reveal) */}
            <h3 className="font-serif text-[#F6F3EB] font-light text-[clamp(32px,6.5vw,42px)] lg:text-[clamp(48px,6vw,84px)] leading-[1.05] tracking-tight mb-5 lg:mb-8">
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
              Designed to blur the boundary between architecture and nature.
            </motion.p>

            {/* Feature Cards Vertical Block */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col w-full"
            >
              {features.map((feature, idx) => (
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
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 relative w-full max-w-full flex flex-col">
            
            <motion.div
              style={{ y: yParallax }}
              className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] xl:aspect-[11/13] w-full max-w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#C8A96A]/20 shadow-[0_24px_50px_rgba(0,0,0,0.6)] group"
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
                LAT: 43.7225° N | ALT: 114M
              </div>
            </motion.div>

            {/* Staggered Premium Glass Metric Cards */}
            {/* Desktop: Absolute Positioned Floaters | Mobile/Tablet: 2x2 Grid Layout below container */}
            <div className="grid grid-cols-2 gap-4 mt-8 xl:mt-0 xl:block w-full max-w-full">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: "easeOut" }}
                  className={`p-4 sm:p-5 flex flex-col items-center justify-center text-center rounded-[18px] border border-[#C8A96A]/15 bg-[#121214] backdrop-blur-md shadow-xl select-none w-full min-w-0 max-w-full box-border ${metric.posClass} xl:absolute xl:w-[155px] xl:z-20`}
                >
                  <span className="font-serif text-[#C8A96A] text-xl sm:text-2xl font-light tracking-wide">
                    {metric.val}
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#F6F3EB] font-medium uppercase mt-1">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
