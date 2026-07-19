"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();

  // Scroll tracking metrics for slow parallax and scale transformations
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.08, 1.00]);

  // Split title string by newline for line-by-line reveal
  const titleLines = title.split("\n");

  const isImageLeft = index % 2 === 0;

  return (
    <div
      ref={panelRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center w-full max-w-full"
    >
      {/* COLUMN 1: Image container (Responsive Order 1 on Mobile/Tablet) */}
      <div 
        className={`col-span-12 lg:col-span-7 order-1 ${
          isImageLeft ? "lg:order-1" : "lg:order-2"
        } w-full min-w-0 max-w-full box-border`}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          onClick={onOpenLightbox}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-none lg:h-[650px] xl:h-[720px] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_20px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(200,169,106,0.08)] bg-black/40 cursor-pointer group"
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
        } flex flex-col justify-center w-full min-w-0 max-w-full box-border`}
      >
        <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4 block">
          {label}
        </span>

        {/* Header Reveal Line-by-Line */}
        <h3 className="font-serif text-[#F6F3EB] font-light text-[clamp(28px,6vw,38px)] lg:text-[clamp(38px,4vw,62px)] leading-[1.05] tracking-tight mb-5 lg:mb-6">
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
          <span>{t("gallery.cta")}</span>
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
  const { t } = useLanguage();

  const panelsData = t("gallery.panels") as { label: string; title: string; desc: string }[];
  const imageSources = [
    "/images/about.webp",
    "/images/terrace.webp",
    "/images/bedroom.webp",
    "/images/pool.webp"
  ];

  const panels = panelsData.map((p, idx) => ({
    label: p.label,
    title: p.title,
    desc: p.desc,
    imageSrc: imageSources[idx]
  }));

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
      className="relative py-20 lg:py-36 bg-[#0B0B0C] overflow-hidden select-none scroll-mt-24 lg:scroll-mt-20"
      aria-labelledby="gallery-heading"
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
            <span id="gallery-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              {t("gallery.label")}
            </span>
            <h2 className="text-[clamp(32px,6.5vw,42px)] lg:text-[clamp(48px,5.5vw,72px)] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6">
              {t("gallery.title")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[460px]"
          >
            {t("gallery.desc")}
          </motion.p>
        </div>

        {/* Dynamic Panels List */}
        <div className="flex flex-col gap-20 lg:gap-36 relative z-10">
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

      </div>

      {/* High-Contrast Glassmorphic Lightbox Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center select-none"
            onClick={() => setActiveImageIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox zoom view"
          >
            <div className="absolute top-5 right-5 z-55 flex gap-3">
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EB] hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/5 focus-visible:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EB] hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/5 focus-visible:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div 
              className="relative w-[90%] md:w-[80%] h-[75vh] flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full h-full rounded-[20px] overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
                >
                  <Image
                    src={panels[activeImageIndex].imageSrc}
                    alt={panels[activeImageIndex].title.replace("\n", " ")}
                    fill
                    sizes="100vw"
                    className="object-cover pointer-events-none"
                    priority
                  />
                  
                  {/* Subtle caption drawer card */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-[16px] p-5 md:p-6 text-left max-w-md filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                    <span className="text-[#C8A96A] text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-1.5 block">
                      {panels[activeImageIndex].label}
                    </span>
                    <h4 className="font-serif text-[#F6F3EB] text-xl md:text-2xl font-light mb-2 leading-tight">
                      {panels[activeImageIndex].title.replace("\n", " ")}
                    </h4>
                    <p className="text-[#B8B8B8] text-xs sm:text-sm font-normal leading-relaxed">
                      {panels[activeImageIndex].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EB] hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/5 focus-visible:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
