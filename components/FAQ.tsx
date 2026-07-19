"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "When will the residence be completed?",
      a: "Villa Sérénité is scheduled for completion in Q4 2026. The construction schedule is strictly audited to guarantee museum-grade finishes and zero compromises on architectural integrity."
    },
    {
      q: "Can the interiors be personalized?",
      a: "Yes. Future residents can collaborate directly with our design atelier to customize wall finishes, select slab configurations of natural marble, and integrate customized storage systems."
    },
    {
      q: "What amenities are included?",
      a: "The estate features a 25-meter lava stone heated infinity pool, private wellness thermal spa suite, custom acoustic Dolby screening room, climate sommelier cellar, and smart home automation."
    },
    {
      q: "How do I arrange a private consultation?",
      a: "Private tours and detail reviews can be scheduled by submitting an inquiry via our contact form below or calling our private registrar office directly."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  return (
    <section 
      id="faq" 
      className="relative w-full max-w-full py-20 lg:py-36 bg-[#0B0B0C] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border px-4 lg:px-0"
      aria-labelledby="faq-heading"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-0 md:px-12 lg:px-20 relative z-10 box-border">
        
        {/* Two-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-start w-full max-w-full box-border">
          
          {/* COLUMN 1: Editorial Description (Left 35%) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center relative w-full min-w-0 max-w-full box-border">
            
            {/* Faint gold lighting glow behind heading */}
            <div className="absolute -left-[10%] -top-[10%] w-[250px] h-[250px] rounded-full bg-[#C8A96A]/3 blur-[90px] pointer-events-none z-0" />

            <span id="faq-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block relative z-10">
              THE DETAILS
            </span>

            <h2 className="text-[clamp(32px,6.5vw,45px)] lg:text-[clamp(45px,5vw,62px)] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6 relative z-10 whitespace-pre-line">
              Frequently{"\n"}Asked{"\n"}Questions
            </h2>

            <p className="text-[#B8B8B8] text-[15px] lg:text-[18px] font-normal leading-[1.7] max-w-[420px] mb-5 lg:mb-6 relative z-10">
              Everything prospective owners need to know before arranging a private consultation.
            </p>

            <div className="w-12 h-[1.5px] bg-[#C8A96A] mt-2 relative z-10" />

          </div>

          {/* COLUMN 2: Luxury Accordion Cards (Right 65%) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 w-full min-w-0 max-w-full box-border">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.q}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={cardVariants}
                  className="w-full max-w-full min-w-0 box-border bg-[#121214] border border-[#C8A96A]/15 hover:border-[#C8A96A]/45 hover:bg-[#151518] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(200,169,106,0.04)] rounded-[18px] sm:rounded-[24px] p-5 sm:p-8 lg:p-10 transition-all duration-300 select-none cursor-pointer group"
                  onClick={() => handleToggle(idx)}
                >
                  
                  {/* Question row */}
                  <div className="w-full flex items-center justify-between text-left">
                    <span className="font-serif text-[#F6F3EB] text-[18px] sm:text-[22px] lg:text-[28px] xl:text-[32px] font-light leading-tight tracking-wide pr-6 select-none">
                      {faq.q}
                    </span>
                    
                    {/* Toggle button */}
                    <div 
                      className={`w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A] transition-all duration-300 shrink-0 select-none ${
                        isOpen ? "bg-[#C8A96A] text-black border-[#C8A96A]" : "bg-transparent group-hover:bg-[#C8A96A] group-hover:text-black group-hover:border-[#C8A96A]"
                      }`}
                    >
                      {/* Plus icon rotates 45 degrees to cross close */}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>

                  {/* Dynamic Height Crossfade Answer Block */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#B8B8B8] text-[16px] lg:text-[18px] font-normal leading-[1.8] max-w-[650px] select-none">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
