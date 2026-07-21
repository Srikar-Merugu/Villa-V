"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language, t } = useLanguage();
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
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});

  const headingLines = (t("contact.title") as string).split(" ");

  const badgesText = t("contact.badges") as string[];
  const badges = [
    {
      label: badgesText[0] || "PRIVATE RESIDENCE",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: badgesText[1] || "BY APPOINTMENT ONLY",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: badgesText[2] || "SECURE PORTAL",
      icon: (
        <svg className="w-3.5 h-3.5 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  const contactItems = [
    {
      label: language === "hr" ? "Lokacija" : "Location",
      value: language === "hr" ? "Split, Hrvatska" : "Split, Croatia",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: "Email",
      value: "concierge@villaserenite.com",
      href: "mailto:concierge@villaserenite.com",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: language === "hr" ? "Privatni vratar" : "Private Concierge",
      value: "+123 45 678 9012",
      href: "tel:+123456789012",
      icon: (
        <svg className="w-4 h-4 text-[#C8A96A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!formData.name.trim()) {
      tempErrors.name = t("contact.form.validationName");
    }
    if (!formData.email.trim()) {
      tempErrors.email = t("contact.form.validationEmail");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = t("contact.form.validationEmailInvalid");
      }
    }
    if (!consentChecked) {
      tempErrors.consent = t("contact.form.validationConsent");
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
      setErrors({});
    }, 2200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Live validation clean
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative w-full max-w-full py-12 lg:py-36 bg-[#0E0E0E] overflow-x-hidden select-none scroll-mt-24 lg:scroll-mt-20 box-border"
      aria-labelledby="contact-heading"
    >
      {/* Subtle Architectural Grid Texture (Almost invisible) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 relative z-10 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start w-full max-w-full box-border">
          
          {/* COLUMN 1: Concierge Details & Office anchors (Left 40%) */}
          <div className="lg:col-span-5 flex flex-col justify-center relative w-full min-w-0 max-w-full box-border overflow-hidden">
            
            {/* Ambient gold glow behind heading — clipped inside column */}
            <div className="absolute -left-4 -top-8 w-[200px] h-[200px] rounded-full bg-[#C8A96A]/3 blur-[80px] pointer-events-none z-0" />

            <span id="contact-heading" className="text-[#C8A96A] text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-4 block relative z-10">
              {t("contact.label")}
            </span>

            {/* Editorial Heading Line-by-Line */}
            <h2 className="text-[clamp(28px,6.5vw,40px)] lg:text-[clamp(48px,5.5vw,72px)] font-serif text-[#F6F3EB] font-light tracking-tight leading-[1.05] mb-3 lg:mb-6 relative z-10 whitespace-pre-line">
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
              className="text-[#B8B8B8] text-[14px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.7] max-w-[420px] mb-5 lg:mb-10 relative z-10"
            >
              {t("contact.desc")}
            </motion.p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4 lg:gap-6 relative z-10"
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

            {/* Luxury gold outline Appointment Badge — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden md:block border border-[#C8A96A]/30 text-[#C8A96A] text-[11px] font-sans font-semibold px-6 py-2.5 rounded-full uppercase tracking-[0.2em] self-start mt-10 relative z-10"
            >
              {badgesText[1] || "By Appointment Only"}
            </motion.div>

          </div>

          {/* COLUMN 2: Private Booking Form Card (Right 60%) */}
          <div className="lg:col-span-7 flex flex-col w-full min-w-0 max-w-full box-border relative z-10">
            
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
              className="bg-[#121214] border border-[#C8A96A]/15 rounded-[24px] sm:rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.55)] p-5 sm:p-8 lg:p-12 w-full min-w-0 max-w-full box-border"
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
                        {t("contact.form.success")}
                      </h3>
                      <p className="text-sm text-[#B8B8B8] tracking-wider max-w-sm font-light leading-relaxed">
                        {language === "hr" 
                          ? "Predstavnik za odnose s klijentima kontaktirat će vas u roku od 24 sata." 
                          : "A client representative will contact you within 24 hours."}
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-xs font-mono tracking-widest text-[#C8A96A] hover:text-[#D6B15C] underline cursor-pointer focus-visible:outline-none"
                    >
                      {language === "hr" ? "POŠALJITE NOVI UPIT" : "SUBMIT ANOTHER REQUEST"}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
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
                        {t("contact.form.name")}
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.namePlaceholder")}
                        disabled={status === "submitting"}
                        className={`w-full h-[56px] lg:h-[60px] bg-[#18181A] border focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 max-w-full box-border ${
                          errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#C8A96A]/60"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-xs font-sans mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-full box-border">
                      <div className="flex flex-col gap-2 w-full min-w-0 max-w-full box-border">
                        <label htmlFor="form-email" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                          {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          id="form-email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("contact.form.emailPlaceholder")}
                          disabled={status === "submitting"}
                          className={`w-full h-[56px] lg:h-[60px] bg-[#18181A] border focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 max-w-full box-border ${
                            errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#C8A96A]/60"
                          }`}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs font-sans mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full min-w-0 max-w-full box-border">
                        <label htmlFor="form-phone" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                          {t("contact.form.phone")}
                        </label>
                        <input
                          type="text"
                          id="form-phone"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t("contact.form.phonePlaceholder")}
                          disabled={status === "submitting"}
                          className="w-full h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 max-w-full box-border"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-2 w-full min-w-0 max-w-full box-border">
                      <label htmlFor="form-date" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                        {t("contact.form.date")}
                      </label>
                      <input
                        type="date"
                        id="form-date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        className="w-full min-w-0 h-[56px] lg:h-[60px] bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 text-left cursor-pointer max-w-full box-border"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-message" className="text-[10px] font-sans tracking-[0.2em] text-[#F6F3EB]/50 uppercase font-semibold">
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.messagePlaceholder")}
                        disabled={status === "submitting"}
                        className="w-full h-[140px] py-4 bg-[#18181A] border border-white/10 focus:border-[#C8A96A]/60 focus:ring-1 focus:ring-[#C8A96A]/20 focus:outline-none px-5 rounded-[16px] text-sm text-[#F6F3EB] placeholder-[#F6F3EB]/25 transition-all duration-300 resize-none max-w-full box-border"
                      />
                    </div>

                    {/* GDPR Consent Checkbox */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-3 mt-2">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          checked={consentChecked}
                          onChange={(e) => {
                            setConsentChecked(e.target.checked);
                            if (e.target.checked && errors.consent) {
                              setErrors((prev) => ({ ...prev, consent: undefined }));
                            }
                          }}
                          disabled={status === "submitting"}
                          className="mt-1 w-4 h-4 border border-white/10 rounded bg-[#18181A] checked:bg-[#C8A96A] checked:border-[#C8A96A] accent-[#C8A96A] text-[#C8A96A] cursor-pointer focus-visible:outline-none"
                        />
                        <label
                          htmlFor="consent"
                          className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed font-sans cursor-pointer hover:text-white/60 transition-colors select-none"
                        >
                          {t("contact.form.consent")}{" "}
                          <Link href="/privacy" className="text-[#C8A96A] underline hover:text-[#E6D2A2]" target="_blank">
                            {language === "hr" ? "Pravilima o privatnosti" : "Privacy Policy"}
                          </Link>{" "}
                          {language === "hr" ? "i" : "and"}{" "}
                          <Link href="/terms" className="text-[#C8A96A] underline hover:text-[#E6D2A2]" target="_blank">
                            {language === "hr" ? "Uvjetima pružanja usluge" : "Terms of Service"}
                          </Link>
                          .
                        </label>
                      </div>
                      {errors.consent && (
                        <span className="text-red-500 text-xs font-sans mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.consent}
                        </span>
                      )}
                    </div>

                    {/* Pill-Shaped Action Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={status === "idle" ? { y: -2 } : {}}
                      whileTap={{ scale: 0.97 }}
                      className="group/btn w-full h-[56px] lg:h-[60px] rounded-full bg-gradient-to-r from-[#C8A96A] to-[#E3C68E] hover:from-[#D6B15C] hover:to-[#F1D7A1] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B0B0C] font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] px-4 flex items-center justify-center gap-3 transition-all duration-300 focus-visible:outline-none max-w-full box-border"
                    >
                      {status === "submitting" ? (
                        <>
                          <span>{t("contact.form.submitting")}</span>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>{t("contact.form.submit")}</span>
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
