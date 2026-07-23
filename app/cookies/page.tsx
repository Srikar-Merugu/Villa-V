import Link from "next/link";

export default function CookiePolicy() {
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
          Cookie Policy
        </h1>

        {/* Content */}
        <div className="font-sans text-sm text-[#E9E8E5]/80 leading-relaxed flex flex-col gap-8">
          <p className="text-xs text-[#C8A96A] font-mono tracking-widest uppercase">
            Effective Date: July 19, 2026
          </p>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when browsing websites. They are widely used to make websites work efficiently, save user preferences, and provide analytical details to site administrators.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              2. How We Use Cookies
            </h2>
            <p>
              We use only essential and performance-focused cookies:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong className="text-[#C8A96A]">Essential Cookies:</strong> Required to support smooth scroll states, video scrubbing cache, and layout hydration across browser reloads.
              </li>
              <li>
                <strong className="text-[#C8A96A]">Analytical Cookies:</strong> Provide aggregate, anonymous traffic details to analyze load performance and help optimize responsive dimensions.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-xl text-[#F6F3EB] font-light tracking-wide border-b border-white/10 pb-2">
              3. Managing Cookie Preferences
            </h2>
            <p>
              Most web browsers allow you to restrict, block, or delete cookies via your browser preference settings. Please note that disabling cookies completely may affect performance dynamics like smooth scroll responsiveness.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
