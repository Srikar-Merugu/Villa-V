"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { SECTION_PADDING, SECTION_CONTAINER, EASE_ENTRANCE } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

// No cards, no photograph placed conventionally -- the architecture image is masked directly
// into the oversized heading type (background-clip: text), with a slow horizontal drift as
// the section scrolls. Deliberately the most typographic, least "card-shaped" section on the
// page, per the brief's call to break the text/image/cards repetition.
export default function ArchitecturalPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  const heading = (t("philosophy.heading") as string).split("\n");

  useEffect(() => {
    if (!sectionRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        maskRef.current,
        { backgroundPosition: "20% 30%" },
        {
          backgroundPosition: "80% 70%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className={`relative w-full max-w-full bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border ${SECTION_PADDING}`}
    >
      <div className={SECTION_CONTAINER}>
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.35em] uppercase mb-6 block"
          >
            {t("philosophy.label")}
          </motion.span>

          <motion.h2
            ref={maskRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_ENTRANCE }}
            className="font-serif font-light uppercase text-[clamp(48px,11vw,168px)] leading-[0.95] tracking-tight mb-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/images/mood/architecture-facade.webp)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent"
            }}
          >
            {heading.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.7] max-w-[620px]"
          >
            {t("philosophy.body")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
