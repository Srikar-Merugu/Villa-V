"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "What is the current construction phase of Villa V?",
    a: "We are currently in Phase 3 (Structural Framework & Finishing). Concrete foundations and retaining shell outlines have been successfully cast. Internal partition brickwork, MEP rough-ins, and high-performance structural glazing installations are underway, on schedule for a Q4 2026 delivery."
  },
  {
    q: "Can the floor plan layouts and interior finishes be customized?",
    a: "Yes. Early-stage purchasers can work directly with our design partners to customize internal partition layouts, fine-tune smart-home configurations, and select from a curated list of ultra-premium finishes, including Italian travertine quarries, solid American walnut cladding, and custom kitchen setups."
  },
  {
    q: "What environmental and sustainability credentials does the villa have?",
    a: "Villa V is engineered for low-carbon emissions. Features include solar roofing panels integrated into the rooftop deck, a greywater filtration system for landscaping irrigation, high-thermal mass concrete structures for thermal comfort, and double-glazed low-emissivity glass to minimize energy loss."
  },
  {
    q: "What security systems are integrated into the home?",
    a: "The residence is secured by secure, encrypted home automation systems. It features smart biometrics at all primary portals, CCTV cameras integrated with real-time AI perimeter detection, private security alarms, and a panic room backup option connected to localized emergency dispatch networks."
  },
  {
    q: "How can I schedule a private tour of the construction site?",
    a: "Private, escorted site tours are available strictly for qualified prospective clients. You can submit a request through our online booking terminal at the bottom of this page. A dedicated representative will contact you to perform standard pre-qualification and arrange helipad or private luxury car transfer details."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-36 bg-[#0B0B0C] overflow-hidden select-none border-t border-gold/5">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 flex flex-col gap-4 text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
              The Details
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
              Frequently Inquired
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-white/55 tracking-wider font-light"
          >
            Answers to key architectural, timeline, and buying queries.
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col border-t border-white/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-white/10 select-none">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className={`text-sm md:text-base font-serif tracking-wide transition-colors duration-300 ${isOpen ? "text-gold" : "text-white/80 group-hover:text-white"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:border-gold group-hover:text-gold transition-colors duration-300 shrink-0 ml-4`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated collapse block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-xs md:text-sm text-white/50 tracking-wider font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
