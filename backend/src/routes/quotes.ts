import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import {
  calculateQuote,
  getCatalogBasePrices,
  getDesignName,
  validateDimensions,
} from '../services/pricing';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../services/whatsapp';
import type { CatalogItem, DesignType, Quote } from '../types/quote';

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

export const quotesRouter = Router();

quotesRouter.get('/catalog', (_req: Request, res: Response) => {
  const prices = getCatalogBasePrices();
  const catalog: CatalogItem[] = (Object.keys(prices) as DesignType[])
    .filter((id) => id !== 'custom')
    .map((id) => ({
      id,
      name: getDesignName(id),
      description: CATALOG_DESCRIPTIONS[id],
      fromPrice: prices[id],
    }));

  res.json({ catalog, customDesign: {
    id: 'custom' as DesignType,
    name: getDesignName('custom'),
    description: CATALOG_DESCRIPTIONS.custom,
    fromPrice: prices.custom,
  }});
});

quotesRouter.post('/', (req: Request, res: Response) => {
  const parsed = quoteRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { designType, dimensions, customization, clientContact } = parsed.data;

  const dimensionError = validateDimensions(dimensions);
  if (dimensionError) {
    res.status(400).json({ error: dimensionError });
    return;
  }

  if (designType === 'custom' && !customization?.description?.trim()) {
    res.status(400).json({
      error: 'Custom design requires a description of your design idea',
    });
    return;
  }

  const breakdown = calculateQuote(designType, dimensions, customization);
  const now = new Date();
  const expiryHours = Number(process.env.QUOTE_EXPIRY_HOURS) || 24;
  const expiresAt = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);

  const quoteBase = {
    id: uuidv4(),
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

  res.status(201).json(quote);
});

quotesRouter.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;
  const quote = quoteStore.get(id);
  if (!quote) {
    res.status(404).json({ error: 'Quote not found' });
    return;
  }
  res.json(quote);
});

export { quoteStore };
