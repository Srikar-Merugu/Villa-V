"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_HEADER_GAP, SECTION_CONTAINER } from "../lib/motion";

interface GalleryItem {
  label: string;
  title: string;
  desc: string;
  imageSrc: string;
}

// Bento spans across two hero cells, two wide cells and two small cells -- a deliberately
// asymmetric grid rather than a uniform gallery grid, per the brief. Mobile collapses every
// cell to a single stacked column. Paired with grid-flow-dense on the container so the two
// small cells fill in beside the hero cells instead of leaving gaps.
const BENTO_SPANS = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-2 row-span-1"
];

function GalleryTile({ item, span, onOpen }: { item: GalleryItem; span: string; onOpen: () => void }) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Magnetic hover: the image drifts a few pixels toward the cursor instead of a static
  // hover-zoom, giving the grid a sense of depth that responds to the visitor directly.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 16, y: y * 16 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      className={`group relative w-full h-full min-h-[220px] overflow-hidden rounded-[20px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-black/40 cursor-pointer ${span}`}
    >
      <div className="absolute inset-0 border border-white/5 rounded-[20px] z-10 pointer-events-none" />

      <motion.div
        animate={{ x: offset.x, y: offset.y, scale: 1.12 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="absolute inset-[-6%] w-[112%] h-[112%]"
      >
        <Image
          src={item.imageSrc}
          alt={item.title.replace("\n", " ")}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover filter brightness-90 group-hover:brightness-100 transition-[filter] duration-500"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20">
        <span className="text-[#C8A96A] text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-1.5 block">
          {item.label}
        </span>
        <h4 className="font-serif text-[#F6F3EB] text-lg sm:text-2xl font-light leading-tight whitespace-pre-line">
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
  // Distinct crops derived from the site's 4 property photos (see public/images/gallery) --
  // none of these repeat a composition already shown in About/Amenities/FloorPlans/Location,
  // even though they're drawn from the same 4 source images.
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
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
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

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense auto-rows-[260px] sm:auto-rows-[300px] lg:auto-rows-[360px] gap-4 lg:gap-6 w-full max-w-full">
          {panels.map((panel, idx) => (
            <GalleryTile
              key={panel.title}
              item={panel}
              span={BENTO_SPANS[idx] ?? "col-span-1 row-span-1"}
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
                  initial={{ opacity: 0, scale: 0.9, clipPath: "inset(8% 8% 8% 8% round 20px)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 20px)" }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
