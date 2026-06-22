import { BRAND } from '@/lib/constants';
import { ArrowRight, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#2a3578] to-charcoal text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl animate-fade-in-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur-sm">
            <Clock size={14} className="text-gold" />
            Quoted in 60 minutes
          </p>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {BRAND.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">
            {BRAND.subheading}
          </p>

          <p className="mt-4 text-sm text-cream/70">
            Catalog or custom → specs → quote in 1 hour → confirm &amp; schedule → build &amp; deliver → check-in.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gold hover:text-navy"
            >
              Get a Quote Now
              <ArrowRight size={18} />
            </a>
            <a
              href="#catalog"
              className="inline-flex items-center justify-center rounded-full border-2 border-cream/40 px-8 py-4 text-base font-semibold text-cream transition-all hover:border-white hover:bg-white/10"
            >
              Explore Catalog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
