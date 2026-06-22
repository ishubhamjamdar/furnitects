import type { CatalogResponse, Quote, QuoteRequest } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}

export async function getCatalog(): Promise<CatalogResponse> {
  return fetchApi<CatalogResponse>('/api/quotes/catalog');
}

export async function createQuote(data: QuoteRequest): Promise<Quote> {
  return fetchApi<Quote>('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildGeneralWhatsAppUrl(): string {
  const message = encodeURIComponent(
    'Hi Furnitects! I would like to know more about your custom wardrobes.'
  );
  return `https://wa.me/919881984488?text=${message}`;
}
