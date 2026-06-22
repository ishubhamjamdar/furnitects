import { NextResponse } from 'next/server';
import { getCatalogResponse } from '@/server/quotes';

export async function GET() {
  return NextResponse.json(getCatalogResponse());
}
