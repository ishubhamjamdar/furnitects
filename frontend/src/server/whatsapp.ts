import type { Quote } from '@/lib/types';
import { formatCurrency, getDesignName } from '@/server/pricing';

const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '919881984488';

type QuoteBase = Omit<Quote, 'whatsappUrl' | 'whatsappMessage'>;

export function buildWhatsAppMessage(quote: QuoteBase): string {
  const { height, width, length, unit } = quote.dimensions;
  const lines = [
    `Hi! Here's my quote request for ${getDesignName(quote.designType)}:`,
    '',
    `Dimensions: ${height} × ${width} × ${length} ${unit}`,
    `Base Price: ${formatCurrency(quote.basePrice)}`,
  ];

  if (quote.dimensionAdjustment !== 0) {
    const sign = quote.dimensionAdjustment > 0 ? '+' : '';
    lines.push(`Size Adjustment: ${sign}${formatCurrency(quote.dimensionAdjustment)}`);
  }
  if (quote.customizationCharge > 0) {
    lines.push(`Customization: ${formatCurrency(quote.customizationCharge)}`);
  }

  lines.push(
    `Total: ${formatCurrency(quote.totalPrice)}`,
    '',
    `Quote ID: ${quote.id}`,
    '',
    'Ready to proceed? I would like to confirm and choose my delivery date.'
  );

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
