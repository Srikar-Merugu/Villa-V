"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function RevealLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </span>
  );
}

// A single full-bleed cinematic moment rather than a text/image/card section: the villa
// sells a feeling here, not a spec. The image starts zoomed in and settles to rest as the
// section scrolls into view while the heading rises through a mask -- a deliberate break in
// rhythm from the editorial sections around it, per the brief's "don't build sections, build
// experiences."
export default function Lifestyle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const heading = (t("lifestyle.heading") as string).split("\n");

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.25 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
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
      id="lifestyle"
      className="relative w-full max-w-full h-[85vh] lg:h-screen overflow-hidden select-none"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/mood/lifestyle-terrace.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Cinematic grade: darkened toward the base for typography legibility, kept bright
          and true-color at the top so the photograph itself still reads clearly */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 lg:pb-24 px-6 text-center z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.35em] uppercase mb-5 block"
        >
          {t("lifestyle.label")}
        </motion.span>

        <h2 className="font-serif text-[#F6F3EB] font-light text-[clamp(36px,7vw,96px)] leading-[1.05] tracking-tight mb-6">
          {heading.map((line, i) => (
            <RevealLine key={line} text={line} delay={i * 0.12} />
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#F6F3EB]/80 text-[15px] sm:text-[17px] font-normal leading-relaxed max-w-[480px]"
        >
          {t("lifestyle.sub")}
        </motion.p>
      </div>
    </section>
  );
}
