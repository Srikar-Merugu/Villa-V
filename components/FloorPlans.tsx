"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FloorPlans() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const levels = [
    {
      id: "ground",
      name: "Ground Level",
      desc: "Open spaces designed for effortless entertaining.",
      highlights: ["Infinity Pool", "Chef's Kitchen", "Grand Living Area"],
      imageSrc: "/images/pool.webp"
    },
    {
      id: "first",
      name: "First Floor",
      desc: "Private retreats crafted with ultimate comfort.",
      highlights: ["Master Suite", "Walk-in Closet", "Private Lounge"],
      imageSrc: "/images/bedroom.webp"
    },
    {
      id: "sky",
      name: "Sky Terrace",
      desc: "Elevated outdoor living above the clouds.",
      highlights: ["Rooftop Lounge", "Fire Pit", "Sky Pool"],
      imageSrc: "/images/terrace.webp"
    }
  ];

  const currentLevel = levels[activeIndex];
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
  }, [isPaused, reduceMotion, levels.length]);

  // Tab interaction selector
  const handleSelectLevel = (idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);

    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }

    // Resume automated cycle after 8 seconds of inactivity
    inactivityTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="floor-plans" 
      className="relative py-20 lg:py-36 bg-[#0B0B0C] overflow-hidden select-none"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-24 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              THE RESIDENCE
            </span>
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[68px] xl:text-[80px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6">
              Explore{"\n"}Every Level
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[520px]"
          >
            Experience thoughtfully crafted spaces designed for extraordinary living.
          </motion.p>
        </div>

        {/* Two-Column Tour Layout (Left 40%, Right 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* COLUMN 1: Editorial Navigation & Highlight Bullets */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 flex flex-col">
            
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-6 block">
              LEVELS
            </span>

            {/* Horizontal scroll chips on Mobile, Vertical tab list on Desktop */}
            <div 
              role="tablist"
              aria-label="Residence levels tour selector"
              className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 lg:gap-0 border-b lg:border-b-0 border-white/5 whitespace-nowrap lg:whitespace-normal scrollbar-none"
            >
              {levels.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    onClick={() => handleSelectLevel(idx)}
                    className="text-left py-3 lg:py-5 cursor-pointer relative focus-visible:outline-none flex flex-col w-full shrink-0 max-w-[200px] lg:max-w-none group"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-[13px] sm:text-[14px] tracking-[0.14em] font-medium uppercase transition-colors duration-300 ${
                        isActive ? "text-[#C8A96A]" : "text-[#F6F3EB]/60 group-hover:text-[#C8A96A]/80"
                      }`}>
                        {item.name}
                      </span>
                      <span className={`hidden lg:inline text-xs transition-colors duration-300 ${
                        isActive ? "text-[#C8A96A]" : "text-transparent"
                      }`}>
                        ←
                      </span>
                    </div>

                    {/* Progress Indicator Underline */}
                    <div className="relative w-full h-[1.5px] bg-white/10 mt-3">
                      {/* Active autofilling progress bar */}
                      {isActive && !isPaused && !reduceMotion && (
                        <motion.div
                          key={activeIndex} // Reset progress line timeline on index changes
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="absolute top-0 left-0 h-full bg-[#C8A96A]"
                        />
                      )}
                      {/* Static full-color state when paused or reduced motion query matches */}
                      {isActive && (isPaused || reduceMotion) && (
                        <div className="absolute top-0 left-0 h-full w-full bg-[#C8A96A]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Level details & list layout */}
            <div className="min-h-[220px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="flex flex-col gap-6 mt-8"
                >
                  <h4 className="font-serif text-[#F6F3EB] text-[22px] sm:text-[26px] font-light leading-tight">
                    {currentLevel.desc}
                  </h4>
                  
                  <motion.ul
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-3"
                  >
                    {currentLevel.highlights.map((highlight) => (
                      <motion.li 
                        key={highlight} 
                        variants={listItemVariants}
                        className="text-[#B8B8B8] text-[15px] sm:text-[16px] flex items-center gap-3 font-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* COLUMN 2: Large Cinematic Showcase (Crossfading Absolute Overlays) */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 flex flex-col">
            
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[500px] xl:h-[580px] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.55)] bg-black/40">
              
              {/* Internal Bezel Decoration */}
              <div className="absolute inset-0 border border-white/5 rounded-[24px] z-15 pointer-events-none" />

              {/* Layered Images to enable overlay crossfades (no blank gaps) */}
              {levels.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0, 
                      scale: isActive ? 1 : 1.03,
                      zIndex: isActive ? 10 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover filter brightness-95"
                      priority={idx === 0}
                    />
                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
