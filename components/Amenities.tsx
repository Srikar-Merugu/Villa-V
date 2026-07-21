"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, animate, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

/* ─────────────────────────────────────────────────────────────
   Desktop-only 3D tilt card (unchanged from original)
───────────────────────────────────────────────────────────── */
interface AmenityCardProps {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
  index: number;
}

function DesktopAmenityCard({ category, title, desc, imageSrc, index }: AmenityCardProps) {
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
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -4);
    setRotateY(((x - centerX) / centerX) * 4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const staggerClass = index % 2 === 1 ? "lg:translate-y-24" : "lg:translate-y-0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
      className={`w-full min-w-0 max-w-full box-border flex flex-col gap-6 ${staggerClass} transition-all duration-300 ease-out`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? "none" : "transform 0.5s ease-out",
        }}
        className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[24px] border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(200,169,106,0.08)] bg-black/40 cursor-pointer max-w-full box-border"
      >
        <div className="absolute inset-0 border border-white/5 rounded-[24px] z-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(200, 169, 106, 0.05), transparent 80%)`,
          }}
        />
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] filter brightness-90 group-hover:brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="flex flex-col select-none">
        <span className="text-[#C8A96A] text-[12px] sm:text-[13px] font-sans font-bold tracking-[0.2em] uppercase mb-2">
          {category}
        </span>
        <h4 className="font-serif text-[#F6F3EB] text-[clamp(24px,5.5vw,28px)] lg:text-[clamp(28px,3vw,38px)] font-light leading-tight tracking-wide mb-3 transition-transform duration-300">
          {title}
        </h4>
        <p className="text-[#B8B8B8] text-[15px] sm:text-[16px] font-normal leading-[1.7] max-w-[360px] mb-4">
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
          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile Swipe Carousel
   – Scroll-driven: vertical scroll → horizontal card index
   – Touch drag: Framer Motion drag with spring snap
   – Pinned while scrolling through all cards via sticky
   – Premium dot pagination indicator
───────────────────────────────────────────────────────────── */
interface MobileCard {
  category: string;
  title: string;
  desc: string;
  imageSrc: string;
}

function MobileCarousel({ cards, label, title }: {
  cards: MobileCard[];
  label: string;
  title: string;
  desc: string;
}) {
  const CARD_COUNT = cards.length;

  // The outer "scroll space" div — its height determines how much scrolling drives the carousel
  const outerRef = useRef<HTMLDivElement>(null);

  // Active card index (0-based)
  const [activeIndex, setActiveIndex] = useState(0);

  // Track whether user is currently dragging (to suppress scroll-driven updates)
  const isDragging = useRef(false);

  // dragX is the drag offset relative to the locked position (springs back to 0)
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 42, mass: 0.8 });

  // Scroll progress over the outer container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress [0, 1] → card index [0, CARD_COUNT - 1]
  const scrollCardIndex = useTransform(scrollYProgress, [0, 1], [0, CARD_COUNT - 1]);

  // Update activeIndex from scroll when not dragging
  useEffect(() => {
    const unsubscribe = scrollCardIndex.on("change", (v) => {
      if (isDragging.current) return;
      const snapped = Math.min(Math.max(Math.round(v), 0), CARD_COUNT - 1);
      setActiveIndex(snapped);
    });
    return unsubscribe;
  }, [scrollCardIndex, CARD_COUNT]);

  // Snap to a specific card (used by dots and drag-end)
  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.min(Math.max(idx, 0), CARD_COUNT - 1));
  }, [CARD_COUNT]);

  // Handle drag end — snap to next/prev card
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      isDragging.current = false;
      const swipeThreshold = 40;
      const velocityThreshold = 200;
      const shouldNext = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
      const shouldPrev = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;

      if (shouldNext) {
        goTo(activeIndex + 1);
      } else if (shouldPrev) {
        goTo(activeIndex - 1);
      }
      animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });
    },
    [activeIndex, goTo, dragX]
  );

  // Each card occupies 100svh of scroll space + 1 extra 100svh for the last card to settle
  const outerHeight = `calc(${CARD_COUNT + 1} * 100svh)`;

  return (
    <div
      ref={outerRef}
      style={{ height: outerHeight }}
      className="relative w-full max-w-full"
      aria-label="Amenities carousel"
    >
      {/* ── Sticky viewport — stays fixed while outer scrolls ── */}
      <div className="sticky top-0 left-0 w-full h-svh overflow-hidden flex flex-col bg-[#0E0E0E]">

        {/* Compact section header */}
        <div className="flex-shrink-0 pt-[72px] pb-3 px-5">
          <span className="text-[#C8A96A] text-[10px] font-sans font-semibold tracking-[0.3em] uppercase block mb-1">
            {label}
          </span>
          <h2 className="font-serif text-[#F6F3EB] text-[22px] leading-tight font-light tracking-wide">
            {title}
          </h2>
        </div>

        {/* ── Cards viewport (flex-1 fills remaining height) ── */}
        <div className="flex-1 relative w-full overflow-hidden px-5 min-h-0">

          {/* Draggable strip — acts as the touch handle */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={handleDragEnd}
            style={{ x: springX }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            aria-live="polite"
          >
            {/* Invisible drag capture layer */}
            <div className="w-full h-full" />
          </motion.div>

          {/* Individual cards — animated by activeIndex */}
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            const delta = i - activeIndex;
            // Cards to the right are at +100%, left at -100%, active at 0%
            const translateXPct = delta * 105; // slight gap between off-screen cards

            return (
              <motion.article
                key={card.title}
                animate={{
                  x: `${translateXPct}%`,
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  x: { type: "spring", stiffness: 240, damping: 36, mass: 1.0 },
                  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.35, ease: "easeInOut" },
                }}
                className="absolute inset-0 flex flex-col gap-4 will-change-transform pointer-events-none"
                aria-hidden={!isActive}
              >
                {/* Image — takes most of the card height */}
                <div className="relative w-full flex-1 min-h-0 rounded-[20px] overflow-hidden border border-[#C8A96A]/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                  {/* Sub-pixel luxury overlay */}
                  <div className="absolute inset-0 border border-white/5 rounded-[20px] z-10 pointer-events-none" />

                  {/* Subtle parallax on image when switching */}
                  <motion.div
                    animate={{
                      x: isActive ? "0%" : delta > 0 ? "8%" : "-8%",
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-[-8%] will-change-transform"
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      sizes="100vw"
                      className="object-cover brightness-[0.88]"
                      priority={i === 0}
                    />
                  </motion.div>

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 pointer-events-none" />

                  {/* Category badge floating on image */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[#C8A96A] text-[10px] font-sans font-bold tracking-[0.22em] uppercase px-3 py-1.5 bg-black/55 backdrop-blur-md rounded-full border border-[#C8A96A]/25">
                      {card.category}
                    </span>
                  </div>

                  {/* Progress indicator on image (thin gold line at bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
                    <motion.div
                      className="h-full bg-[#C8A96A]"
                      animate={{ width: `${((i + 1) / CARD_COUNT) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* Text block */}
                <div className="flex-shrink-0 flex flex-col select-none pb-1">
                  <motion.h3
                    animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-[#F6F3EB] text-[26px] font-light leading-tight tracking-wide mb-1.5"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    animate={{ y: isActive ? 0 : 8, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.16 : 0, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#B8B8B8] text-[14px] font-normal leading-[1.65] mb-3 max-w-full"
                  >
                    {card.desc}
                  </motion.p>
                  <motion.button
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                    className="group/btn flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#F6F3EB] hover:text-[#C8A96A] transition-colors duration-300 self-start py-1 focus-visible:outline-none pointer-events-auto"
                    aria-label={`Explore ${card.title}`}
                  >
                    <span className="relative">
                      {card.category}
                      <span className="absolute bottom-[-2px] left-0 w-0 group-hover/btn:w-full h-[1px] bg-[#C8A96A] transition-all duration-300" />
                    </span>
                    <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Premium dot pagination ── */}
        <div
          className="flex-shrink-0 flex items-center justify-center gap-3 py-5"
          role="tablist"
          aria-label="Card navigation"
        >
          {cards.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to card ${i + 1}`}
              onClick={() => goTo(i)}
              className="flex items-center justify-center h-5 focus-visible:outline-none"
            >
              <motion.span
                animate={{
                  width: i === activeIndex ? 22 : 6,
                  backgroundColor: i === activeIndex ? "#C8A96A" : "rgba(248,243,235,0.2)",
                  opacity: i === activeIndex ? 1 : 0.45,
                }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[5px] rounded-full"
                style={{ display: "block" }}
              />
            </button>
          ))}
        </div>

        {/* ── "Continue scrolling" hint shown only on last card ── */}
        <motion.div
          animate={{ opacity: activeIndex === CARD_COUNT - 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[72px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-30"
        >
          <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-[#F6F3EB]/35">Continue</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-5 bg-gradient-to-b from-[#C8A96A]/40 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Root Section — renders MOBILE or DESKTOP version
───────────────────────────────────────────────────────────── */
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

  const label = t("amenities.label") as string;
  const title = t("amenities.title") as string;
  const desc = t("amenities.desc") as string;

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          MOBILE  ( < md = 768px )
          Scroll-pinned horizontal swipe carousel
      ══════════════════════════════════════════════════════ */}
      <section
        id="amenities"
        className="block md:hidden relative w-full max-w-full bg-[#0E0E0E] overflow-x-hidden box-border"
        aria-labelledby="amenities-heading-mobile"
      >
        <h2 id="amenities-heading-mobile" className="sr-only">{title}</h2>
        {/* Subtle architectural grid texture */}
        <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none z-0" />
        <MobileCarousel cards={cards} label={label} title={title} desc={desc} />
      </section>

      {/* ══════════════════════════════════════════════════════
          DESKTOP  ( ≥ md = 768px )
          Original staggered 2-col editorial grid — UNCHANGED
      ══════════════════════════════════════════════════════ */}
      <section
        id="amenities"
        className="hidden md:block relative w-full max-w-full py-20 lg:py-36 bg-[#0E0E0E] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border"
        aria-labelledby="amenities-heading-desktop"
      >
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

          {/* Staggered alternating grid of editorial cards */}
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
    </>
  );
}
