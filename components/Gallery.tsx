"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  tag: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/about.png",
    title: "Dusk Silhouette Rendering",
    tag: "EXTERIOR"
  },
  {
    src: "/images/pool.png",
    title: "Living Lounge and Infinity Mirror",
    tag: "LIVING SPACE"
  },
  {
    src: "/images/bedroom.png",
    title: "Master Suite Ocean Panoramas",
    tag: "SUITE"
  },
  {
    src: "/images/pool.png",
    title: "Terrace Sunset Mirroring",
    tag: "OUTDOOR"
  }
];

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden select-none border-t border-gold/5">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
              The Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Visual Chronicles
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            A photographic capture of architectural geometry, light, and natural textures.
          </motion.p>
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              onClick={() => setActiveImageIndex(i)}
              className={`group relative overflow-hidden border border-gold/15 cursor-pointer ${
                i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3] md:translate-y-8"
              }`}
            >
              {/* Overlay Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-1 block">
                      {img.tag}
                    </span>
                    <h4 className="text-lg md:text-xl font-serif text-white font-light tracking-wide">
                      {img.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Parallax Image Scale */}
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox Viewer Overlay */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            >
              {/* Top Bar HUD */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/55 select-none pointer-events-none font-mono text-xs tracking-widest z-50">
                <div>
                  {activeImageIndex + 1} / {GALLERY_IMAGES.length}
                </div>
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md cursor-pointer pointer-events-auto transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-6 md:left-12 w-12 h-12 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-white bg-black/50 backdrop-blur-md cursor-pointer pointer-events-auto z-40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Interactive Image Frame */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-5xl max-h-[80vh] w-full h-full pointer-events-none select-none"
              >
                <Image
                  src={GALLERY_IMAGES[activeImageIndex].src}
                  alt={GALLERY_IMAGES[activeImageIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-6 md:right-12 w-12 h-12 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-white bg-black/50 backdrop-blur-md cursor-pointer pointer-events-auto z-40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Text Caption at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-center select-none pointer-events-none z-40">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-1 block">
                  {GALLERY_IMAGES[activeImageIndex].tag}
                </span>
                <h4 className="text-lg md:text-xl font-serif text-white font-light tracking-wide">
                  {GALLERY_IMAGES[activeImageIndex].title}
                </h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </section>
  );
}
