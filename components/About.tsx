"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { label: "Total Area", value: "12,400 SQ FT" },
    { label: "Levels", value: "3 FLOORS" },
    { label: "Suites", value: "5 BEDROOMS" },
    { label: "Completion", value: "Q4 2026" }
  ];

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#0B0B0C] overflow-hidden select-none border-t border-gold/5">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Storytelling Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium mb-3">
                The Conception
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight">
                Sculpting Light, Space, and Stone
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-white/60 tracking-wider font-light leading-relaxed"
            >
              Villa V represents a paradigm shift in residential architecture. Designed by
              acclaimed visionaries, it sits harmoniously on the cliffs, sculpted into the natural
              landscape. Every angle, material, and system has been engineered to frame spectacular
              panoramas while creating an oasis of absolute privacy and luxury.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm text-white/40 tracking-wider font-light leading-relaxed"
            >
              Constructed from low-carbon textured concrete, high-end Italian travertine stone,
              and low-iron ultra-clear structural glass, the villa blends indoor comfort and
              outdoor wilderness. It is not merely a house; it is a permanent sculptural masterpiece
              built to endure for generations.
            </motion.p>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 border-t border-white/10 mt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i + 0.4 }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#666] font-mono">
                    {stat.label}
                  </span>
                  <span className="text-xl md:text-2xl font-serif text-gold font-light tracking-wide">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden border border-gold/15 shadow-2xl group"
            >
              {/* Luxury Frame Accent */}
              <div className="absolute inset-0 border border-white/5 z-10 pointer-events-none" />

              <Image
                src="/images/about.webp"
                alt="Villa V Dusk Exterior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                priority
              />

              {/* Float Coordinate HUD */}
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] tracking-widest text-white/50 bg-[#0A0A0A]/40 backdrop-blur-md px-3 py-1.5 border border-white/10 uppercase">
                LAT: 43.7225° N | ALT: 114M
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
