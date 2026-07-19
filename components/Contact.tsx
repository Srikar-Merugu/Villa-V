"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, MapPin, Phone, Mail } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !consentChecked) return;

    // Honeypot spam check: if filled, silently swallow the request (looks like success to the bot)
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

    // Simulate luxury API submission and server-side validation delay
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

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#0E0E0E] overflow-hidden select-none border-t border-gold/5" aria-labelledby="contact-heading">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Contact details and Vetting disclaimer */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <div>
              <span id="contact-heading" className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                The Connection
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-wide leading-tight mt-2">
                Initiate Your Journey
              </h2>
              <p className="text-xs md:text-sm text-white/50 tracking-wider font-light leading-relaxed mt-4">
                Arrange a private consult or site walkthrough. Due to security protocols, entry
                to the site is strictly reserved for pre-vetted clients.
              </p>
            </div>

            {/* Address Details */}
            <div className="flex flex-col gap-6 font-sans">
              <div className="flex items-start gap-4">
                <a
                  href="https://maps.google.com/?q=Trg+Republike+1,+21000+Split,+Croatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0 focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="View Split headquarters on Google Maps"
                >
                  <MapPin className="w-4 h-4 stroke-[1.25]" />
                </a>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Headquarters</span>
                  <a
                    href="https://maps.google.com/?q=Trg+Republike+1,+21000+Split,+Croatia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 font-light tracking-wide hover:text-gold transition-colors"
                  >
                    Trg Republike 1, 21000 Split, Croatia
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <a
                  href="tel:+385215550199"
                  className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0 focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Call Villa V Concierge Office"
                >
                  <Phone className="w-4 h-4 stroke-[1.25]" />
                </a>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Inquiries Desk</span>
                  <a
                    href="tel:+385215550199"
                    className="text-sm text-white/80 font-light tracking-wide hover:text-gold transition-colors"
                  >
                    +385 (0) 21 555 0199
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <a
                  href="mailto:inquiries@villa-v.com"
                  className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0 focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Email Villa V Concierge Desk"
                >
                  <Mail className="w-4 h-4 stroke-[1.25]" />
                </a>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Direct Email</span>
                  <a
                    href="mailto:inquiries@villa-v.com"
                    className="text-sm text-white/80 font-light tracking-wide hover:text-gold transition-colors"
                  >
                    inquiries@villa-v.com
                  </a>
                </div>
              </div>
            </div>

            {/* Reassurance Disclaimer */}
            <div className="p-5 border border-gold/10 glass-light bg-black/35 flex gap-4">
              <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/40 tracking-wider font-light leading-relaxed">
                By submitting this request, you consent to standard credential verification.
                All information is securely encrypted under advanced key protocols.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-12 relative overflow-hidden bg-black/40">
              
              {/* Form border accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                  <div className="w-16 h-16 rounded-full border border-gold/25 bg-gold/5 flex items-center justify-center text-gold animate-bounce">
                    <CheckCircle2 className="w-8 h-8 stroke-[1.25]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white font-light tracking-wide mb-2">
                      Inquiry Received
                    </h3>
                    <p className="text-xs text-white/50 tracking-wider max-w-sm font-light leading-relaxed">
                      Your details have been securely logged. An architectural relations director
                      will contact you via verified channels within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs font-mono tracking-widest text-gold hover:text-gold-light underline cursor-pointer focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                  {/* Honeypot Spam Protection Field (WCAG Accessible hidden patterns) */}
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

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-name" className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
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
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    />
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-email" className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
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
                        placeholder="e.g., alexander@mercerholdings.com"
                        disabled={status === "submitting"}
                        className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-phone" className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
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
                        className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none focus-visible:ring-1 focus-visible:ring-gold"
                      />
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-date" className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
                      Preferred Tour Date
                    </label>
                    <input
                      type="date"
                      id="form-date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      disabled={status === "submitting"}
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none text-left focus-visible:ring-1 focus-visible:ring-gold"
                    />
                  </div>

                  {/* Private message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-message" className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
                      Private Inquiry Details
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify yacht berthing requirements or private helicopter arrival parameters if needed..."
                      disabled={status === "submitting"}
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none resize-none focus-visible:ring-1 focus-visible:ring-gold"
                    />
                  </div>

                  {/* GDPR Consent Checkbox (WCAG AA Compliance) */}
                  <div className="flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      disabled={status === "submitting"}
                      className="mt-1 w-4 h-4 border border-white/10 rounded-none bg-[#121212] checked:bg-gold checked:border-gold accent-gold text-gold cursor-pointer focus-visible:ring-1 focus-visible:ring-gold"
                    />
                    <label
                      htmlFor="consent"
                      className="text-[10px] text-white/40 leading-relaxed font-sans cursor-pointer hover:text-white/60 transition-colors select-none"
                    >
                      I consent to my contact details being processed in accordance with the{" "}
                      <Link href="/privacy" className="text-gold underline hover:text-[#E6D2A2]" target="_blank">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-gold underline hover:text-[#E6D2A2]" target="_blank">
                        Terms of Service
                      </Link>
                      .
                    </label>
                  </div>

                  {/* Submit Button (Standardized label: Book a Private Tour) */}
                  <button
                    type="submit"
                    disabled={status === "submitting" || !consentChecked}
                    className="group relative flex items-center justify-center gap-3 bg-gold hover:bg-gold-light disabled:bg-gold/40 disabled:text-[#0B0B0C]/40 disabled:cursor-not-allowed text-[#0B0B0C] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {status === "submitting" ? (
                      <>
                        Verifying Credentials
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Book a Private Tour
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Global Footer (Trust pages & copyrights) */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-[0.2em] text-[#444] select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            VILLA V CONCIERGE SECURE CHANNEL ENABLED
          </div>
          
          {/* Trust Policies Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-gold transition-colors">
              Cookies
            </Link>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer
            </Link>
          </div>

          <div>© 2026 VILLA V RESIDENCES. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </section>
  );
}
