import Link from "next/link";

export default function LegalDisclaimer() {
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
          Legal Disclaimer
        </h1>

        {/* Content */}
        <div className="font-sans text-sm text-[#E9E8E5]/80 leading-relaxed flex flex-col gap-8">
          <p className="text-xs text-[#C8A96A] font-mono tracking-widest uppercase">
            Effective Date: July 19, 2026
          </p>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              1. General Information Only
            </h2>
            <p>
              All materials, layouts, images, and dimensions regarding the Villa V construction project are presented for marketing and illustrative purposes only. They do not constitute an offer, warranty, or contractual claim.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              2. Accuracy of Plans and Specifications
            </h2>
            <p>
              Renderings are artistic impressions. Architectural drawings, materials, landscaping plans, and structural fittings may evolve or change during construction to satisfy development regulations or supplier availability. Final specifications will be governed by physical, notarized buyer contracts.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              3. View Lines and Landscaping
            </h2>
            <p>
              Ocean views, surrounding vistas, and outdoor landscape maturity reflect computer generated designs. Actual view windows may vary depending on weather conditions, seasonal sun coordinates, and local environmental developments.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
