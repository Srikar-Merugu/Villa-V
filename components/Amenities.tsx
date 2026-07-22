"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_HEADER_GAP, SECTION_CONTAINER, EASE_ENTRANCE } from "../lib/motion";

interface AmenityRowProps {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
  index: number;
}

// Full-bleed alternating rows with real scroll parallax and a cursor-driven light sweep,
// replacing the previous 2x2 tilt-card grid. That grid's alternating `translate-y-24` stagger
// didn't reserve layout space for the offset, so the section's own bottom padding didn't
// match the visual bottom edge of the shifted cards -- normal document-flow rows can't
// develop that class of bug since nothing is pulled out of flow with a transform.
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

          {/* Cursor-driven light sweep -- a soft glow that follows the pointer across the
              frame, distinct from Gallery's magnetic-drift hover and FloorPlans' crossfade */}
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

/* ═══════════════════════════════════════════════════════════════
   MOBILE SECTION  —  GSAP ScrollTrigger horizontal pin-scroll

   How it works:
   • sectionRef is pinned by GSAP (position: fixed during scroll).
   • GSAP adds a spacer = (CARD_COUNT - 1) × 100vh so the next
     section starts immediately after all cards finish.
   • stripRef (flex row of cards, width = CARD_COUNT × 100vw)
     is translated from x=0 → x=-(CARD_COUNT-1)*vw in perfect
     sync with the user's scroll via scrub:true / ease:"none".
   • Result: 1px of scroll = direct card movement. No fades,
     no jumps, no black gaps. Identical to Apple's product pages.
═══════════════════════════════════════════════════════════════ */
interface MobileCard {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
}

function MobileAmenitiesSection({
  cards,
  label,
  title,
}: {
  cards: MobileCard[];
  label: string;
  title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const CARD_COUNT = cards.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register plugin inside effect — safe for SSR
    gsap.registerPlugin(ScrollTrigger);

    // gsap.matchMedia ensures this ONLY fires on mobile.
    // On resize to ≥768px, mm.revert() cleans everything up automatically.
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const section = sectionRef.current;
      const strip = stripRef.current;
      if (!section || !strip) return;

      // Animate the strip: 0 → -(CARD_COUNT-1) × viewport-width
      // ease:"none" = scroll position maps 1:1 to translateX
      // scrub:true = instant response (no lag buffer)
      const tween = gsap.to(strip, {
        x: () => -(CARD_COUNT - 1) * window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,           // Pins the section to top of viewport
          scrub: true,         // Direct 1:1 scroll → animation
          start: "top top",
          // Scroll distance = (cards - 1) viewports.
          // GSAP automatically adds pinSpacing of this same amount,
          // so the next section starts exactly when card 4 finishes.
          end: () => `+=${(CARD_COUNT - 1) * window.innerHeight}`,
          anticipatePin: 1,       // Prevents layout jump on pin
          invalidateOnRefresh: true, // Recalculates on resize / orientation change
          onUpdate(self) {
            // Update the active dot without triggering a full re-render
            const idx = Math.min(
              Math.round(self.progress * (CARD_COUNT - 1)),
              CARD_COUNT - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Cleanup returned to gsap.matchMedia — runs when breakpoint exits
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [CARD_COUNT]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0E0E0E]"
      style={{ height: "100svh" }}
      aria-labelledby="amenities-mobile-heading"
    >
      {/* Architectural grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none z-0" />

      {/* ── Fixed header overlay (stays put while strip slides) ── */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-[72px] px-5 pb-5 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0E0E0E 55%, rgba(14,14,14,0.7) 80%, transparent)" }}
      >
        <span className="text-[#C8A96A] text-[10px] font-sans font-semibold tracking-[0.3em] uppercase block mb-1">
          {label}
        </span>
        <h2
          id="amenities-mobile-heading"
          className="font-serif text-[#F6F3EB] text-[22px] leading-tight font-light tracking-wide"
        >
          {title}
        </h2>
      </div>

      {/* ── Horizontal strip (GPU-translated by GSAP) ── */}
      <div
        ref={stripRef}
        className="absolute top-0 left-0 h-full flex"
        style={{
          // Width = all cards side by side. overflow:hidden on section prevents page bleed.
          width: `${CARD_COUNT * 100}vw`,
          willChange: "transform",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            // w-screen = 100vw; each card fills exactly one viewport width.
            // overflow:hidden on parent section prevents horizontal page scroll.
            className="relative flex-shrink-0 h-full w-screen"
            aria-hidden={i !== activeIndex}
          >
            {/* Card layout: padded from header top + dots bottom */}
            <div className="absolute inset-0 flex flex-col pt-[148px] pb-[68px] px-5 gap-4">

              {/* Image (fills most of the card height) */}
              <div className="relative flex-1 min-h-0 rounded-[20px] overflow-hidden border border-[#C8A96A]/20 shadow-[0_20px_48px_rgba(0,0,0,0.65)]">
                {/* Sub-pixel luxury border overlay */}
                <div className="absolute inset-0 border border-white/5 rounded-[20px] z-10 pointer-events-none" />

                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  sizes="100vw"
                  className="object-cover brightness-[0.88]"
                  priority={i === 0}
                />

                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[#C8A96A] text-[10px] font-sans font-bold tracking-[0.22em] uppercase px-3 py-1.5 bg-black/55 backdrop-blur-md rounded-full border border-[#C8A96A]/25">
                    {card.category}
                  </span>
                </div>

                {/* Gold progress bar at image bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
                  <div
                    className="h-full bg-[#C8A96A]"
                    style={{ width: `${((i + 1) / CARD_COUNT) * 100}%` }}
                  />
                </div>
              </div>

              {/* Text block */}
              <div className="flex-shrink-0 flex flex-col select-none">
                <h3 className="font-serif text-[#F6F3EB] text-[26px] font-light leading-tight tracking-wide mb-1.5">
                  {card.title}
                </h3>
                <p className="text-[#B8B8B8] text-[14px] font-normal leading-[1.65] mb-3">
                  {card.desc}
                </p>
                <button
                  className="group/btn flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#F6F3EB] hover:text-[#C8A96A] transition-colors duration-300 self-start py-1 focus-visible:outline-none"
                  aria-label={`Explore ${card.title}`}
                >
                  <span className="relative">
                    {card.category}
                    <span className="absolute bottom-[-2px] left-0 w-0 group-hover/btn:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
                  </span>
                  <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Premium dot pagination (read-only progress indicator) ── */}
      <div
        className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3 z-20 pointer-events-none"
        role="tablist"
        aria-label="Amenity card progress"
      >
        {cards.map((_, i) => (
          <div
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Card ${i + 1} of ${CARD_COUNT}`}
            className="flex items-center justify-center h-5"
          >
            <motion.span
              animate={{
                width: i === activeIndex ? 22 : 6,
                backgroundColor: i === activeIndex ? "#C8A96A" : "rgba(248,243,235,0.2)",
                opacity: i === activeIndex ? 1 : 0.4,
              }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block", height: 5, borderRadius: 999 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT EXPORT
   • Mobile ( <768px ) → MobileAmenitiesSection (GSAP pin-scroll)
   • Desktop ( ≥768px ) → Original staggered editorial grid
   • Both wrapped in a single #amenities div for nav anchoring
═══════════════════════════════════════════════════════════════ */
export default function Amenities() {
  const { t } = useLanguage();

  const cardsData = t("amenities.cards") as { category: string; title: string; desc: string }[];
  const imageSources = [
    "/images/pool.webp",
    "/images/terrace.webp",
    "/images/about.webp",
    "/images/bedroom.webp",
  ];

  const cards = cardsData.map((c, idx) => ({
    category: c.category,
    title: c.title,
    desc: c.desc,
    imageSrc: imageSources[idx],
  }));

  return (
    <section
      id="amenities"
      className={`relative w-full max-w-full bg-[#0E0E0E] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border ${SECTION_PADDING}`}
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

      {/* ── MOBILE ( < 768px ) ── */}
      <div className="block md:hidden">
        <MobileAmenitiesSection cards={cards} label={label} title={title} />
      </div>

      {/* ── DESKTOP ( ≥ 768px ) — ORIGINAL LAYOUT, ZERO CHANGES ── */}
      <section
        className="hidden md:block relative w-full max-w-full py-20 lg:py-36 bg-[#0E0E0E] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border"
        aria-labelledby="amenities-heading-desktop"
      >
        <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

        <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border">

          <div className="max-w-3xl mb-8 lg:mb-16 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block">
                {label}
              </span>
              <h2
                id="amenities-heading-desktop"
                className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[60px] xl:text-[72px] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6 whitespace-pre-line"
              >
                {title}
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.6] max-w-[420px]"
            >
              {desc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-5 lg:gap-y-36 pb-24 w-full max-w-full">
            {cards.map((card, idx) => (
              <DesktopAmenityCard
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
    </div>
  );
}
