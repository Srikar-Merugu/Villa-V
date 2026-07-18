"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Anchor, Compass, Flame } from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  category: string;
  time: string;
  desc: string;
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
  icon: React.ComponentType<any>;
}

const LANDMARKS: Landmark[] = [
  {
    id: "villa",
    name: "Villa V Residence",
    category: "PROJECT LOCATION",
    time: "0 MIN",
    desc: "Your future architectural sanctuary nestled on the cliff edge.",
    x: 250,
    y: 175,
    icon: Compass
  },
  {
    id: "beach",
    name: "La Réserve Private Beach",
    category: "LEISURE",
    time: "3 MIN DRIVETIME",
    desc: "A secluded beach club with crystal waters and premium beachside cabanas.",
    x: 140,
    y: 240,
    icon: Flame
  },
  {
    id: "marina",
    name: "Port Hercule Superyacht Club",
    category: "TRANSIT",
    time: "10 MIN DRIVETIME",
    desc: "World-famous deepwater marina offering full berthing facilities for megayachts.",
    x: 360,
    y: 90,
    icon: Anchor
  },
  {
    id: "dining",
    name: "L'Ambroisie Michelin Bistro",
    category: "GASTRONOMY",
    time: "6 MIN DRIVETIME",
    desc: "Three-Michelin-star culinary dining experience overlooking the bay.",
    x: 110,
    y: 90,
    icon: MapPin
  },
  {
    id: "heli",
    name: "Monaco Heliport Terminal",
    category: "TRANSIT",
    time: "8 MIN DRIVETIME",
    desc: "Direct transfers to Nice Côte d'Azur Airport (7-minute flight time).",
    x: 380,
    y: 220,
    icon: Navigation
  }
];

export default function Location() {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState("villa");

  const activeLandmark = LANDMARKS.find((l) => l.id === selectedLandmarkId) || LANDMARKS[0];

  return (
    <section id="location" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden select-none border-t border-gold/5">
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
              The Geography
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Prime Shoreline Address
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            Positioned at the apex of oceanfront luxury, blending extreme privacy with instant connections.
          </motion.p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Landmark details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              {LANDMARKS.map((landmark) => (
                <button
                  key={landmark.id}
                  onClick={() => setSelectedLandmarkId(landmark.id)}
                  className={`text-left p-4 border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedLandmarkId === landmark.id
                      ? "bg-gold text-[#0A0A0A] border-gold font-semibold"
                      : "bg-transparent text-white/70 border-white/5 hover:border-gold/25"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono tracking-widest text-[#666] group-hover:text-[#aaa]">
                      {landmark.category}
                    </span>
                    <span className="text-sm tracking-wide font-serif">{landmark.name}</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest font-medium">
                    {landmark.time}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Landmark HUD info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLandmark.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass p-6 md:p-8 flex flex-col gap-4 border-l-2 border-l-gold"
              >
                <div className="text-[10px] font-mono tracking-widest text-gold font-semibold uppercase">
                  {activeLandmark.category}
                </div>
                <h3 className="text-xl font-serif text-white font-light tracking-wide">
                  {activeLandmark.name}
                </h3>
                <p className="text-xs md:text-sm text-white/50 tracking-wider font-light leading-relaxed">
                  {activeLandmark.desc}
                </p>
                <div className="text-[9px] font-mono tracking-widest text-[#444] border-t border-white/5 pt-3">
                  DISTANCE: {activeLandmark.time.replace("DRIVETIME", "")}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-End Vector SVG Map */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full border border-gold/15 glass-light p-6">
              
              {/* Radar Grid background */}
              <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

              {/* Map Canvas */}
              <svg viewBox="0 0 500 350" className="w-full h-full text-gold stroke-current fill-none">
                {/* Coastal silhouette outlines */}
                <path
                  d="M 50 80 Q 150 120, 250 170 T 450 200"
                  stroke="rgba(197, 168, 128, 0.15)"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                />
                <path
                  d="M 50 100 Q 150 140, 250 185 T 450 215"
                  stroke="rgba(197, 168, 128, 0.08)"
                  strokeWidth="1.5"
                />
                
                {/* Waves pattern under coastal path */}
                <path d="M 100 240 Q 110 238, 120 240 T 140 240" stroke="rgba(197, 168, 128, 0.05)" strokeWidth="1" />
                <path d="M 280 270 Q 290 268, 300 270 T 320 270" stroke="rgba(197, 168, 128, 0.05)" strokeWidth="1" />

                {/* Draw roads / connections */}
                <path
                  d="M 110 90 L 250 175 M 140 240 L 250 175 M 360 90 L 250 175 M 380 220 L 250 175"
                  stroke="rgba(197, 168, 128, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />

                {/* Plot Landmarks */}
                {LANDMARKS.map((landmark) => {
                  const isVilla = landmark.id === "villa";
                  const isSelected = landmark.id === selectedLandmarkId;
                  
                  return (
                    <g
                      key={landmark.id}
                      onClick={() => setSelectedLandmarkId(landmark.id)}
                      className="cursor-pointer group/map"
                    >
                      {/* Active glowing ring */}
                      <circle
                        cx={landmark.x}
                        cy={landmark.y}
                        r={isVilla ? 16 : 8}
                        fill="transparent"
                        stroke={isVilla ? "#C5A880" : "rgba(197, 168, 128, 0.4)"}
                        strokeWidth={isSelected ? 2 : 1}
                        className={isVilla || isSelected ? "animate-pulse" : ""}
                        style={{ transformOrigin: `${landmark.x}px ${landmark.y}px` }}
                      />
                      {isVilla && (
                        <circle
                          cx={landmark.x}
                          cy={landmark.y}
                          r={28}
                          fill="transparent"
                          stroke="rgba(197, 168, 128, 0.06)"
                          strokeWidth="1"
                          className="animate-ping"
                          style={{ transformOrigin: `${landmark.x}px ${landmark.y}px`, animationDuration: "3s" }}
                        />
                      )}
                      
                      {/* Inner dot pin */}
                      <circle
                        cx={landmark.x}
                        cy={landmark.y}
                        r={isVilla ? 6 : 4}
                        fill={isVilla ? "#C5A880" : isSelected ? "#C5A880" : "rgba(197, 168, 128, 0.4)"}
                      />

                      {/* Floating Text Labels */}
                      <text
                        x={landmark.x}
                        y={landmark.y - (isVilla ? 24 : 14)}
                        textAnchor="middle"
                        fill={isSelected ? "#FFF" : "rgba(255,255,255,0.4)"}
                        fontSize={isVilla ? "10" : "8"}
                        fontFamily="monospace"
                        letterSpacing="1"
                        className="transition-colors duration-300"
                      >
                        {landmark.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* HUD Coordinates info */}
              <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#444] border-t border-white/5 pt-4 w-[90%] flex justify-between">
                <div>GRID REFERENCE: MAP_ZONE_A</div>
                <div>SCALE: 1:200,000</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
