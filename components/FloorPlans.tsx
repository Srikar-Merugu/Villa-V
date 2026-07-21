"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function FloorPlans() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { t } = useLanguage();

  const levelsData = t("floorPlans.levels") as { id: string; name: string; desc: string; highlights: string[] }[];
  const imageSources = [
    "/images/pool.webp",
    "/images/bedroom.webp",
    "/images/terrace.webp"
  ];

  const levels = levelsData.map((l, idx) => ({
    id: l.id,
    name: l.name,
    desc: l.desc,
    highlights: l.highlights,
    imageSrc: imageSources[idx]
  }));

  const currentLevel = levels[activeIndex] || levels[0];
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect accessibility system setting for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Autoplay cycle timer (5 seconds loop interval)
  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % levels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reduceMotion, isPaused, levels.length]);

  // Handle user tap interaction (pauses autoplay for 10 seconds to allow reading detail specs)
  const handleUserSelect = (idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);

    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }

    inactivityTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000); // Resume autoplay cycle after 10s inactivity
  };

  useEffect(() => {
    return () => {
      if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
    };
  }, []);

  const tabContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="floor-plans" 
      className="relative w-full max-w-full py-20 lg:py-36 bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-24 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              {t("floorPlans.label")}
            </span>
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[68px] xl:text-[80px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6">
              {t("floorPlans.title")}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[520px]"
          >
            {t("floorPlans.desc")}
          </motion.p>
        </div>

        {/* Two-Column Tour Layout (Left 40%, Right 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 xl:gap-24 items-center w-full max-w-full">
          
          {/* COLUMN 1: Editorial Navigation & Highlight Bullets */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col w-full min-w-0 max-w-full box-border">
            
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4 lg:mb-6 block">
              {t("floorPlans.label")}
            </span>

            {/* Full-width segmented grid on Mobile, Vertical tab list on Desktop */}
            <div 
              role="tablist"
              aria-label="Residence levels tour selector"
              className="grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-0 border border-[#C8A96A]/20 lg:border-none bg-[#121214] lg:bg-transparent p-1 lg:p-0 rounded-full lg:rounded-none w-full"
            >
              {levels.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => handleUserSelect(idx)}
                    className="relative text-left h-[38px] sm:h-[44px] lg:h-auto lg:py-6 lg:border-b lg:border-white/10 flex items-center justify-center lg:justify-start px-2 sm:px-4 lg:px-0 text-[10px] sm:text-xs lg:text-[15px] font-sans font-medium lg:font-light tracking-[0.1em] lg:tracking-[0.15em] uppercase transition-all duration-500 ease-out cursor-pointer focus-visible:outline-none rounded-full lg:rounded-none"
                  >
                    {/* Sliding Pill Indicator on Mobile */}
                    {isActive && (
                      <motion.div
                        layoutId="activeMobileTab"
                        className="absolute inset-0 bg-[#C8A96A]/10 border border-[#C8A96A]/30 rounded-full lg:hidden z-0 w-full h-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className={`relative z-10 transition-colors duration-500 whitespace-nowrap ${isActive ? "text-[#C8A96A]" : "text-[#F6F3EB]/40 hover:text-[#F6F3EB]/80"}`}>
                      {item.name}
                    </span>
                    
                    {/* Sleek Line Indicator on Desktop */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden hidden lg:block">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: isActive ? "0%" : "-100%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full bg-[#C8A96A]"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic narrative description and bullet highlights */}
            <div className="min-h-[160px] lg:min-h-[220px] mt-6 lg:mt-8 flex flex-col justify-start select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                  id={`panel-${currentLevel.id}`}
                  role="tabpanel"
                >
                  <p className="text-[#B8B8B8] text-[15px] sm:text-[16px] font-normal leading-[1.8] mb-6 sm:mb-8">
                    {currentLevel.desc}
                  </p>

                  <motion.div 
                    variants={tabContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-3.5"
                  >
                    {currentLevel.highlights.map((highlight) => (
                      <motion.div
                        key={highlight}
                        variants={highlightVariants}
                        className="flex items-center gap-3.5"
                      >
                        <div className="w-[5px] h-[5px] rounded-full bg-[#C8A96A]" />
                        <span className="text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.2em] text-[#F6F3EB] uppercase">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* COLUMN 2: Large Cinematic Showcase (Crossfading Absolute Overlays) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col w-full min-w-0 max-w-full box-border">
            
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[500px] xl:h-[580px] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.55)] bg-black/40">
              
              {/* Internal Bezel Decoration */}
              <div className="absolute inset-0 border border-white/5 rounded-[24px] z-15 pointer-events-none" />

              {/* Layered Images to enable overlay crossfades (no blank gaps) */}
              {levels.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: isActive ? 10 : 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1.0 : 1.05
                    }}
                    transition={{ 
                      opacity: { duration: 0.8, ease: "easeInOut" },
                      scale: { duration: 1.2, ease: "easeOut" }
                    }}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover filter brightness-[0.85] transition-all duration-[2000ms]"
                      priority={idx === 0}
                    />
                  </motion.div>
                );
              })}

              {/* Dynamic bottom left specs coordinates badge */}
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-widest text-[#F6F3EB]/50 bg-[#0A0A0A]/40 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded uppercase">
                V-S // LVL {activeIndex + 1}
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
