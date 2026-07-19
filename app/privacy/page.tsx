import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0B0B0C] text-[#E9E8E5] px-6 py-20 md:py-32 select-none">
      <div className="max-w-3xl mx-auto flex flex-col">
        {/* Navigation Link Back */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#C8A96A] font-sans font-semibold uppercase mb-12 hover:text-[#E6D2A2] transition-colors"
        >
          <span>←</span> Back to Experience
        </Link>

        {/* Header */}
        <h1 className="font-serif text-3xl md:text-5xl text-[#F6F3EB] font-light tracking-wide mb-12 leading-tight">
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="font-sans text-sm text-[#E9E8E5]/80 leading-relaxed flex flex-col gap-8">
          <p className="text-xs text-[#C8A96A] font-mono tracking-widest uppercase">
            Effective Date: July 19, 2026
          </p>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              1. Introduction
            </h2>
            <p>
              Villa V ("we," "our," "us") values the trust you place in us when sharing your personal information. This Privacy Policy describes how we collect, use, and protect your information when you browse our website and submit consultation inquiries.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              2. Information We Collect
            </h2>
            <p>
              When you submit a request through our private consultation forms, we collect information necessary to arrange your private viewing, including your full name, email address, telephone contact number, and organization or representative agency details.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              3. How Your Information is Used
            </h2>
            <p>
              Your contact details are processed solely to verify request authenticity and coordinate your private architectural site tours. We do not sell or trade your details to marketing agencies. Any communication is held strictly between our sales representatives and yourself.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              4. Data Retention and Security
            </h2>
            <p>
              Villa V is committed to ensuring your information remains secure. All transaction and inquiry details are encrypted in transit and stored within secure database environments behind restricted firewalls. We retain contact inquiries for no longer than 12 months unless a transaction contract is initiated.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              5. Your Rights (GDPR & International Standards)
            </h2>
            <p>
              In accordance with European and international privacy frameworks, you have the right to request a copy of the personal details we hold about you, request corrections, or request complete removal from our databases at any time by contacting our privacy compliance desk.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              6. Contact Details
            </h2>
            <p>
              For privacy audits or data erasure requests, please contact:
              <br />
              <span className="text-[#C8A96A] font-medium block mt-2">
                compliance@villa-v.com | +385 (0) 21 555 0199
              </span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
