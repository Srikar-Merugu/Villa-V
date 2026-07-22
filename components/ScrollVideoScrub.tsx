"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface SceneContent {
  serifTitle: string;
  scriptTitle: string;
}

const SCENES: SceneContent[] = [
  {
    serifTitle: "SÉRÉNITÉ",
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

// Frame-sequence assets: pre-extracted stills drawn to canvas instead of scrubbing a
// real <video> element. Native video.currentTime seeking depends on the browser's H.264
// decoder finding/decoding from the nearest keyframe, which behaves inconsistently across
// Chrome/Safari/Firefox and across devices -- that inconsistency is the root cause of
// production-only stutter that doesn't reproduce locally. Drawing an already-decoded
// image to canvas is a deterministic, near-instant operation on every browser.
const DESKTOP_FRAME_COUNT = 360;
const MOBILE_FRAME_COUNT = 200;
const DESKTOP_BASE_PATH = "/frames/hero/desktop/frame_";
const MOBILE_BASE_PATH = "/frames/hero/mobile/frame_";
const PRIORITY_FRAME_COUNT = 10;
const BACKGROUND_LOAD_CONCURRENCY = 6;

function framePath(basePath: string, index: number) {
  return `${basePath}${String(index + 1).padStart(4, "0")}.webp`;
}

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

export default function ScrollVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Fade out the scroll mouse indicator on initial scroll down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Refs for tracking values inside the rAF loop without triggering React renders
  const progressRef = useRef(0);
  const activeSceneIndexRef = useRef(0);
  const inViewRef = useRef(true);
  const frameCountRef = useRef(DESKTOP_FRAME_COUNT);
  const basePathRef = useRef(DESKTOP_BASE_PATH);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadingSetRef = useRef<Set<number>>(new Set());
  const lastDrawnIndexRef = useRef(-1);
  const lastLowerIndexRef = useRef(-1);
  const lastUpperIndexRef = useRef(-1);
  const lastFracRef = useRef(0);
  const lastRawIndexRef = useRef(-1);

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

  // Draws the nearest frame to the current scroll position, using object-fit: cover math,
  // scaled for the device pixel ratio so it stays crisp on high-DPI screens.
  //
  // Earlier this drew the floor/ceil frames as an alpha cross-fade to hide frame-to-frame
  // stepping, but that only works when adjacent frames are near-identical (e.g. a slow product
  // rotation). This footage has real camera movement between frames, so blending two frames
  // that already differ in composition produced a visible double-exposure ghost and a darker,
  // muddier image -- worse than the stepping it was meant to fix. A hard cut to the nearest
  // frame, backed by a denser frame sequence (see DESKTOP_FRAME_COUNT/MOBILE_FRAME_COUNT), is
  // the correct fix: it shrinks the visual gap between frames instead of faking a blend across it.
  const drawBlended = useCallback((lowerIndex: number, upperIndex: number, frac: number) => {
    const canvas = canvasRef.current;
    const nearestIndex = frac < 0.5 ? lowerIndex : upperIndex;
    const img = imagesRef.current[nearestIndex] ?? imagesRef.current[lowerIndex];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    const targetWidth = Math.round(cssWidth * dpr);
    const targetHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = Math.max(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cssWidth - dw) / 2;
    const dy = (cssHeight - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);

    lastDrawnIndexRef.current = nearestIndex;
    lastLowerIndexRef.current = lowerIndex;
    lastUpperIndexRef.current = upperIndex;
    lastFracRef.current = frac;
  }, []);

  // Loads a single frame if not already loaded/loading. Used both for the initial
  // priority batch and for scroll-triggered "jump ahead" requests.
  const loadOne = useCallback((index: number): Promise<void> => {
    if (imagesRef.current[index] || loadingSetRef.current.has(index)) {
      return Promise.resolve();
    }
    loadingSetRef.current.add(index);
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      const finish = () => {
        loadingSetRef.current.delete(index);
        resolve();
      };
      img.onload = () => {
        imagesRef.current[index] = img;
        finish();
      };
      img.onerror = finish;
      img.src = framePath(basePathRef.current, index);
    });
  }, []);

  const requestPriorityLoad = useCallback((index: number) => {
    void loadOne(index);
  }, [loadOne]);

  // Redraw the current frame at the new canvas size on resize/orientation change
  useEffect(() => {
    const handleResize = () => {
      if (lastLowerIndexRef.current >= 0) {
        drawBlended(lastLowerIndexRef.current, lastUpperIndexRef.current, lastFracRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawBlended]);

  // Initial frame-sequence load: pick the device-appropriate set, block only on a small
  // priority window around the scroll-derived starting frame, then reveal and stream the
  // rest of the sequence in behind a concurrency-limited background queue.
  useEffect(() => {
    let cancelled = false;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const basePath = isMobile ? MOBILE_BASE_PATH : DESKTOP_BASE_PATH;

    frameCountRef.current = frameCount;
    basePathRef.current = basePath;
    imagesRef.current = new Array(frameCount).fill(null);
    loadingSetRef.current.clear();
    lastDrawnIndexRef.current = -1;

    const init = async () => {
      let initialIndex = 0;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollHeight = rect.height - window.innerHeight;
        let pct = -rect.top / scrollHeight;
        pct = Math.max(0, Math.min(1, pct));
        progressRef.current = pct;
        initialIndex = Math.round(pct * (frameCount - 1));
      }

      const priorityIndices = new Set<number>();
      for (let i = 0; i < Math.min(PRIORITY_FRAME_COUNT, frameCount); i++) {
        priorityIndices.add(i);
      }
      for (let i = Math.max(0, initialIndex - 3); i <= Math.min(frameCount - 1, initialIndex + 3); i++) {
        priorityIndices.add(i);
      }

      await Promise.all(Array.from(priorityIndices).map(loadOne));
      if (cancelled) return;

      drawBlended(initialIndex, initialIndex, 0);

      // Confirm the browser has actually painted the frame before revealing
      // (double-rAF is a deterministic paint boundary; a fixed timeout is not)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setIsInitialized(true);
        });
      });

      // Stream in the rest of the sequence in the background at a steady, bounded
      // concurrency (not re-triggered by scrolling), expanding outward from the starting
      // frame so the frames closest to where the visitor lands load first.
      const loadOrder: number[] = [initialIndex];
      for (let step = 1; loadOrder.length < frameCount; step++) {
        const down = initialIndex - step;
        const up = initialIndex + step;
        if (down >= 0) loadOrder.push(down);
        if (up <= frameCount - 1) loadOrder.push(up);
      }

      let cursor = 0;
      const workers = new Array(BACKGROUND_LOAD_CONCURRENCY).fill(0).map(async () => {
        while (cursor < loadOrder.length && !cancelled) {
          const idx = loadOrder[cursor++];
          await loadOne(idx);
        }
      });
      await Promise.all(workers);
    };

    init();

    // Safety timeout fallback (3.5 seconds) to prevent infinite loaders on slow connections
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) setIsInitialized(true);
    }, 3500);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeout);
    };
  }, [drawBlended, loadOne]);

  useEffect(() => {
    // If reduced motion is requested or page hasn't finished initial rendering, ignore scroll loop
    if (reducedMotion || !isInitialized) {
      return;
    }

    // Single per-frame layout read + scene calc, unified with the scrub loop below so
    // there is exactly one layout read per animation frame, in a deterministic order.
    const computeProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;

      let pct = -rect.top / scrollHeight;
      pct = Math.max(0, Math.min(1, pct));

      progressRef.current = pct;

      // Determine active scene based on progress to control visual overlays
      let sceneIndex = 0;
      if (pct < 0.05) {
        sceneIndex = 0;
      } else if (pct < 0.22) {
        sceneIndex = 1;
      } else if (pct < 0.40) {
        sceneIndex = 2;
      } else if (pct < 0.60) {
        sceneIndex = 3;
      } else if (pct < 0.78) {
        sceneIndex = 4;
      } else if (pct < 0.93) {
        sceneIndex = 5;
      } else {
        sceneIndex = 6;
      }

      if (sceneIndex !== activeSceneIndexRef.current) {
        activeSceneIndexRef.current = sceneIndex;
        setActiveSceneIndex(sceneIndex);
      }
    };

    let rAFId: number;
    const tick = () => {
      if (!inViewRef.current) {
        rAFId = requestAnimationFrame(tick);
        return;
      }

      computeProgress();

      const frameCount = frameCountRef.current;
      const rawIndex = Math.min(frameCount - 1, Math.max(0, progressRef.current * (frameCount - 1)));
      const lowerIndex = Math.floor(rawIndex);
      const upperIndex = Math.min(frameCount - 1, lowerIndex + 1);
      const frac = rawIndex - lowerIndex;

      // Skip redundant work while genuinely static (e.g. scroll momentum has fully settled)
      if (Math.abs(rawIndex - lastRawIndexRef.current) < 0.0008) {
        rAFId = requestAnimationFrame(tick);
        return;
      }
      lastRawIndexRef.current = rawIndex;

      if (imagesRef.current[lowerIndex]) {
        drawBlended(lowerIndex, upperIndex, frac);
        if (!imagesRef.current[upperIndex] && frac > 0.002) {
          requestPriorityLoad(upperIndex);
        }
      } else {
        // Target frame hasn't loaded yet: keep the last successfully drawn frame on
        // screen (no blank flash) and jump this frame + its immediate neighbors to
        // the front of the load queue so fast scrolling still catches up quickly.
        requestPriorityLoad(lowerIndex);
        requestPriorityLoad(upperIndex);
        requestPriorityLoad(Math.max(0, lowerIndex - 1));
      }

      rAFId = requestAnimationFrame(tick);
    };

    rAFId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rAFId);
    };
  }, [isInitialized, reducedMotion, drawBlended, requestPriorityLoad]);

  const scenes = t("hero.scenes") as { serif: string; script: string }[];
  const currentScene = scenes[activeSceneIndex] || { serif: "", script: "" };

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
              className="flex flex-col items-center text-center p-6 select-none"
            >
              <img
                src="/shield_icon.png"
                alt=""
                className="w-16 sm:w-20 md:w-24 h-auto object-contain select-none pointer-events-none mb-6 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
              <span className="text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-[#C8A96A] font-sans font-medium mb-2.5">
                {t("hero.tagline")}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.1em] text-[#F6F3EB] font-light leading-none">
                {t("hero.brand")}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Frame-Sequence Canvas Wrapper */}
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: isInitialized ? 1 : 0,
          visibility: isInitialized ? "visible" : "hidden"
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Light overall grade to keep the frame rich rather than washed out... */}
        <div className="absolute inset-0 bg-black/8 pointer-events-none" />

        {/* ...with contrast concentrated in a soft vignette behind the title cluster instead,
            so legibility holds on every frame without dulling the rest of the cinematic shot */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(58% 42% at 50% 46%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0) 78%)"
          }}
        />

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
                  key={currentScene.serif}
                  serifTitle={currentScene.serif}
                  scriptTitle={currentScene.script}
                />
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Floating Scroll Indicator (bottom center - High Contrast Gold & Ivory) */}
        <AnimatePresence>
          {showScrollIndicator && isInitialized && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none z-15 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            >
              {/* Computer Mouse Outline Container (Solid Champagne Gold #C8A96A) */}
              <div className="w-[22px] h-[36px] rounded-full border-[1.5px] border-[#C8A96A] flex justify-center p-1.5">
                {/* Moving Scroll Wheel Dot */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[3px] h-[3px] rounded-full bg-[#C8A96A]"
                />
              </div>
              <span className="text-[9.5px] font-mono tracking-[0.3em] text-[#F6F3EB] font-bold uppercase mt-1 text-shadow-subtle">
                {t("hero.scroll")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
