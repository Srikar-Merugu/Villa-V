"use client";

import { motion } from "framer-motion";
import { Waves, Dumbbell, Film, Sparkles, Wine, Cpu } from "lucide-react";

interface Amenity {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  spec: string;
}

const AMENITIES: Amenity[] = [
  {
    icon: Waves,
    title: "Infinity Pool",
    desc: "A 25-meter heated infinity pool mirroring the horizon, crafted with polished black lava stone.",
    spec: "TEMPERATURE: 28°C CONSTANT"
  },
  {
    icon: Sparkles,
    title: "Thermal Spa Suite",
    desc: "Private steam room, Finnish sauna, and a carved cold plunge basin for absolute rejuvenation.",
    spec: "MATERIALS: HIMALAYAN SALT BLOCK"
  },
  {
    icon: Wine,
    title: "Sommelier Cellar",
    desc: "Climate-controlled vintage repository storing up to 1,200 bottles with a private tasting lounge.",
    spec: "CONTROL: HUMIDITY & DUAL ZONE temp"
  },
  {
    icon: Dumbbell,
    title: "Private Wellness Gym",
    desc: "Equipped with state-of-the-art TechnoGym gear, floor-to-ceiling mirrors, and outdoor yoga deck.",
    spec: "EQUIPMENT: BESPOKE CHROME RANGE"
  },
  {
    icon: Film,
    title: "Dolby Atmos Cinema",
    desc: "Acoustically isolated screening room with customized leather lounge recliners and a 4K laser projector.",
    spec: "AUDIO: 11.2 CHANNEL DOLBY"
  },
  {
    icon: Cpu,
    title: "Savant Smart Control",
    desc: "Voice and touch integrated lighting, HVAC, multi-room audio, and military-grade biometric security.",
    spec: "INTEGRATION: ZERO-LATENCY AUTOMATION"
  }
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative py-24 md:py-36 bg-[#0E0E0E] overflow-hidden select-none border-t border-gold/5">
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
              The Conveniences
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Uncompromising Amenities
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            Designed to accommodate every aspect of extraordinary living, offering a resort-like
            retreat experience in absolute solitude.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {AMENITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col p-8 glass-light bg-black/35 hover:bg-[#121212]/60 border border-white/5 hover:border-gold/30 rounded-none transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Glow Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Icon wrapper */}
                <div className="w-12 h-12 flex items-center justify-center border border-gold/15 bg-black/40 text-gold mb-8 group-hover:bg-gold group-hover:text-[#0A0A0A] transition-all duration-500">
                  <Icon className="w-5 h-5 stroke-[1.25]" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-serif text-white tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-white/50 tracking-wider font-light leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>

                {/* Technical specification footer */}
                <div className="pt-4 border-t border-white/5 text-[9px] font-mono tracking-widest text-[#444] group-hover:text-gold-light/45 transition-colors duration-300">
                  {item.spec}
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
