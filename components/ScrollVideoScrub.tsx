"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollVideoScrubProps {
  videoUrl: string;
}

export default function ScrollVideoScrub({ videoUrl }: ScrollVideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for tracking values inside the rAF loop without triggering React renders
  const progressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const activeSceneIndexRef = useRef(0);

  // Media Query listener for system-reduced motion compatibility (WCAG compliance)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // If reduced motion is requested, do not bind scroll events or animate frame offsets
    if (reducedMotion) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
      }
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      
      // Calculate fraction scrolled inside the scrub area
      let pct = -rect.top / scrollHeight;
      pct = Math.max(0, Math.min(1, pct));
      
      progressRef.current = pct;

      // Determine active scene based on progress to control visual overlays
      let sceneIndex = 0;
      if (pct < 0.05) {
        sceneIndex = 0;
      } else if (pct >= 0.05 && pct < 0.22) {
        sceneIndex = 1;
      } else if (pct >= 0.22 && pct < 0.40) {
        sceneIndex = 2;
      } else if (pct >= 0.40 && pct < 0.60) {
        sceneIndex = 3;
      } else if (pct >= 0.60 && pct < 0.78) {
        sceneIndex = 4;
      } else if (pct >= 0.78 && pct < 0.93) {
        sceneIndex = 5;
      } else {
        sceneIndex = 6;
      }

      if (sceneIndex !== activeSceneIndexRef.current) {
        activeSceneIndexRef.current = sceneIndex;
        setActiveSceneIndex(sceneIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // requestAnimationFrame interpolation loop for smooth scrubbing
    let rAFId: number;
    const smoothScrub = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        // Enforce pause state to prevent auto-play conflicts during scroll scrubbing
        if (!video.paused) {
          video.pause();
        }

        const duration = video.duration || 53;
        const targetTime = progressRef.current * duration;

        // Apply easing. If delta is very large (e.g. section jump click), skip easing to seek instantly
        const diff = targetTime - currentTimeRef.current;
        if (Math.abs(diff) > 1.5) {
          currentTimeRef.current = targetTime;
        } else {
          currentTimeRef.current += diff * 0.08; // Butter smooth LERP easing
        }

        // Prevent redundant seeks when values are nearly equal to reduce CPU/GPU decode loads
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
  }, [reducedMotion]);

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

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-[#0B0B0C]">
      {/* Sticky Video Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <video
          ref={videoRef}
          src={videoUrl}
          preload="auto"
          poster="/images/about.webp"
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
        />
        
        {/* Very subtle dark overlay for high text legibility, maintaining original colors */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

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
              </svg>
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
              className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(214,177,92,0.08)_0%,transparent_60%)] pointer-events-none animate-pulse"
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

        {/* Text Storytelling Layout: Simplified to VILLA V and Elegance ONLY */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-24 z-10">
          <div className="max-w-4xl w-full text-center flex flex-col items-center select-none">
            
            {/* Serif & Script Overlap Container */}
            <div className="relative w-full flex flex-col items-center justify-center min-h-[140px] md:min-h-[220px] overflow-visible filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center"
              >
                {/* Large Serif Title (Warm Ivory: #F6F3EB) */}
                <h1 className="font-serif text-[#F6F3EB] text-[clamp(48px,10vw,220px)] leading-[1.0] uppercase tracking-[0.05em] font-light">
                  VILLA V
                </h1>

                {/* Luxury Script Overlay (Champagne Gold: #D6B15C) - proportional em-offset overlap */}
                <span className="font-script text-[#D6B15C] text-[clamp(56px,12vw,240px)] leading-[0.8] absolute bottom-[-32%] md:bottom-[-28%] left-1/2 -translate-x-1/2 block select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Elegance
                </span>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
