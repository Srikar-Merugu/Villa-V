"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Square, Bed, Bath, ArrowRight } from "lucide-react";

interface FloorPlan {
  id: string;
  name: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  spaces: string[];
  svgPath: React.ReactNode;
}

const FLOOR_PLANS: FloorPlan[] = [
  {
    id: "ground",
    name: "01 / Ground Level",
    area: "5,400 SQ FT",
    bedrooms: 1,
    bathrooms: 2,
    spaces: ["Grand Foyer", "Living Lounge", "Chef's Kitchen", "Dining Lounge", "Infinity Mirror Pool", "Thermal Spa Suite"],
    svgPath: (
      <g stroke="#C5A880" strokeWidth="1" fill="none">
        {/* Exterior walls */}
        <rect x="50" y="50" width="400" height="250" strokeWidth="2" />
        {/* Pool outline */}
        <rect x="250" y="200" width="180" height="80" strokeDasharray="3,3" strokeWidth="1.5" />
        <text x="340" y="245" fill="#C5A880" fontSize="10" fontFamily="monospace" letterSpacing="2">INFINITY POOL</text>
        {/* Room partitions */}
        <line x1="180" y1="50" x2="180" y2="300" />
        <line x1="50" y1="180" x2="180" y2="180" />
        <line x1="300" y1="50" x2="300" y2="200" />
        {/* Labels */}
        <text x="80" y="110" fill="#fff" fontSize="12" fontFamily="serif">Chef's Kitchen</text>
        <text x="80" y="240" fill="#fff" fontSize="12" fontFamily="serif">Grand Foyer</text>
        <text x="210" y="110" fill="#fff" fontSize="12" fontFamily="serif">Living Lounge</text>
        <text x="330" y="110" fill="#fff" fontSize="12" fontFamily="serif">Dining Lounge</text>
        {/* Core pillar indicators */}
        <circle cx="180" cy="180" r="4" fill="#C5A880" />
        <circle cx="300" cy="180" r="4" fill="#C5A880" />
      </g>
    )
  },
  {
    id: "upper",
    name: "02 / First Level",
    area: "4,600 SQ FT",
    bedrooms: 4,
    bathrooms: 4,
    spaces: ["Master Suite V", "VIP Guest Suite", "Double En-Suite 03", "Double En-Suite 04", "Night Lounge", "Library & Study"],
    svgPath: (
      <g stroke="#C5A880" strokeWidth="1" fill="none">
        {/* Exterior walls */}
        <rect x="50" y="50" width="400" height="250" strokeWidth="2" />
        {/* Room partitions */}
        <line x1="250" y1="50" x2="250" y2="300" />
        <line x1="50" y1="170" x2="450" y2="170" />
        <line x1="150" y1="170" x2="150" y2="300" />
        <line x1="350" y1="170" x2="350" y2="300" />
        {/* Labels */}
        <text x="110" y="110" fill="#fff" fontSize="12" fontFamily="serif">Master Suite V</text>
        <text x="300" y="110" fill="#fff" fontSize="12" fontFamily="serif">Night Lounge</text>
        <text x="90" y="240" fill="#fff" fontSize="12" fontFamily="serif">Guest Suite VIP</text>
        <text x="190" y="240" fill="#fff" fontSize="12" fontFamily="serif">Suite 03</text>
        <text x="290" y="240" fill="#fff" fontSize="12" fontFamily="serif">Suite 04</text>
        <text x="380" y="240" fill="#fff" fontSize="12" fontFamily="serif">Study</text>
        {/* Structural cross overlays */}
        <line x1="50" y1="50" x2="80" y2="80" opacity="0.3" />
        <line x1="450" y1="50" x2="420" y2="80" opacity="0.3" />
      </g>
    )
  },
  {
    id: "rooftop",
    name: "03 / Rooftop Oasis",
    area: "2,400 SQ FT",
    bedrooms: 0,
    bathrooms: 1,
    spaces: ["Sunset Firepit", "Outdoor Kitchen & Bar", "Jacuzzi Deck", "Observatory Platform", "Solarium Lounge"],
    svgPath: (
      <g stroke="#C5A880" strokeWidth="1" fill="none">
        {/* Exterior walls */}
        <rect x="50" y="50" width="400" height="250" strokeWidth="2" strokeDasharray="6,4" />
        {/* Center observatory */}
        <circle cx="250" cy="175" r="50" strokeWidth="1.5" />
        <circle cx="250" cy="175" r="10" strokeDasharray="2,2" />
        {/* Firepit deck */}
        <rect x="90" y="100" width="70" height="150" />
        <circle cx="125" cy="175" r="15" />
        {/* Hot tub deck */}
        <rect x="340" y="100" width="70" height="150" />
        <circle cx="375" cy="175" r="20" strokeDasharray="3,3" />
        {/* Labels */}
        <text x="100" y="85" fill="#fff" fontSize="11" fontFamily="serif">Sunset Firepit</text>
        <text x="345" y="85" fill="#fff" fontSize="11" fontFamily="serif">Jacuzzi Deck</text>
        <text x="205" y="250" fill="#fff" fontSize="11" fontFamily="serif">Outdoor Sky Bar</text>
        <text x="215" y="110" fill="#fff" fontSize="11" fontFamily="serif">Observatory</text>
      </g>
    )
  }
];

export default function FloorPlans() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const plan = FLOOR_PLANS[selectedPlanIndex];

  return (
    <section id="floor-plans" className="relative py-24 md:py-36 bg-[#0B0B0C] overflow-hidden select-none border-t border-gold/5">
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
              The Geometry
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Spatial Architecture
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            Explore the calculated dimensions and room layouts across three levels of luxury.
          </motion.p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Floor plan selectors & specs */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {FLOOR_PLANS.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPlanIndex(index)}
                  className={`text-left p-5 border cursor-pointer transition-all duration-500 uppercase tracking-widest text-xs flex justify-between items-center ${
                    selectedPlanIndex === index
                      ? "bg-gold text-[#0A0A0A] border-gold font-semibold"
                      : "bg-transparent text-white/70 border-white/10 hover:border-gold/30"
                  }`}
                >
                  {item.name}
                  <ArrowRight className={`w-4 h-4 transition-transform ${selectedPlanIndex === index ? "translate-x-0" : "-translate-x-2 opacity-0"}`} />
                </button>
              ))}
            </div>

            {/* Spec details of selected plan */}
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="glass p-6 md:p-8 flex flex-col gap-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">Area</span>
                  <div className="flex items-center gap-2 text-gold">
                    <Square className="w-4 h-4" />
                    <span className="text-sm font-semibold tracking-widest font-mono">{plan.area}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase">Bedrooms</span>
                    <div className="flex items-center gap-2 text-white/80">
                      <Bed className="w-4 h-4 text-gold-light" />
                      <span className="text-sm font-medium font-mono">{plan.bedrooms}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase">Bathrooms</span>
                    <div className="flex items-center gap-2 text-white/80">
                      <Bath className="w-4 h-4 text-gold-light" />
                      <span className="text-sm font-medium font-mono">{plan.bathrooms}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">Featured Spaces</span>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {plan.spaces.map((space) => (
                      <li key={space} className="text-xs text-white/70 font-light tracking-wide flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        {space}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Blueprint Render */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/11] w-full border border-gold/15 glass-light p-6 flex flex-col justify-between">
              
              {/* Compass symbol HUD overlay */}
              <div className="absolute top-6 right-6 font-mono text-[9px] text-white/35 flex items-center gap-2">
                <Compass className="w-6 h-6 stroke-[1] text-gold animate-spin" style={{ animationDuration: "12s" }} />
                <span>ORIENTATION: TRUE NORTH</span>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

              {/* Interactive blueprint SVG display */}
              <div className="w-full h-full flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.svg
                    key={plan.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    viewBox="0 0 500 350"
                    className="w-full h-full max-h-[400px]"
                  >
                    {plan.svgPath}
                  </motion.svg>
                </AnimatePresence>
              </div>

              {/* Footer specs HUD */}
              <div className="flex justify-between font-mono text-[9px] text-[#444] border-t border-white/5 pt-4">
                <div>SYSTEMS CHECK: BIOMETRICS ACTIVE</div>
                <div>SCHEMATIC: LEVEL_{plan.id.toUpperCase()}_v1.12</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
