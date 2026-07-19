"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [consentChecked, setConsentChecked] = useState(false);

  const headingLines = ["Arrange", "Your", "Private", "Visit"];

  const badges = [
    {
      label: "Private Concierge",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: "Response within 24h",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Completely Confidential",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  const contactItems = [
    {
      label: "Location",
      value: "Split, Croatia",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: "Email",
      value: "info@villaserenite.com",
      href: "mailto:info@villaserenite.com",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Private Concierge",
      value: "+385 21 555 0199",
      href: "tel:+385215550199",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !consentChecked) return;

    // Honeypot spam blocker
    if (honeypot !== "") {
      setStatus("submitting");
      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", date: "", message: "" });
        setConsentChecked(false);
      }, 1000);
      return;
    }

    setStatus("submitting");

    // Simulate luxury API submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", date: "", message: "" });
      setConsentChecked(false);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-20 lg:py-36 bg-[#0B0B0C] overflow-hidden select-none scroll-mt-24 lg:scroll-mt-20" 
      aria-labelledby="contact-heading"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* COLUMN 1: Concierge Details & Office anchors (Left 40%) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center relative">
            
            {/* Ambient gold glow behind heading */}
            <div className="absolute -left-[10%] -top-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A96A]/3 blur-[100px] pointer-events-none z-0" />

            <span id="contact-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block relative z-10">
              PRIVATE CONSULTATION
            </span>

            {/* Editorial Heading Line-by-Line */}
            <h2 className="text-[clamp(32px,6.5vw,48px)] lg:text-[clamp(48px,5.5vw,72px)] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-5 lg:mb-6 relative z-10 whitespace-pre-line">
              {headingLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#B8B8B8] text-[16px] sm:text-[18px] font-normal leading-[1.7] max-w-[420px] mb-8 lg:mb-10 relative z-10"
            >
              Our concierge team will personally assist you in arranging an exclusive viewing tailored to your schedule.
            </motion.p>

            {/* Premium Contact Details List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6 relative z-10"
            >
              {contactItems.map((item) => (
                <motion.div 
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 border border-white/10 bg-white/[0.02] rounded-full flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-sm sm:text-base text-[#F6F3EB] font-light tracking-wide hover:text-[#C8A96A] transition-colors mt-0.5"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base text-[#F6F3EB] font-light tracking-wide mt-0.5">
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Luxury gold outline Appointment Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="border border-[#C8A96A]/30 text-[#C8A96A] text-[11px] font-sans font-semibold px-6 py-2.5 rounded-full uppercase tracking-[0.2em] self-start mt-10 relative z-10"
            >
              By Appointment Only
            </motion.div>

          </div>

          {/* COLUMN 2: Private Booking Form Card (Right 60%) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col w-full relative z-10">
            
            {/* Form Badges Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 select-none">
              {badges.map((badge, idx) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] sm:text-[10px] tracking-wider text-[#F6F3EB]/60 uppercase"
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Elevated glass card wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#121214] border border-[#C8A96A]/15 rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.55)] p-5 sm:p-10 lg:p-12 w-full"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-6"
                  >
                    <div className="w-16 h-16 rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/5 flex items-center justify-center text-[#C8A96A] animate-bounce">
                      <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-[24px] sm:text-[28px] font-serif text-[#F6F3EB] font-light tracking-wide mb-2">
                        Inquiry Logged
                      </h3>
                      <p className="text-sm text-[#B8B8B8] tracking-wider max-w-sm font-light leading-relaxed">
                        An architectural relations director will contact you via verified channels within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-xs font-mono tracking-widest text-[#C8A96A] hover:text-[#D6B15C] underline cursor-pointer focus-visible:outline-none"
                    >
                      SUBMIT ANOTHER REQUEST
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Honeypot Spam Field */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        placeholder="Leave this blank"
                        autoComplete="off"
                      />
                    </div>

                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-name" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Alexander Mercer"
                        disabled={status === "submitting"}
                        className="w-full h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300"
                      />
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-email" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="form-email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g., alexander@mercer.com"
                          disabled={status === "submitting"}
                          className="w-full h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-phone" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="form-phone"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g., +385 21 555 0199"
                          disabled={status === "submitting"}
                          className="w-full h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-date" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                        Preferred Tour Date
                      </label>
                      <input
                        type="date"
                        id="form-date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        className="w-full h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 text-left cursor-pointer"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-message" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                        Private Inquiry Details
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Specify yacht berthing requirements or private helicopter arrival parameters if needed..."
                        disabled={status === "submitting"}
                        className="w-full h-[140px] py-4 bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* GDPR Consent Checkbox */}
                    <div className="flex items-start gap-3 mt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        disabled={status === "submitting"}
                        className="mt-1 w-4 h-4 border border-white/10 rounded bg-[#18181A] checked:bg-[#C8A96A] checked:border-[#C8A96A] accent-[#C8A96A] text-[#C8A96A] cursor-pointer focus-visible:outline-none"
                      />
                      <label
                        htmlFor="consent"
                        className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed font-sans cursor-pointer hover:text-white/60 transition-colors select-none"
                      >
                        I consent to my contact details being processed in accordance with the{" "}
                        <Link href="/privacy" className="text-[#C8A96A] underline hover:text-[#E6D2A2]" target="_blank">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" className="text-[#C8A96A] underline hover:text-[#E6D2A2]" target="_blank">
                          Terms of Service
                        </Link>
                        .
                      </label>
                    </div>

                    {/* Pill-Shaped Action Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "submitting" || !consentChecked}
                      whileHover={status === "idle" && consentChecked ? { y: -2 } : {}}
                      whileTap={{ scale: 0.97 }}
                      className="group/btn w-full h-[56px] lg:h-[60px] rounded-full bg-gradient-to-r from-[#C8A96A] to-[#E3C68E] hover:from-[#D6B15C] hover:to-[#F1D7A1] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B0B0C] font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] px-4 flex items-center justify-center gap-3 transition-all duration-300 focus-visible:outline-none"
                    >
                      {status === "submitting" ? (
                        <>
                          <span>Verifying Credentials</span>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Request Private Consultation</span>
                          <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300 select-none">
                            →
                          </span>
                        </>
                      )}
                    </motion.button>

                  </form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
