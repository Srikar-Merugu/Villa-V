// Shared rhythm and motion constants so every section (About, Amenities, Gallery,
// FloorPlans, Location, FAQ, Contact, Lifestyle, Architectural Philosophy) reads as one
// continuous system instead of each file inventing its own spacing/timing values.
// The Hero (ScrollVideoScrub) is intentionally excluded -- it has its own finished system.

// Vertical rhythm: outer section padding and the gap between a section's header block
// and its content. Every section should compose these instead of ad hoc py-/mb- values.
export const SECTION_PADDING = "py-24 lg:py-40";
export const SECTION_HEADER_GAP = "mb-10 lg:mb-20";
export const SECTION_CONTAINER = "w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border";

// Premium easing: a slightly decelerated cubic used for entrances (content settling into
// place, not bouncing), and a slower, heavier curve for large-scale reveals (full-bleed
// images, masks) where a snappier easing would read as cheap rather than expensive.
export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const;
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export const DURATION_ENTRANCE = 0.9;
export const DURATION_CINEMATIC = 1.4;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_ENTRANCE, ease: EASE_ENTRANCE }
  }
};

export const staggerChildren = (stagger = 0.15) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger }
  }
});
