import { randomUUID } from 'crypto';
import { z } from 'zod';
import type { CatalogItem, DesignType, Quote } from '@/lib/types';
import {
  calculateQuote,
  getCatalogBasePrices,
  getDesignName,
  validateDimensions,
} from '@/server/pricing';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/server/whatsapp';

const quoteStore = new Map<string, Quote>();

const designTypeSchema = z.enum([
  'hinged-2-door',
  'sliding-3-door',
  'walk-in',
  'modular',
  'custom',
]);

const quoteRequestSchema = z.object({
  designType: designTypeSchema,
  dimensions: z.object({
    height: z.number().positive(),
    width: z.number().positive(),
    length: z.number().positive(),
    unit: z.enum(['cm', 'inches']).default('cm'),
  }),
  customization: z
    .object({
      materials: z.string().optional(),
      finish: z.string().optional(),
      addOns: z.array(z.string()).optional(),
      description: z.string().optional(),
    })
    .optional(),
  clientContact: z.string().optional(),
});

const CATALOG_DESCRIPTIONS: Record<DesignType, string> = {
  'hinged-2-door': 'Classic swing-door wardrobe — ideal for compact bedrooms',
  'sliding-3-door': 'Space-saving sliding panels for larger storage needs',
  'walk-in': 'Open hanging rods & shelving for a dedicated space',
  modular: 'Flexible cube shelving — mix open & closed storage',
  custom: 'Send top, front & side views with full measurements',
};

export function getCatalogResponse() {
  const prices = getCatalogBasePrices();
  const catalog: CatalogItem[] = (Object.keys(prices) as DesignType[])
    .filter((id) => id !== 'custom')
    .map((id) => ({
      id,
      name: getDesignName(id),
      description: CATALOG_DESCRIPTIONS[id],
      fromPrice: prices[id],
    }));

  return {
    catalog,
    customDesign: {
      id: 'custom' as DesignType,
      name: getDesignName('custom'),
      description: CATALOG_DESCRIPTIONS.custom,
      fromPrice: prices.custom,
    },
  };
}

export function createQuoteFromRequest(body: unknown) {
  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
    };
  }

  const { designType, dimensions, customization, clientContact } = parsed.data;
  const dimensionError = validateDimensions(dimensions);
  if (dimensionError) {
    return { status: 400 as const, body: { error: dimensionError } };
  }

  if (designType === 'custom' && !customization?.description?.trim()) {
    return {
      status: 400 as const,
      body: { error: 'Custom design requires a description of your design idea' },
    };
  }

  const breakdown = calculateQuote(designType, dimensions, customization);
  const now = new Date();
  const expiryHours = Number(process.env.QUOTE_EXPIRY_HOURS) || 24;
  const expiresAt = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);

  const quoteBase = {
    id: randomUUID(),
    designType,
    designName: getDesignName(designType),
    dimensions,
    customization,
    basePrice: breakdown.basePrice,
    dimensionAdjustment: breakdown.dimensionAdjustment,
    customizationCharge: breakdown.customizationCharge,
    totalPrice: breakdown.totalPrice,
    currency: 'INR' as const,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    clientContact,
  };

  const whatsappMessage = buildWhatsAppMessage(quoteBase);
  const quote: Quote = {
    ...quoteBase,
    whatsappMessage,
    whatsappUrl: buildWhatsAppUrl(whatsappMessage),
  };

  quoteStore.set(quote.id, quote);
  return { status: 201 as const, body: quote };
}

export function getQuoteById(id: string) {
  const quote = quoteStore.get(id);
  if (!quote) return { status: 404 as const, body: { error: 'Quote not found' } };
  return { status: 200 as const, body: quote };
}
