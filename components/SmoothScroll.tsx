"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Instantiate Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
      smoothWheel: true,
      syncTouch: false,
    });

    // Post-Hero sections use GSAP ScrollTrigger for pinned/scrubbed section choreography.
    // ScrollTrigger listens to the native scroll event by default, but Lenis moves the page
    // via its own eased position rather than firing native scroll 1:1 -- without this wiring
    // the two disagree about "where the user actually is," producing exactly the kind of
    // stacked-easing lag already diagnosed and fixed once in the Hero. Driving GSAP's ticker
    // from Lenis's own raf, and telling ScrollTrigger to recompute on Lenis's scroll event,
    // keeps both systems reading the same single source of truth.
    lenis.on("scroll", ScrollTrigger.update);

    const gsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    // Apply lenis smooth scroll class globally
    document.documentElement.classList.add("lenis-smooth");

    return () => {
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
