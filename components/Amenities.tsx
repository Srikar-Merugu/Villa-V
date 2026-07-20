"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface AmenityCardProps {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
  index: number;
}

function AmenityCard({ category, title, desc, imageSrc, index }: AmenityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    // Subtle 3D tilt calculation (-4 to 4 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Alternating staggered translation offsets for desktop viewports
  const staggerClass = index % 2 === 1 ? "lg:translate-y-24" : "lg:translate-y-0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
      className={`w-full min-w-0 max-w-full box-border flex flex-col gap-6 ${staggerClass} transition-all duration-300 ease-out`}
    >
      {/* 3D Perspective Card Wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? "none" : "transform 0.5s ease-out, shadow 0.5s ease-out",
        }}
        className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(200,169,106,0.08)] bg-black/40 cursor-pointer max-w-full box-border"
      >
        {/* Sub-pixel luxury outline overlay */}
        <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />

        {/* Dynamic Interactive Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(200, 169, 106, 0.05), transparent 80%)`,
          }}
        />

        {/* Image layer */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] filter brightness-90 group-hover:brightness-95"
        />

        {/* Dark Editorial Overlay (Increases text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Card Details Block */}
      <div className="flex flex-col select-none">
        <span className="text-[#C8A96A] text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.2em] uppercase mb-2">
          {category}
        </span>
        
        <h4 className="font-serif text-[#F6F3EB] text-[clamp(24px,5.5vw,28px)] lg:text-[clamp(28px,3vw,38px)] font-light leading-tight tracking-wide mb-3 transition-transform duration-300 group-hover:-translate-y-0.5">
          {title}
        </h4>
        
        <p className="text-[#B8B8B8] text-[15px] sm:text-[16px] font-normal leading-[1.7] max-w-[360px] mb-4">
          {desc}
        </p>

        {/* Arrow pointer link */}
        <button 
          className="group/btn flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#F6F3EB] hover:text-[#C8A96A] transition-colors duration-300 self-start py-1 focus-visible:outline-none"
          aria-label={`Explore details for ${title}`}
        >
          <span className="relative">
            {category}
            <span className="absolute bottom-[-2px] left-0 w-0 group-hover/btn:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
          </span>
          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 select-none">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Amenities() {
  const { t } = useLanguage();

  const cardsData = t("amenities.cards") as { category: string; title: string; desc: string }[];
  const imageSources = [
    "/images/pool.webp",
    "/images/terrace.webp",
    "/images/about.webp",
    "/images/bedroom.webp"
  ];

  const cards = cardsData.map((c, idx) => ({
    category: c.category,
    title: c.title,
    desc: c.desc,
    imageSrc: imageSources[idx]
  }));

  return (
    <section 
      id="amenities" 
      className="relative w-full max-w-full py-20 lg:py-36 bg-[#0E0E0E] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-16 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
              {t("amenities.label")}
            </span>
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[60px] xl:text-[72px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6 whitespace-pre-line">
              {t("amenities.title")}
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[420px]"
          >
            {t("amenities.desc")}
          </motion.p>
        </div>

        {/* Staggered Alternating Grid of Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-5 lg:gap-y-36 pb-24 w-full max-w-full">
          {cards.map((card, idx) => (
            <AmenityCard
              key={card.title}
              category={card.category}
              title={card.title}
              desc={card.desc}
              imageSrc={card.imageSrc}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
