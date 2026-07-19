"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPanelProps {
  label: string;
  title: string;
  desc: string;
  imageSrc: string;
  index: number;
  onOpenLightbox: () => void;
}

function GalleryPanel({ label, title, desc, imageSrc, index, onOpenLightbox }: GalleryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll tracking metrics for slow parallax and scale transformations
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.08, 1.00]);

  // Split title string by newline for line-by-line reveal
  const titleLines = title.split("\n");

  // Determine left/right side columns alignment
  const isImageLeft = index % 2 === 0;

  return (
    <div
      ref={panelRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center w-full"
    >
      {/* COLUMN 1: Image container (Responsive Order 1 on Mobile/Tablet) */}
      <div 
        className={`col-span-12 lg:col-span-7 order-1 ${
          isImageLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          onClick={onOpenLightbox}
          className="relative w-full h-[380px] sm:h-[500px] lg:h-[650px] xl:h-[720px] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_20px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(200,169,106,0.08)] bg-black/40 cursor-pointer group"
        >
          {/* Inner bezel decoration */}
          <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />

          {/* Luxury soft gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 pointer-events-none" />

          <motion.div 
            style={{ y: yParallax, scale: scaleParallax }}
            className="w-full h-full relative"
          >
            <Image
              src={imageSrc}
              alt={title.replace("\n", " ")}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] filter brightness-95"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* COLUMN 2: Typography & Navigation Links (Responsive Order 2 on Mobile/Tablet) */}
      <div 
        className={`col-span-12 lg:col-span-5 order-2 ${
          isImageLeft ? "lg:order-2" : "lg:order-1"
        } flex flex-col justify-center`}
      >
        <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4 block">
          {label}
        </span>

        {/* Header Reveal Line-by-Line */}
        <h3 className="font-serif text-[#F6F3EB] font-light text-[32px] sm:text-[36px] md:text-[42px] lg:text-[54px] xl:text-[62px] leading-[1.05] tracking-tight mb-5 lg:mb-6">
          {titleLines.map((line, i) => (
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

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.7] max-w-[420px] mb-6 lg:mb-8"
        >
          {desc}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={onOpenLightbox}
          className="group/btn relative self-start flex items-center gap-2 text-[#C8A96A] font-sans font-semibold text-[13px] uppercase tracking-[0.15em] hover:text-[#F6F3EB] transition-colors duration-300 min-h-[44px] focus-visible:outline-none"
        >
          <span>Explore</span>
          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 select-none">
            →
          </span>
          {/* Animated Gold Underline on hover */}
          <span className="absolute bottom-1 left-0 w-0 group-hover/btn:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
        </motion.button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const panels = [
    {
      label: "EXTERIOR",
      title: "Architecture\nin Harmony",
      desc: "Every line is designed to embrace the surrounding landscape.",
      imageSrc: "/images/about.webp"
    },
    {
      label: "LIVING",
      title: "Designed\nfor Gathering",
      desc: "Open spaces where architecture meets comfort.",
      imageSrc: "/images/terrace.webp"
    },
    {
      label: "MASTER SUITE",
      title: "Private\nRetreat",
      desc: "A sanctuary of calm with uninterrupted views.",
      imageSrc: "/images/bedroom.webp"
    },
    {
      label: "POOL",
      title: "Infinity\nExperience",
      desc: "Where water, sky and architecture become one.",
      imageSrc: "/images/pool.webp"
    }
  ];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % panels.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + panels.length) % panels.length);
    }
  };

  // Keyboard accessibility listeners for active lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  return (
    <section
      id="gallery"
      className="relative py-20 lg:py-36 bg-[#0B0B0C] overflow-hidden select-none"
      aria-labelledby="gallery-heading"
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
            <span id="gallery-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              THE SHOWCASE
            </span>
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[60px] xl:text-[72px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6">
              Visual Chronicles
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[460px]"
          >
            A photographic capture of architectural geometry, light, and natural textures.
          </motion.p>
        </div>

        {/* Alternating Panels Grid (Desktop spacing: 140px vertical gaps) */}
        <div className="flex flex-col gap-20 lg:gap-[140px]" role="region" aria-label="Cinematic Visual Chronology">
          {panels.map((panel, idx) => (
            <GalleryPanel
              key={panel.title}
              label={panel.label}
              title={panel.title}
              desc={panel.desc}
              imageSrc={panel.imageSrc}
              index={idx}
              onOpenLightbox={() => setActiveImageIndex(idx)}
            />
          ))}
        </div>

        {/* Full-screen Lightbox viewer (A11y compatible dialogues) */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Fullscreen viewer: ${panels[activeImageIndex].title.replace("\n", " ")}`}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            >
              {/* Top HUD Row */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[#F6F3EB]/60 select-none pointer-events-none font-mono text-xs tracking-widest z-50">
                <div>
                  {activeImageIndex + 1} / {panels.length}
                </div>
                <button
                  onClick={() => setActiveImageIndex(null)}
                  aria-label="Close fullscreen view"
                  className="w-10 h-10 border border-white/10 hover:border-[#C8A96A] hover:text-[#C8A96A] rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md cursor-pointer pointer-events-auto transition-colors focus-visible:ring-1 focus-visible:ring-[#C8A96A] focus-visible:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Prev Arrow */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-6 md:left-12 w-12 h-12 rounded-full border border-white/10 hover:border-[#C8A96A] hover:text-[#C8A96A] flex items-center justify-center text-white bg-black/50 backdrop-blur-md cursor-pointer pointer-events-auto z-40 transition-colors focus-visible:ring-1 focus-visible:ring-[#C8A96A] focus-visible:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central Expanded Visual */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-5xl max-h-[80vh] w-full h-full pointer-events-none select-none"
              >
                <Image
                  src={panels[activeImageIndex].imageSrc}
                  alt={panels[activeImageIndex].title.replace("\n", " ")}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-6 md:right-12 w-12 h-12 rounded-full border border-white/10 hover:border-[#C8A96A] hover:text-[#C8A96A] flex items-center justify-center text-white bg-black/50 backdrop-blur-md cursor-pointer pointer-events-auto z-40 transition-colors focus-visible:ring-1 focus-visible:ring-[#C8A96A] focus-visible:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom HUD row */}
              <div className="absolute bottom-6 left-6 right-6 text-center select-none pointer-events-none z-40">
                <span className="text-[10px] font-mono tracking-widest text-[#C8A96A] uppercase mb-1 block">
                  {panels[activeImageIndex].label}
                </span>
                <h4 className="text-lg md:text-xl font-serif text-[#F6F3EB] font-light tracking-wide">
                  {panels[activeImageIndex].title.replace("\n", " ")}
                </h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
