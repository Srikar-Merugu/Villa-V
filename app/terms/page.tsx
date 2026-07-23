import Link from "next/link";

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        {/* Content */}
        <div className="font-sans text-sm text-[#E9E8E5]/80 leading-relaxed flex flex-col gap-8">
          <p className="text-xs text-[#C8A96A] font-mono tracking-widest uppercase">
            Effective Date: July 19, 2026
          </p>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              1. Scope of Terms
            </h2>
            <p>
              By accessing and exploring this digital architectural journey, you acknowledge that all renderings, technical specifications, and site floor plans are presented as design guidelines for the Villa V development project.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              2. Intellectual Property
            </h2>
            <p>
              All architectural blueprints, dynamic scroll-controlled cinematography, CAD structures, brand signatures, and text configurations are the exclusive intellectual property of the developers and partner studios. Unauthorized distribution or copying of these assets is strictly prohibited.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              3. Private Consultations and Applications
            </h2>
            <p>
              Submitting a tour request or consultation application does not constitute a binding transaction. All sales agreements, buyer deposits, and legal real estate transactions must be signed physically with certified legal counsel representing both parties.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              4. Governing Law
            </h2>
            <p>
              These Terms of Service and any transactional processes arising from property listings shall be governed by the laws and courts of the regional development authority where the site is legally registered.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
