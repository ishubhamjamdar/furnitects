import { NextResponse } from 'next/server';
import { createQuoteFromRequest } from '@/server/quotes';

export async function POST(request: Request) {
  const body = await request.json();
  const result = createQuoteFromRequest(body);
  return NextResponse.json(result.body, { status: result.status });
}
