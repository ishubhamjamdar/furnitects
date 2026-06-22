'use client';

import { useEffect, useState } from 'react';
import { formatINR, getCatalog } from '@/lib/api';
import { CATALOG_FALLBACK, STYLE_ICONS } from '@/lib/constants';
import type { CatalogItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CatalogGridProps {
  onSelect?: (item: CatalogItem) => void;
  selectedId?: string;
  compact?: boolean;
}

export default function CatalogGrid({ onSelect, selectedId, compact = false }: CatalogGridProps) {
  const [items, setItems] = useState<CatalogItem[]>(CATALOG_FALLBACK);
  const [customDesign, setCustomDesign] = useState<CatalogItem>({
    id: 'custom',
    name: 'Custom Design',
    description: 'Send top, front & side views with full measurements',
    fromPrice: 35000,
  });

  useEffect(() => {
    getCatalog()
      .then((data) => {
        setItems(data.catalog);
        setCustomDesign(data.customDesign);
      })
      .catch(() => {
        /* use fallback */
      });
  }, []);

  const allItems = [...items, customDesign];

  const grid = (
        <div className={compact ? 'grid gap-4 sm:grid-cols-2' : 'mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
          {allItems.map((item) => {
            const isSelected = selectedId === item.id;
            const isCustom = item.id === 'custom';

            return (
              <article
                key={item.id}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-off-white transition-all duration-300',
                  isSelected
                    ? 'border-emerald shadow-lg shadow-emerald/10'
                    : 'border-transparent hover:border-cream hover:shadow-md',
                  isCustom && 'sm:col-span-2 lg:col-span-1'
                )}
              >
                <div
                  className={cn(
                    'flex h-40 items-center justify-center text-6xl',
                    isCustom
                      ? 'bg-gradient-to-br from-gold/20 to-emerald/20'
                      : 'bg-gradient-to-br from-navy/5 to-emerald/10'
                  )}
                >
                  {STYLE_ICONS[item.id] || '🪵'}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-semibold text-navy">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/75">
                    {item.description}
                  </p>
                  <p className="mt-4 font-heading text-lg font-bold text-emerald">
                    From {formatINR(item.fromPrice)}
                  </p>

                  {onSelect ? (
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      className={cn(
                        'mt-4 w-full rounded-full py-3 text-sm font-semibold transition-colors',
                        isSelected
                          ? 'bg-emerald text-white'
                          : 'bg-navy text-white hover:bg-emerald'
                      )}
                    >
                      {isSelected ? 'Selected' : 'Select Design'}
                    </button>
                  ) : (
                    <a
                      href="#quote"
                      className="mt-4 block w-full rounded-full bg-navy py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald"
                    >
                      Get Quote
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
  );

  if (compact) {
    return grid;
  }

  return (
    <section id="catalog" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">The Wardrobe Catalog</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy sm:text-4xl">
            Four core styles, ready to quote instantly
          </h2>
          <p className="mt-4 text-charcoal/80">
            Pick a ready-made design from our catalog — or share your own custom idea.
          </p>
        </div>

        {grid}

        <p className="mt-8 text-center text-xs text-charcoal/50">
          Pricing shown is illustrative — swap in the real cost sheet before external use.
        </p>
      </div>
    </section>
  );
}
