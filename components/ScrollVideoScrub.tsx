"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollVideoScrubProps {
  videoUrl: string;
}

interface SceneContent {
  serifTitle: string;
  scriptTitle: string;
}

const SCENES: SceneContent[] = [
  {
    serifTitle: "VISION",
    scriptTitle: "Elegance"
  },
  {
    serifTitle: "MASTERPIECE",
    scriptTitle: "Begins"
  },
  {
    serifTitle: "PRECISION",
    scriptTitle: "Matters"
  },
  {
    serifTitle: "TIMELESS",
    scriptTitle: "Luxury"
  },
  {
    serifTitle: "DESIGNED",
    scriptTitle: "Living"
  },
  {
    serifTitle: "PRIVATE",
    scriptTitle: "Retreat"
  },
  {
    serifTitle: "WELCOME",
    scriptTitle: "Home"
  }
];

// Coordinated stagger animation variants
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15 // 150ms delay before signature writing transition
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const serifVariants = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    filter: "blur(4px)",
    transition: { duration: 0.5 } 
  }
};

const scriptVariants = {
  initial: { opacity: 0, x: -12, filter: "blur(4px)", scale: 0.96 },
  animate: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } 
  },
  exit: { 
    opacity: 0, 
    x: 12, 
    filter: "blur(4px)",
    transition: { duration: 0.5 } 
  }
};

// Reusable LuxuryTitle component ensuring absolute design consistency (WCAG & UX compliance)
function LuxuryTitle({ serifTitle, scriptTitle }: SceneContent) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative inline-block"
    >
      {/* Large Serif Title (Warm Ivory: #F6F3EB) */}
      <motion.h1
        variants={serifVariants}
        className="font-serif text-[#F6F3EB] text-[clamp(44px,7.8vw,140px)] leading-none uppercase tracking-[0.05em] font-light text-shadow-subtle"
      >
        {serifTitle}
      </motion.h1>

      {/* Absolute positioning container to enforce horizontal centering under the serif title */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18%] md:bottom-[-15%] whitespace-nowrap pointer-events-none select-none">
        {/* Luxury Script Overlay (Champagne Gold: #D6B15C) */}
        <motion.span
          variants={scriptVariants}
          className="font-script text-[#D6B15C] text-[clamp(32px,5.7vw,102px)] leading-none block filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {scriptTitle}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function ScrollVideoScrub({ videoUrl }: ScrollVideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for tracking values inside the rAF loop without triggering React renders
  const progressRef = useRef(0);
  const currentTimeRef = useRef(0);
  const activeSceneIndexRef = useRef(0);
  const inViewRef = useRef(true);

  // Media Query listener for system-reduced motion compatibility (WCAG compliance)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to pause rendering and seeking calculations when component is off-screen (battery and CPU optimization)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 } // Trigger as soon as at least 1% is visible
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
      observer.disconnect();
    };
  }, []);

  // Frame initialization and browser paint detection sequence (WCAG & UX flash prevention)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let completed = false;

    const handleInitialization = () => {
      if (completed) return;
      
      const duration = video.duration || 53;
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollHeight = rect.height - window.innerHeight;
        let pct = -rect.top / scrollHeight;
        pct = Math.max(0, Math.min(1, pct));
        
        progressRef.current = pct;
        const initialTime = pct * duration;
        currentTimeRef.current = initialTime;
        
        // Seek directly to scroll-based time frame
        video.currentTime = initialTime;
      }
    };

    const handleSeeked = () => {
      if (completed) return;
      completed = true;
      
      // Delay slightly to confirm browser finishes rendering paint buffer
      setTimeout(() => {
        setIsInitialized(true);
      }, 150);
    };

    // Unlock video playback capabilities for mobile browsers
    const unlockMobile = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            handleInitialization();
          })
          .catch((err) => {
            console.warn("Mobile video decoder unlock deferred:", err);
            handleInitialization();
          });
      } else {
        handleInitialization();
      }
    };

    video.addEventListener("loadedmetadata", unlockMobile);
    video.addEventListener("seeked", handleSeeked);

    // If metadata is already cached / pre-loaded
    if (video.readyState >= 1) {
      unlockMobile();
    }

    // Safety timeout fallback (3.5 seconds) to prevent infinite loaders on slow connections
    const safetyTimeout = setTimeout(() => {
      if (!completed) {
        completed = true;
        setIsInitialized(true);
      }
    }, 3500);

    return () => {
      video.removeEventListener("loadedmetadata", unlockMobile);
      video.removeEventListener("seeked", handleSeeked);
      clearTimeout(safetyTimeout);
    };
  }, [reducedMotion, videoUrl]);

  useEffect(() => {
    // If reduced motion is requested or page hasn't finished initial rendering, ignore scroll loop
    if (reducedMotion || !isInitialized) {
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current || !inViewRef.current) return;
      
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
      // Avoid running seeks if the component is out of the viewport
      if (!inViewRef.current) {
        rAFId = requestAnimationFrame(smoothScrub);
        return;
      }

      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        if (!video.paused) {
          video.pause();
        }

        const duration = video.duration || 53;
        const targetTime = progressRef.current * duration;

        const diff = targetTime - currentTimeRef.current;
        if (Math.abs(diff) > 1.5) {
          currentTimeRef.current = targetTime;
        } else {
          currentTimeRef.current += diff * 0.08; // LERP easing LERP
        }

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
  }, [isInitialized, reducedMotion]);

  const currentScene = SCENES[activeSceneIndex];

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-[#0B0B0C]">
      {/* Premium Luxury Loading Screen */}
      <AnimatePresence>
        {!isInitialized && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0B0B0C] z-50 flex flex-col items-center justify-center select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex flex-col items-center text-center p-6"
            >
              <img
                src="/logo_transparent.png"
                alt="VILLA V"
                className="w-[200px] sm:w-[260px] md:w-[320px] h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Video Canvas Wrapper */}
      <div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: isInitialized ? 1 : 0,
          visibility: isInitialized ? "visible" : "hidden"
        }}
      >
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

        {/* Unified Storytelling Layout */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-24 z-10">
          <div className="max-w-4xl w-full text-center flex flex-col items-center select-none">
            
            {/* Serif & Script Overlap Container (Fixed inline bounds to map percentage alignment) */}
            <div className="relative inline-block overflow-visible min-h-[140px] md:min-h-[200px] filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <AnimatePresence mode="wait">
                <LuxuryTitle
                  key={currentScene.serifTitle}
                  serifTitle={currentScene.serifTitle}
                  scriptTitle={currentScene.scriptTitle}
                />
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
