export type DesignType =
  | 'hinged-2-door'
  | 'sliding-3-door'
  | 'walk-in'
  | 'modular'
  | 'custom';

export type DimensionUnit = 'cm' | 'inches';

export interface Dimensions {
  height: number;
  width: number;
  length: number;
  unit: DimensionUnit;
}

export interface Customization {
  materials?: string;
  finish?: string;
  addOns?: string[];
  description?: string;
}

export interface CatalogItem {
  id: DesignType;
  name: string;
  description: string;
  fromPrice: number;
}

export interface Quote {
  id: string;
  designType: DesignType;
  designName: string;
  dimensions: Dimensions;
  customization?: Customization;
  basePrice: number;
  dimensionAdjustment: number;
  customizationCharge: number;
  totalPrice: number;
  currency: 'INR';
  createdAt: string;
  expiresAt: string;
  whatsappUrl: string;
  whatsappMessage: string;
}

export interface QuoteRequest {
  designType: DesignType;
  dimensions: Dimensions;
  customization?: Customization;
}

export interface CatalogResponse {
  catalog: CatalogItem[];
  customDesign: CatalogItem;
}
