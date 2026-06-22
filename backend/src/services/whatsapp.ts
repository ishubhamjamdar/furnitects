import type { Quote } from '../types/quote';
import { formatCurrency, getDesignName } from './pricing';

const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '919881984488';

export function buildWhatsAppMessage(quote: Omit<Quote, 'whatsappUrl' | 'whatsappMessage'>): string {
  const { height, width, length, unit } = quote.dimensions;
  const designName = getDesignName(quote.designType);

  const lines = [
    `Hi! Here's my quote request for ${designName}:`,
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

export function getWhatsAppPhone(): string {
  return WHATSAPP_PHONE;
}

export function getGeneralWhatsAppUrl(): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hi Furnitects! I would like to know more about your custom wardrobes.'
  )}`;
}
