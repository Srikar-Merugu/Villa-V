"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  source: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "An absolute masterclass of volumes, alignment, and light. Villa V defies residential convention, sculpting structural concrete directly into the coastal sky.",
    author: "Elena Rostova",
    role: "Lead Editor",
    source: "Architectural Digest"
  },
  {
    quote: "The detailing is of a level normally reserved for high-end horology. An uncompromising home executed with museum-grade precision and exceptional materials.",
    author: "Marc-Antoine Dubois",
    role: "Senior Consultant",
    source: "Sotheby's Realty Advisory"
  },
  {
    quote: "Every sunrise here feels individually curated. The boundary between the indoor stone galleries and the infinity horizon simply ceases to exist.",
    author: "Sir Richard Cole",
    role: "Private Owner",
    source: "Villa V Residence"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-[#0B0B0C] overflow-hidden select-none border-t border-gold/5">
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
              The Critique
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Critical Appraisals
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            Reflections and expert opinions on the spatial design, materials, and aesthetics of Villa V.
          </motion.p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex flex-col p-8 glass bg-black/45 border border-white/5 rounded-none relative"
            >
              {/* Gold Accent Corner lines */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-gold/15" />
              <div className="absolute top-0 right-0 w-[1px] h-8 bg-gold/15" />

              {/* Quote Mark */}
              <Quote className="w-8 h-8 stroke-[1] text-gold/25 mb-6" />

              {/* Quote Text */}
              <p className="text-sm md:text-base text-white/70 italic tracking-wider font-light leading-relaxed mb-8 flex-grow">
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-1 select-none">
                <span className="text-sm tracking-wide font-serif text-white">{item.author}</span>
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-gold-light/60">
                  <span>{item.role.toUpperCase()}</span>
                  <span className="text-[#444]">— {item.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
