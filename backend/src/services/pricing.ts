import type { DesignType, Dimensions, Customization, PriceBreakdown } from '../types/quote';

/**
 * Mock pricing engine — replace with real cost sheet logic.
 * Uses reference dimensions (cm) and scales price by volume ratio.
 */

const REFERENCE_VOLUME_CM3 = 210 * 120 * 60; // ~1.5m H × 1.2m W × 0.6m L

const BASE_PRICES: Record<DesignType, number> = {
  'hinged-2-door': Number(process.env.PRICE_HINGED_2_DOOR) || 18000,
  'sliding-3-door': Number(process.env.PRICE_SLIDING_3_DOOR) || 32000,
  'walk-in': Number(process.env.PRICE_WALK_IN) || 65000,
  modular: Number(process.env.PRICE_MODULAR) || 22000,
  custom: Number(process.env.PRICE_CUSTOM_BASE) || 35000,
};

const DESIGN_NAMES: Record<DesignType, string> = {
  'hinged-2-door': 'Hinged 2-Door',
  'sliding-3-door': 'Sliding 3-Door',
  'walk-in': 'Walk-In Layout',
  modular: 'Modular Open Shelving',
  custom: 'Custom Design',
};

const DIMENSION_LIMITS = {
  cm: { min: 50, max: 400 },
  inches: { min: 20, max: 160 },
};

export function getDesignName(designType: DesignType): string {
  return DESIGN_NAMES[designType];
}

export function getCatalogBasePrices(): Record<DesignType, number> {
  return { ...BASE_PRICES };
}

export function validateDimensions(dimensions: Dimensions): string | null {
  const limits = DIMENSION_LIMITS[dimensions.unit];
  const fields = [
    { name: 'height', value: dimensions.height },
    { name: 'width', value: dimensions.width },
    { name: 'length', value: dimensions.length },
  ];

  for (const field of fields) {
    if (!Number.isFinite(field.value) || field.value <= 0) {
      return `${field.name} must be a positive number`;
    }
    if (field.value < limits.min || field.value > limits.max) {
      return `${field.name} must be between ${limits.min} and ${limits.max} ${dimensions.unit}`;
    }
  }
  return null;
}

function toCm(value: number, unit: Dimensions['unit']): number {
  return unit === 'inches' ? value * 2.54 : value;
}

function computeVolumeCm3(dimensions: Dimensions): number {
  const h = toCm(dimensions.height, dimensions.unit);
  const w = toCm(dimensions.width, dimensions.unit);
  const l = toCm(dimensions.length, dimensions.unit);
  return h * w * l;
}

function computeCustomizationCharge(customization?: Customization): number {
  if (!customization) return 0;

  let charge = 0;

  if (customization.materials && customization.materials !== 'standard') {
    charge += 5000;
  }
  if (customization.finish && customization.finish !== 'standard') {
    charge += 3000;
  }
  if (customization.addOns?.length) {
    charge += customization.addOns.length * 2500;
  }
  if (customization.description && customization.description.trim().length > 0) {
    charge += 4000; // custom design complexity surcharge
  }

  return charge;
}

export function calculateQuote(
  designType: DesignType,
  dimensions: Dimensions,
  customization?: Customization
): PriceBreakdown {
  const basePrice = BASE_PRICES[designType];
  const volume = computeVolumeCm3(dimensions);
  const volumeRatio = volume / REFERENCE_VOLUME_CM3;

  // Scale between 0.75× and 2.5× based on volume vs reference
  const clampedRatio = Math.min(Math.max(volumeRatio, 0.75), 2.5);
  const dimensionAdjustment = Math.round(basePrice * (clampedRatio - 1));
  const customizationCharge = computeCustomizationCharge(customization);
  const totalPrice = basePrice + dimensionAdjustment + customizationCharge;

  return {
    basePrice,
    dimensionAdjustment,
    customizationCharge,
    totalPrice: Math.max(totalPrice, basePrice),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
