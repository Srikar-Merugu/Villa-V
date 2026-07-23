"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_HEADER_GAP, SECTION_CONTAINER, EASE_ENTRANCE } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface AmenityRowProps {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
  index: number;
}

// Desktop alternating rows — UNTOUCHED
function AmenityRow({ category, title, desc, imageSrc, index }: AmenityRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [sweep, setSweep] = useState({ x: 50, y: 50 });
  const isImageLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSweep({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-16 items-center w-full max-w-full"
    >
      <div className={`order-1 ${isImageLeft ? "lg:order-1" : "lg:order-2"} w-full min-w-0 max-w-full box-border`}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: EASE_ENTRANCE }}
          onMouseMove={handleMouseMove}
          className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_16px_36px_rgba(0,0,0,0.5)] bg-black/40 cursor-pointer max-w-full box-border"
        >
          <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />

          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(500px circle at ${sweep.x}% ${sweep.y}%, rgba(200,169,106,0.16), transparent 65%)`
            }}
          />

          <motion.div style={{ y: yParallax, scale: scaleParallax }} className="w-full h-full relative">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] filter brightness-90 group-hover:brightness-100"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[5] pointer-events-none" />
        </motion.div>
      </div>

      <div className={`order-2 ${isImageLeft ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center w-full min-w-0 max-w-full box-border select-none`}>
        <span className="text-[#C8A96A] text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.2em] uppercase mb-3">
          {category}
        </span>

        <h4 className="font-serif text-[#F6F3EB] text-[clamp(28px,5.5vw,34px)] lg:text-[clamp(32px,3vw,44px)] font-light leading-tight tracking-wide mb-4">
          {title}
        </h4>

        <p className="text-[#B8B8B8] text-[15px] sm:text-[16px] font-normal leading-[1.7] max-w-[420px] mb-5">
          {desc}
        </p>

        <button
          className="group/btn flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#F6F3EB] hover:text-[#C8A96A] transition-colors duration-300 self-start py-1 focus-visible:outline-none"
          aria-label={`Explore details for ${title}`}
        >
          <span className="relative">
            {category}
            <span className="absolute bottom-[-2px] left-0 w-0 group-hover/btn:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
          </span>
          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 select-none">→</span>
        </button>
      </div>
    </div>
  );
}

// Mobile Apple-Style Pinned Horizontal Scroll Section
function MobileAmenities({
  cards
}: {
  cards: Array<{ category: string; title: string; desc: string; imageSrc: string }>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Only initialize GSAP pinning on mobile (< 768px)
    if (window.innerWidth >= 768) return;
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 24;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => `+=${getScrollAmount()}`
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="block md:hidden relative w-full h-screen bg-[#0E0E0E] overflow-hidden select-none"
    >
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="h-full flex flex-col justify-between pt-14 pb-6 px-5 box-border">
        {/* Section Header */}
        <div className="shrink-0 mb-2">
          <span className="text-[#C8A96A] text-[11px] font-sans font-semibold tracking-[0.25em] uppercase mb-1 block">
            {t("amenities.label")}
          </span>
          <h2 className="text-[26px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.1]">
            {t("amenities.title")}
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="grow flex items-center min-h-0 overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-4 pl-1 pr-6 will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {cards.map((card, idx) => (
              <div
                key={card.title}
                className="w-[85vw] max-w-[340px] shrink-0 flex flex-col bg-[#121214] rounded-2xl border border-[#C8A96A]/20 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.6)] box-border"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3.5 border border-white/5">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    sizes="85vw"
                    className="object-cover object-center filter brightness-95"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#C8A96A] font-sans font-bold tracking-[0.15em] uppercase border border-white/10">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-[#C8A96A] text-[10px] font-sans font-bold tracking-[0.2em] uppercase mb-1 block">
                  {card.category}
                </span>

                <h4 className="font-serif text-[#F6F3EB] text-xl font-light leading-snug mb-1.5">
                  {card.title}
                </h4>

                <p className="text-[#B8B8B8] text-[13px] font-normal leading-relaxed line-clamp-3">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Prompt Footer */}
        <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-[#B8B8B8]/60 pt-2 border-t border-white/10">
          <span>01 – 04 AMENITIES</span>
          <span className="text-[#C8A96A] tracking-wider uppercase">SCROLL TO EXPLORE →</span>
        </div>
      </div>
    </div>
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
    <section id="amenities" className="relative w-full max-w-full bg-[#0E0E0E] box-border scroll-mt-24 lg:scroll-mt-20">
      {/* MOBILE ONLY: Pinned Horizontal Scroll Section */}
      <MobileAmenities cards={cards} />

      {/* DESKTOP ONLY: Standard Alternating Rows Section */}
      <div className={`hidden md:block relative w-full max-w-full select-none ${SECTION_PADDING}`}>
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

          {/* Full-bleed alternating rows */}
          <div className="flex flex-col gap-16 lg:gap-28 w-full max-w-full">
            {cards.map((card, idx) => (
              <AmenityRow
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
      </div>
    </section>
  );
}
