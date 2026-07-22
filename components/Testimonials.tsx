"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "The villa achieves a rare balance between modern architecture and timeless elegance.",
      author: "Architectural Digest",
      awardTitle: "Architectural Excellence",
      awardDesc: "Award-winning design.",
      imageSrc: "/images/about.webp"
    },
    {
      quote: "A masterclass in organic modernism, blurring the boundaries between interior and exterior.",
      author: "Dezeen",
      awardTitle: "Best Residential Concept",
      awardDesc: "Category Winner.",
      imageSrc: "/images/pool.webp"
    },
    {
      quote: "Sculpted with light, glass and volcanic stone. An extraordinary coastal masterpiece.",
      author: "Designboom",
      awardTitle: "Bespoke Craftsmanship",
      awardDesc: "Highly Commended.",
      imageSrc: "/images/terrace.webp"
    },
    {
      quote: "The absolute pinnacle of calm luxury. Every view frame feels curated like a fine art print.",
      author: "Luxury Living Magazine",
      awardTitle: "Calm Luxury Retreat",
      awardDesc: "Editor's Choice.",
      imageSrc: "/images/bedroom.webp"
    }
  ];

  const logos = [
    { name: "ARCHITECTURAL DIGEST", className: "font-serif text-[12px] sm:text-[13px] tracking-[0.2em] font-medium" },
    { name: "dezeen", className: "font-sans text-[15px] sm:text-[16px] tracking-tight font-bold lowercase" },
    { name: "Wallpaper*", className: "font-serif text-[14px] sm:text-[15px] tracking-wide font-light italic" },
    { name: "designboom", className: "font-sans text-[12px] sm:text-[13px] tracking-wider font-semibold lowercase" },
    { name: "LUXURY AWARDS", className: "font-sans text-[10px] sm:text-[11px] tracking-[0.25em] font-semibold" }
  ];

  const currentReview = reviews[activeIndex];

  // Auto rotation interval (6 seconds per review)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section 
      id="testimonials" 
      className="relative w-full max-w-full py-[100px] lg:py-[160px] bg-[#0B0B0C] overflow-x-hidden select-none box-border"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span id="testimonials-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              RECOGNITION
            </span>
            <h2 className="text-[38px] sm:text-[46px] lg:text-[60px] xl:text-[72px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-6">
              Recognized for{"\n"}Architectural Excellence
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[520px]"
          >
            Praised by architects, designers, and luxury homeowners worldwide.
          </motion.p>
        </div>

        {/* Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 xl:gap-24 items-center">

          {/* COLUMN 1: Large Editorial Quote */}
          <div className="flex flex-col justify-center min-h-[300px] relative w-full min-w-0 max-w-full box-border">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col"
              >
                {/* Quotation Mark Icon */}
                <span className="font-serif text-[#C8A96A] text-[64px] sm:text-[76px] leading-none select-none h-6 font-light mt-2 block">
                  “
                </span>
                
                <blockquote className="font-serif text-[#F6F3EB] text-[22px] sm:text-[28px] lg:text-[32px] xl:text-[36px] font-light leading-[1.35] tracking-wide max-w-[540px] mt-4">
                  {currentReview.quote}
                </blockquote>
                
                <cite className="text-[#B8B8B8] text-[13px] sm:text-[14px] font-sans font-bold tracking-[0.15em] mt-8 uppercase not-italic block">
                  — {currentReview.author}
                </cite>
                
                <div className="w-12 h-[1px] bg-[#C8A96A] mt-4" />
              </motion.div>
            </AnimatePresence>

          </div>

          {/* COLUMN 2: Large Visual Showcase with Ambient Gold Glow */}
          <div className="relative flex flex-col justify-center w-full min-w-0 max-w-full box-border">
            
            {/* Optional Ambient Gold Glow Behind Card */}
            <div className="absolute -right-[5%] top-[5%] w-[350px] h-[350px] rounded-full bg-[#C8A96A]/5 blur-[120px] pointer-events-none z-0 hidden lg:block" />

            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-[#C8A96A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.55)] bg-black/40 z-10 group cursor-pointer">
              
              {/* Internal Bezel Bevel */}
              <div className="absolute inset-0 border border-white/5 rounded-[28px] z-20 pointer-events-none" />

              {/* Crossfading overlay visuals */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1.00 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentReview.imageSrc}
                    alt={currentReview.awardTitle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover filter brightness-95"
                    priority
                  />
                  
                  {/* Staggered bottom-left details badge */}
                  <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start bg-black/45 backdrop-blur-md px-4 py-2.5 border border-white/10 rounded select-none">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A96A] uppercase font-semibold">
                      {currentReview.awardTitle}
                    </span>
                    <span className="font-sans text-[9px] tracking-wider text-[#F6F3EB]/70 uppercase mt-0.5">
                      {currentReview.awardDesc}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* LOGO ROW: Monochrome tracked text block */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center justify-items-center border-t border-white/10 pt-16 mt-20 lg:mt-28 w-full select-none">
          {logos.map((logo, idx) => (
            <motion.span
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`text-[#F6F3EB]/40 hover:text-[#C8A96A] transition-colors duration-300 ${logo.className}`}
            >
              {logo.name}
            </motion.span>
          ))}
        </div>

      </div>
    </section>
  );
}
