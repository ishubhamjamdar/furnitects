import { VALUE_PROPS, WHY_FURNITECTS } from '@/lib/constants';
import { Clock, Heart, Route, Tag, TrendingUp, Wallet, Award } from 'lucide-react';

const VALUE_ICONS = {
  route: Route,
  clock: Clock,
  heart: Heart,
  tag: Tag,
};

const WHY_ICONS = [TrendingUp, Wallet, Award];

export default function WhyFurnitects() {
  return (
    <>
      <section className="bg-cream/30 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald">Why This Works</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy sm:text-4xl">
              Why this process works for us
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop) => {
              const Icon = VALUE_ICONS[prop.icon as keyof typeof VALUE_ICONS];
              return (
                <div
                  key={prop.title}
                  className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{prop.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-20 bg-navy py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">Why Furnitects</p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Big-brand looks, smaller price tag
            </h2>
            <p className="mt-4 text-cream/80">
              Match the styles people already want, beat the price they&apos;re used to paying.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {WHY_FURNITECTS.map((item, index) => {
              const Icon = WHY_ICONS[index];
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
