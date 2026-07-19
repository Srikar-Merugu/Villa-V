"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Shield, Maximize2, Check } from "lucide-react";

interface ScrollVideoScrubProps {
  videoUrl: string;
}

interface SceneContent {
  label: string;
  serifTitle: string;
  scriptTitle: string;
  subtitle: string;
  indicator: string;
  theme: string;
}

const SCENES: SceneContent[] = [
  {
    label: "LUXURY REAL ESTATE",
    serifTitle: "VILLA V",
    scriptTitle: "Elegance",
    subtitle: "Crafted for extraordinary living. Experience the complete construction journey.",
    indicator: "00 / VISION",
    theme: "hero"
  },
  {
    label: "FOUNDATION",
    serifTitle: "EVERY MASTERPIECE",
    scriptTitle: "Begins",
    subtitle: "Luxury starts long before the first stone is placed.",
    indicator: "01 / LAND",
    theme: "grid"
  },
  {
    label: "CRAFTSMANSHIP",
    serifTitle: "PRECISION",
    scriptTitle: "Matters",
    subtitle: "Exceptional homes are built through craftsmanship, precision, and uncompromising standards.",
    indicator: "02 / STRUCTURE",
    theme: "blueprint"
  },
  {
    label: "ARCHITECTURE",
    serifTitle: "TIMELESS",
    scriptTitle: "Luxury",
    subtitle: "A timeless design crafted to inspire for generations.",
    indicator: "03 / COMPLETED",
    theme: "elevation"
  },
  {
    label: "INTERIORS",
    serifTitle: "DESIGNED FOR",
    scriptTitle: "Living",
    subtitle: "Every room balances elegance, comfort, and intelligent design.",
    indicator: "04 / INTERIOR",
    theme: "interior"
  },
  {
    label: "OUTDOOR EXPERIENCE",
    serifTitle: "PRIVATE",
    scriptTitle: "Retreat",
    subtitle: "Experience infinity pools, panoramic views, and luxurious outdoor living.",
    indicator: "05 / OASIS",
    theme: "water"
  },
  {
    label: "WELCOME",
    serifTitle: "HOME",
    scriptTitle: "Luxury",
    subtitle: "Your future begins here.",
    indicator: "06 / HOME",
    theme: "final"
  }
];

export default function ScrollVideoScrub({ videoUrl }: ScrollVideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Use refs for animation frames to prevent state re-render bottlenecks
  const progressRef = useRef(0);
  const currentTimeRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      
      // Calculate fraction scrolled inside the scrub area
      let pct = -rect.top / scrollHeight;
      pct = Math.max(0, Math.min(1, pct));
      
      progressRef.current = pct;
      setProgress(pct);

      // Determine active scene based on progress
      let sceneIndex = 0;
      if (pct < 0.05) {
        sceneIndex = 0; // Hero
      } else if (pct >= 0.05 && pct < 0.22) {
        sceneIndex = 1; // Land
      } else if (pct >= 0.22 && pct < 0.40) {
        sceneIndex = 2; // Structure
      } else if (pct >= 0.40 && pct < 0.60) {
        sceneIndex = 3; // Completed
      } else if (pct >= 0.60 && pct < 0.78) {
        sceneIndex = 4; // Interior
      } else if (pct >= 0.78 && pct < 0.93) {
        sceneIndex = 5; // Oasis
      } else {
        sceneIndex = 6; // Home
      }

      setActiveSceneIndex(sceneIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // requestAnimationFrame interpolation loop for smooth scrubbing
    let rAFId: number;
    const smoothScrub = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        // Reinforce pause to prevent auto-play conflicts and visual jitter
        if (!video.paused) {
          video.pause();
        }

        const duration = video.duration || 53; // Updated duration after CapCut outro trimming
        const targetTime = progressRef.current * duration;

        // Apply a gentle easing factor (0.07) for smooth trackpad and mousewheel response
        const diff = targetTime - currentTimeRef.current;
        currentTimeRef.current += diff * 0.07;

        // Prevent micro-adjustments and check seeking state (crucial for mobile hardware decoders)
        if (Math.abs(diff) > 0.002 && !video.seeking) {
          video.currentTime = currentTimeRef.current;
        }
      }
      rAFId = requestAnimationFrame(smoothScrub);
    };

    rAFId = requestAnimationFrame(smoothScrub);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, []);

  // Unlock video playback on mobile devices (iOS / Android) by triggering a temporary play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unlockVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            // Ensure first frame is loaded
            video.currentTime = 0;
          })
          .catch((err) => {
            console.warn("Mobile video decoder unlock prevented:", err);
          });
      }
    };

    video.addEventListener("loadedmetadata", unlockVideo);
    if (video.readyState >= 1) {
      unlockVideo();
    }

    return () => {
      video.removeEventListener("loadedmetadata", unlockVideo);
    };
  }, [videoUrl]);

  // Handle CTA Smooth Scroll to contact form
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Scroll down trigger from hero
  const handleScrollDown = () => {
    if (containerRef.current) {
      const step = containerRef.current.offsetHeight / (SCENES.length - 1);
      window.scrollTo({
        top: step * 0.6,
        behavior: "smooth"
      });
    }
  };

  const currentScene = SCENES[activeSceneIndex];

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-[#0A0A0A]">
      {/* Sticky Video Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <video
          ref={videoRef}
          src={videoUrl}
          preload="auto"
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
          style={{ willChange: "transform" }}
        />
        
        {/* Soft Dark Vignette for Cinematic Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-80" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Ambient Grid Overlay for Scene 1 & 2 */}
        <AnimatePresence>
          {activeSceneIndex === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 grid-overlay pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Blueprint HUD Overlay for Scene 2 */}
        <AnimatePresence>
          {activeSceneIndex === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none p-6"
            >
              <div className="absolute inset-0 grid-overlay opacity-30" />
              <svg className="w-[85%] h-[80%] opacity-20 text-gold stroke-current stroke-[0.5] fill-none">
                <rect x="5%" y="5%" width="90%" height="90%" strokeDasharray="5,5" />
                <line x1="50%" y1="5%" x2="50%" y2="95%" strokeDasharray="2,2" />
                <line x1="5%" y1="50%" x2="95%" y2="50%" strokeDasharray="2,2" />
                <circle cx="50%" cy="50%" r="20%" strokeDasharray="4,4" />
                <path d="M 10% 10% L 30% 10% L 30% 30% L 10% 30% Z" />
                <path d="M 70% 70% L 90% 70% L 90% 90% L 70% 90% Z" />
              </svg>
              {/* Engineering Metrics overlay */}
              <div className="absolute top-28 left-8 text-[9px] font-mono tracking-widest text-gold-light/40 flex flex-col gap-1">
                <div>SCALE: 1:50</div>
                <div>PROJECT_ID: VLLA-V</div>
                <div>SEC_02: GROUNDWORK_COMPLETED</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interior Soft Light Sweep for Scene 4 */}
        <AnimatePresence>
          {activeSceneIndex === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.08)_0%,transparent_60%)] pointer-events-none animate-pulse"
            />
          )}
        </AnimatePresence>

        {/* Water reflection shimmer effect for Scene 5 */}
        <AnimatePresence>
          {activeSceneIndex === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Vertical Indicator */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#666] rotate-90 translate-y-[-20px] origin-center select-none uppercase">
            Timeline
          </div>
          <div className="w-[2px] h-32 bg-white/10 relative flex flex-col justify-between">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold"
              style={{ height: `${progress * 100}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
            {SCENES.map((_, i) => (
              <div
                key={i}
                className={`w-[6px] h-[6px] rounded-full border border-gold -translate-x-[2px] z-10 transition-colors duration-500 ${
                  activeSceneIndex >= i ? "bg-gold" : "bg-[#0A0A0A]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Storytelling Layout */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-24 z-10">
          <div className="max-w-4xl w-full text-center flex flex-col items-center">
            {/* Animated Scene Indicator Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.indicator}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 glass-light text-[9px] font-mono tracking-[0.3em] uppercase text-gold select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                {currentScene.indicator}
              </motion.div>
            </AnimatePresence>

            {/* Title / Header Layered Layout */}
            <div className="flex flex-col items-center justify-center text-center w-full select-none mb-4">
              
              {/* Animated Small Label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentScene.label}
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] md:text-xs tracking-[0.25em] text-[#C8A96A] font-sans font-semibold uppercase mb-4"
                >
                  {currentScene.label}
                </motion.span>
              </AnimatePresence>

              {/* Serif & Script Overlap Container */}
              <div className="relative w-full flex flex-col items-center justify-center min-h-[140px] md:min-h-[220px] mb-8 overflow-visible filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene.serifTitle + currentScene.scriptTitle}
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    {/* Large Serif Title (#F6F3EB) */}
                    <h1 className="font-serif text-[#F6F3EB] text-[clamp(44px,7.5vw,130px)] leading-[1.0] uppercase tracking-[0.05em] font-light">
                      {currentScene.serifTitle}
                    </h1>

                    {/* Luxury Script Overlay (#D6B15C) - overlapping slightly */}
                    <span className="font-script text-[#D6B15C] text-[clamp(56px,10vw,180px)] leading-[0.8] absolute bottom-[-32%] md:bottom-[-28%] left-1/2 -translate-x-1/2 block select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {currentScene.scriptTitle}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description / Subtitle (Small Editorial Copy) */}
              <div className="h-[48px] md:h-[60px] flex items-center justify-center mb-8 max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentScene.subtitle}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs md:text-sm text-[#E9E8E5]/70 tracking-wider font-light leading-relaxed"
                  >
                    {currentScene.subtitle}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Interaction Layer (CTAs based on active scene) */}
            <div className="h-[60px] flex items-center justify-center">
              {activeSceneIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={handleScrollDown}
                    className="group flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-[#0A0A0A] font-sans font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 select-none cursor-pointer"
                  >
                    Explore Journey
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>
              )}

              {activeSceneIndex === 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={handleScrollToContact}
                    className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-[#0A0A0A] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 cursor-pointer select-none"
                  >
                    Book a Private Tour
                  </button>
                  <a
                    href="#floor-plans"
                    className="flex items-center justify-center gap-3 border border-white/20 hover:border-gold/50 bg-black/40 text-white font-sans text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 select-none"
                  >
                    Explore Floor Plans
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll prompt at bottom of Hero */}
        <AnimatePresence>
          {activeSceneIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
              onClick={handleScrollDown}
            >
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40">
                Scroll to construct
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1 h-3 rounded-full bg-gold/50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
