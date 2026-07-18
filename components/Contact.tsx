"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus("submitting");

    // Simulate luxury API submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#0E0E0E] overflow-hidden select-none border-t border-gold/5">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Contact details and Vetting disclaimer */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
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
                <div className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-4 h-4 stroke-[1.25]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Bespoke Offices</span>
                  <span className="text-sm text-white/80 font-light tracking-wide">
                    Avenue Princesse Grace, 98000 Monaco
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-4 h-4 stroke-[1.25]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Inquiries Desk</span>
                  <span className="text-sm text-white/80 font-light tracking-wide">
                    +377 93 25 80 00
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/15 bg-black/40 flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-4 h-4 stroke-[1.25]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#555] uppercase">Direct Email</span>
                  <span className="text-sm text-white/80 font-light tracking-wide">
                    concierge@villav-residence.com
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-5 border border-gold/10 glass-light bg-black/35 flex gap-4">
              <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/40 tracking-wider font-light leading-relaxed">
                By submitting this request, you agree to submit standard identity verification.
                All data is encrypted under military-grade privacy keys.
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
                      Your details have been transmitted. A concierge director will contact you via
                      secure channels within the hour.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs font-mono tracking-widest text-gold hover:text-gold-light underline cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono tracking-widest text-white/55 uppercase">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Alexander Mercer"
                      disabled={status === "submitting"}
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none"
                    />
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-mono tracking-widest text-white/55 uppercase">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., alexander@mercerholdings.com"
                        disabled={status === "submitting"}
                        className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-mono tracking-widest text-white/55 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., +33 6 1234 5678"
                        disabled={status === "submitting"}
                        className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono tracking-widest text-white/55 uppercase">Preferred Tour Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      disabled={status === "submitting"}
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none select-none text-left"
                    />
                  </div>

                  {/* Private message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono tracking-widest text-white/55 uppercase">Private Inquiry Details</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify yacht berthing requirements or private helicopter arrival parameters if needed..."
                      disabled={status === "submitting"}
                      className="w-full bg-[#121212] border border-white/5 focus:border-gold/50 px-4 py-3.5 text-xs text-white placeholder-white/20 rounded-none transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative flex items-center justify-center gap-3 bg-gold hover:bg-gold-light disabled:bg-gold/50 disabled:cursor-not-allowed text-[#0A0A0A] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 select-none cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        Verifying Credentials
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Submit Vetted Tour Request
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Global Footer (Technical details & copyrights) */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-[0.2em] text-[#444] select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            VILLA V CONCIERGE SECURE CHANNEL ENABLED
          </div>
          <div>© 2026 VILLA V RESIDENCES. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </section>
  );
}
