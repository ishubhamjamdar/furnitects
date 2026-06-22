import { PROCESS_STEPS } from '@/lib/constants';
import {
  CalendarCheck,
  ClipboardList,
  Hammer,
  MessageSquare,
  PackageSearch,
  Smile,
} from 'lucide-react';

const ICONS = [
  PackageSearch,
  ClipboardList,
  MessageSquare,
  CalendarCheck,
  Hammer,
  Smile,
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">How It Works</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy sm:text-4xl">
            From click to delivery — the full journey
          </h2>
          <p className="mt-4 text-charcoal/80">
            Six steps, start to finish. Same playbook, every order.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-emerald via-gold to-navy md:left-1/2 md:block md:-translate-x-px" />

          <div className="space-y-12">
            {PROCESS_STEPS.map((item, index) => {
              const Icon = ICONS[index];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`rounded-2xl bg-off-white p-6 transition-shadow hover:shadow-md ${
                        isEven ? 'md:mr-12' : 'md:ml-12'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-gold">
                        Step {item.step}
                      </span>
                      <h3 className="mt-1 font-heading text-xl font-semibold text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-emerald">{item.description}</p>
                      <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{item.detail}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex shrink-0 items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-4 ring-white">
                      <Icon size={28} className="text-gold" />
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-navy p-8 text-center text-white">
          <p className="font-heading text-5xl font-bold text-gold">60</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-cream/80">Minutes</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/90">
            Maximum time from receiving specs to sending a confirmed price quote on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
