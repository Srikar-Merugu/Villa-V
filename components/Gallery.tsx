"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_HEADER_GAP, SECTION_CONTAINER } from "../lib/motion";

interface GalleryItem {
  label: string;
  title: string;
  desc: string;
  imageSrc: string;
}

function GalleryCard({
  item,
  index,
  onOpen
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(200,169,106,0.15)] bg-[#0B0B0C] cursor-pointer transition-all duration-500 ease-out"
    >
      {/* Inner Border Highlight */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-20 group-hover:border-[#C8A96A]/30 transition-colors duration-500" />

      {/* Image Container with Crisp Scale Hover Effect */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.title.replace("\n", " ")}
          fill
          quality={95}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
          loading="lazy"
        />
      </div>

      {/* Luxury Gradient Overlay for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Subtle Expand Badge on Hover */}
      <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 group-hover:text-[#C8A96A] group-hover:border-[#C8A96A]/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 z-20 flex flex-col justify-end">
        <span className="text-[#C8A96A] text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.25em] uppercase mb-2 block transition-transform duration-300 group-hover:-translate-y-0.5">
          {item.label}
        </span>
        <h4 className="font-serif text-[#F6F3EB] text-xl sm:text-2xl font-light leading-snug tracking-wide whitespace-pre-line group-hover:text-white transition-colors duration-300">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const panelsData = t("gallery.panels") as { label: string; title: string; desc: string }[];
  const imageSources = [
    "/images/gallery/exterior-detail.webp",
    "/images/gallery/infinity-edge.webp",
    "/images/gallery/living-corridor.webp",
    "/images/gallery/master-suite.webp",
    "/images/gallery/ensuite.webp",
    "/images/gallery/pool-horizon.webp"
  ];

  const panels: GalleryItem[] = panelsData.map((p, idx) => ({
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
      className={`relative w-full max-w-full bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border ${SECTION_PADDING}`}
      aria-labelledby="gallery-heading"
    >
      {/* Architectural Grid Texture */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className={SECTION_CONTAINER}>

        {/* Section Header */}
        <div className={`max-w-3xl flex flex-col ${SECTION_HEADER_GAP}`}>
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

        {/* Premium Balanced Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-full">
          {panels.map((panel, idx) => (
            <GalleryCard
              key={panel.title}
              item={panel}
              index={idx}
              onOpen={() => setActiveImageIndex(idx)}
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
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EB] hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/5 focus-visible:outline-none z-55"
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
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full rounded-[20px] overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
                >
                  <Image
                    src={panels[activeImageIndex].imageSrc}
                    alt={panels[activeImageIndex].title.replace("\n", " ")}
                    fill
                    quality={95}
                    sizes="100vw"
                    className="object-cover pointer-events-none"
                    priority
                  />

                  {/* Caption drawer card */}
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
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EB] hover:text-[#C8A96A] flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/5 focus-visible:outline-none z-55"
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
