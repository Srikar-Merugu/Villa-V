"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      className={`w-full flex flex-col gap-6 ${staggerClass} transition-all duration-300 ease-out`}
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
        className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(200,169,106,0.08)] bg-black/40 cursor-pointer"
      >
        {/* Sub-pixel luxury outline overlay */}
        <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />

        {/* Ambient Dark Gradient Backdrop Shield */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Spotlight Follower Overlay (Hardware accelerated radial mask) */}
        <div
          className="absolute inset-0 z-15 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(200,169,106,0.08), transparent 80%)`
          }}
        />

        {/* Cinematic Imagery */}
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95"
            loading="lazy"
          />
        </div>
      </div>

      {/* Card Content & Interactive Hooks */}
      <div className="flex flex-col px-1 select-none">
        <span className="text-[#C8A96A] text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.2em] uppercase mb-2">
          {category}
        </span>
        
        <h4 className="font-serif text-[#F6F3EB] text-[28px] sm:text-[34px] lg:text-[38px] font-light leading-tight tracking-wide mb-3 transition-transform duration-300 group-hover:-translate-y-0.5">
          {title}
        </h4>
        
        <p className="text-[#B8B8B8] text-[15px] sm:text-[16px] font-normal leading-[1.7] max-w-[360px] mb-4">
          {desc}
        </p>

        <button
          className="group/btn flex items-center gap-2 self-start text-[#C8A96A] font-sans font-semibold text-[13px] uppercase tracking-[0.15em] hover:text-[#F6F3EB] transition-colors duration-300 min-h-[44px] focus-visible:outline-none"
          aria-label={`Explore details for ${title}`}
        >
          Explore
          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 select-none">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Amenities() {
  const cards = [
    {
      category: "Infinity Pool",
      title: "Endless Horizon",
      desc: "Where water meets the sky in complete serenity.",
      imageSrc: "/images/pool.webp"
    },
    {
      category: "Private Wellness",
      title: "Wellness Sanctuary",
      desc: "Spa-inspired spaces crafted for complete relaxation.",
      imageSrc: "/images/terrace.webp"
    },
    {
      category: "Private Cinema",
      title: "Immersive Entertainment",
      desc: "A cinematic experience reserved exclusively for residents.",
      imageSrc: "/images/about.webp"
    },
    {
      category: "Wine Lounge",
      title: "Curated Collection",
      desc: "A private cellar designed for unforgettable evenings.",
      imageSrc: "/images/bedroom.webp"
    }
  ];

  return (
    <section 
      id="amenities" 
      className="relative py-[100px] lg:py-[160px] bg-[#0E0E0E] overflow-hidden select-none"
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
              AMENITIES
            </span>
            <h2 className="text-[38px] sm:text-[46px] lg:text-[60px] xl:text-[72px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-6 whitespace-pre-line">
              Experience{"\n"}World-Class Living
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[420px]"
          >
            Every detail has been curated to redefine extraordinary living.
          </motion.p>
        </div>

        {/* Staggered Alternating Grid of Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-20 lg:gap-y-36 pb-24">
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
