import { NextResponse } from 'next/server';
import { getQuoteById } from '@/server/quotes';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = getQuoteById(id);
  return NextResponse.json(result.body, { status: result.status });
}
