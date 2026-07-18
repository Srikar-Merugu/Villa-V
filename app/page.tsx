"use client";

import Navbar from "../components/Navbar";
import ScrollVideoScrub from "../components/ScrollVideoScrub";
import About from "../components/About";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import FloorPlans from "../components/FloorPlans";
import Location from "../components/Location";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import SmoothScroll from "../components/SmoothScroll";

export default function Home() {
  const videoUrl = "/videos/hero.mp4?v=3";

  return (
    <SmoothScroll>
      <Navbar />
      <ScrollVideoScrub videoUrl={videoUrl} />
      
      {/* Post-Video Luxury Editorial Sections */}
      <main className="relative z-10 bg-[#0A0A0A]">
        <About />
        <Amenities />
        <Gallery />
        <FloorPlans />
        <Location />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
