"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FloorPlans() {
  const [activeLevel, setActiveLevel] = useState(0);

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

  const currentLevel = levels[activeLevel];

  const stats = [
    { value: "12,400 SQ FT", label: "Crafted Interior" },
    { value: "Panoramic Views", label: "Every Room" },
    { value: "Private Living", label: "Absolute Comfort" }
  ];

  return (
    <section 
      id="floor-plans" 
      className="relative py-[100px] lg:py-[180px] bg-[#0B0B0C] overflow-hidden select-none"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              THE RESIDENCE
            </span>
            <h2 className="text-[38px] sm:text-[46px] lg:text-[68px] xl:text-[80px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-6">
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
          
          {/* COLUMN 1: Editorial Navigation & Highlight bullets (Responsive Order 2 on Mobile) */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 flex flex-col">
            
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-6 block">
              LEVELS
            </span>

            {/* Horizontal scroll chips on Mobile, Vertical tab list on Desktop */}
            <div 
              role="tablist"
              aria-label="Residence levels tour selector"
              className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 lg:gap-0 border-b lg:border-b-0 border-white/5 whitespace-nowrap lg:whitespace-normal scrollbar-none"
            >
              {levels.map((item, idx) => {
                const isActive = activeLevel === idx;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    onClick={() => setActiveLevel(idx)}
                    className={`text-left py-3 lg:py-4 lg:border-b transition-all duration-300 relative text-[13px] sm:text-[14px] tracking-[0.14em] font-medium uppercase cursor-pointer focus-visible:outline-none flex justify-between items-center rounded-full lg:rounded-none px-5 lg:px-0 border lg:border-x-0 lg:border-t-0 ${
                      isActive 
                        ? "text-[#C8A96A] border-[#C8A96A] bg-[#C8A96A]/5 lg:bg-transparent" 
                        : "text-[#F6F3EB]/60 border-white/10 hover:text-[#C8A96A] hover:border-[#C8A96A]/30 bg-transparent"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="hidden lg:inline text-[#C8A96A] text-xs transition-transform duration-300">
                      {isActive ? "▼" : "→"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Level Content Info Stagger Box */}
            <div className="min-h-[180px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLevel.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                  className="flex flex-col gap-6 mt-10"
                >
                  <h4 className="font-serif text-[#F6F3EB] text-[22px] sm:text-[26px] font-light leading-tight">
                    {currentLevel.desc}
                  </h4>
                  
                  <ul className="flex flex-col gap-3">
                    {currentLevel.highlights.map((highlight) => (
                      <li 
                        key={highlight} 
                        className="text-[#B8B8B8] text-[15px] sm:text-[16px] flex items-center gap-3 font-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* COLUMN 2: Large Cinematic Showcase Container (Responsive Order 1 on Mobile) */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 flex flex-col">
            
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[5/4] w-full overflow-hidden rounded-[24px] border border-[#C8A96A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.55)] bg-black/40">
              
              {/* Internal Bezel Decoration */}
              <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />

              {/* Crossfade Image Frame (Slow Ken Burns zoom effect) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLevel.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 0.7 },
                    scale: { duration: 15, ease: "linear" }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentLevel.imageSrc}
                    alt={currentLevel.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover filter brightness-95"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* BOTTOM AREA: Editorial Luxury Highlights Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-12 border-t border-white/10 mt-20 lg:mt-28">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col select-none">
              <span className="font-serif text-[#C8A96A] text-xl sm:text-2xl font-light tracking-wide">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#F6F3EB] font-medium uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
