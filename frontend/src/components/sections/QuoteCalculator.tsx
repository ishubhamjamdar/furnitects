'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react';
import CatalogGrid from './CatalogGrid';
import { createQuote, formatINR } from '@/lib/api';
import type { CatalogItem, DesignType, Quote } from '@/lib/types';
import { cn } from '@/lib/utils';

const dimensionsSchema = z.object({
  height: z.number().positive('Height must be positive'),
  width: z.number().positive('Width must be positive'),
  length: z.number().positive('Length must be positive'),
  unit: z.enum(['cm', 'inches']),
  materials: z.string().optional(),
  finish: z.string().optional(),
  description: z.string().optional(),
});

type DimensionsForm = z.infer<typeof dimensionsSchema>;

const STEPS = ['Select Design', 'Enter Dimensions', 'Your Quote'];

export default function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DimensionsForm>({
    resolver: zodResolver(dimensionsSchema),
    defaultValues: {
      height: 210,
      width: 120,
      length: 60,
      unit: 'cm',
      materials: 'standard',
      finish: 'standard',
      description: '',
    },
  });

  const handleSelect = (item: CatalogItem) => {
    setSelected(item);
    setError(null);
  };

  const goToDimensions = () => {
    if (!selected) {
      setError('Please select a wardrobe design first.');
      return;
    }
    setError(null);
    setStep(1);
  };

  const onSubmit = async (data: DimensionsForm) => {
    if (!selected) return;

    setLoading(true);
    setError(null);

    try {
      const result = await createQuote({
        designType: selected.id as DesignType,
        dimensions: {
          height: data.height,
          width: data.width,
          length: data.length,
          unit: data.unit,
        },
        customization: {
          materials: data.materials,
          finish: data.finish,
          description: data.description,
          addOns: [],
        },
      });
      setQuote(result);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate quote');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setSelected(null);
    setQuote(null);
    setError(null);
    form.reset();
  };

  return (
    <section id="quote" className="scroll-mt-20 bg-cream/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">Instant Quote</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy sm:text-4xl">
            Get your price in seconds
          </h2>
          <p className="mt-4 text-charcoal/80">
            No account or login needed — browse, enter dimensions, and get an instant quote.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mx-auto mt-10 flex max-w-lg items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  i < step
                    ? 'bg-emerald text-white'
                    : i === step
                      ? 'bg-navy text-white'
                      : 'bg-white text-charcoal/40'
                )}
              >
                {i < step ? <Check size={18} /> : i + 1}
              </div>
              <span className="mt-2 hidden text-xs font-medium text-charcoal/70 sm:block">{label}</span>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'absolute hidden h-0.5 w-full sm:block',
                    i < step ? 'bg-emerald' : 'bg-white'
                  )}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          {step === 0 && (
            <div>
              <CatalogGrid compact onSelect={handleSelect} selectedId={selected?.id} />
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={goToDimensions}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald px-8 py-3 font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 1 && selected && (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-6 rounded-xl bg-off-white p-4">
                <p className="text-sm text-charcoal/60">Selected design</p>
                <p className="font-heading text-lg font-semibold text-navy">{selected.name}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="height" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Height (H)
                  </label>
                  <input
                    id="height"
                    type="number"
                    step="0.1"
                    {...form.register('height', { valueAsNumber: true })}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  />
                  {form.formState.errors.height && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.height.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="width" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Width (W)
                  </label>
                  <input
                    id="width"
                    type="number"
                    step="0.1"
                    {...form.register('width', { valueAsNumber: true })}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  />
                  {form.formState.errors.width && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.width.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="length" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Length / Depth (L)
                  </label>
                  <input
                    id="length"
                    type="number"
                    step="0.1"
                    {...form.register('length', { valueAsNumber: true })}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  />
                  {form.formState.errors.length && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.length.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="unit" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Unit
                  </label>
                  <select
                    id="unit"
                    {...form.register('unit')}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  >
                    <option value="cm">Centimeters (cm)</option>
                    <option value="inches">Inches</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="materials" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Material
                  </label>
                  <select
                    id="materials"
                    {...form.register('materials')}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  >
                    <option value="standard">Standard (included)</option>
                    <option value="premium">Premium (+₹5,000)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="finish" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Finish
                  </label>
                  <select
                    id="finish"
                    {...form.register('finish')}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  >
                    <option value="standard">Standard (included)</option>
                    <option value="premium">Premium (+₹3,000)</option>
                  </select>
                </div>
              </div>

              {selected.id === 'custom' && (
                <div className="mt-6">
                  <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-charcoal">
                    Describe your custom design *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Describe your design idea — include details about layout, doors, shelving..."
                    {...form.register('description')}
                    className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  />
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 font-medium text-charcoal transition-colors hover:bg-off-white"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-3 font-semibold text-white transition-colors hover:bg-navy disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Get Instant Quote
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 2 && quote && (
            <div className="animate-fade-in-up">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                  <Check size={32} />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-bold text-navy">Your Instant Quote</h3>
                <p className="mt-1 text-sm text-charcoal/60">Quote ID: {quote.id.slice(0, 8).toUpperCase()}</p>
              </div>

              <div className="mt-8 space-y-3 rounded-xl bg-off-white p-6">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Design</span>
                  <span className="font-medium text-navy">{quote.designName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Dimensions</span>
                  <span className="font-medium text-navy">
                    {quote.dimensions.height} × {quote.dimensions.width} × {quote.dimensions.length}{' '}
                    {quote.dimensions.unit}
                  </span>
                </div>
                <div className="my-3 border-t border-cream" />
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">Base Price</span>
                  <span>{formatINR(quote.basePrice)}</span>
                </div>
                {quote.dimensionAdjustment !== 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Size Adjustment</span>
                    <span>
                      {quote.dimensionAdjustment > 0 ? '+' : ''}
                      {formatINR(quote.dimensionAdjustment)}
                    </span>
                  </div>
                )}
                {quote.customizationCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Customization</span>
                    <span>{formatINR(quote.customizationCharge)}</span>
                  </div>
                )}
                <div className="my-3 border-t border-charcoal/10" />
                <div className="flex justify-between font-heading text-xl font-bold text-navy">
                  <span>Total</span>
                  <span className="text-emerald">{formatINR(quote.totalPrice)}</span>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-charcoal/50">
                Quote valid until {new Date(quote.expiresAt).toLocaleDateString('en-IN')}. Confirm on WhatsApp to proceed.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={quote.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle size={20} />
                  Confirm on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-8 py-4 font-medium text-charcoal transition-colors hover:bg-off-white"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
