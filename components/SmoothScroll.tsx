"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Instantiate Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
      smoothWheel: true,
      syncTouch: false,
    });

    const rafLoop = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(rafLoop);
    };

    requestAnimationFrame(rafLoop);

    // Apply lenis smooth scroll class globally
    document.documentElement.classList.add("lenis-smooth");

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
