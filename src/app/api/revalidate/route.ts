import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ ok: true });
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const expectedSecret = process.env.REVALIDATE_SECRET ?? '';
  const providedSecret = req.headers.get('x-revalidate-secret') ?? '';

  const expectedBuffer = Buffer.from(expectedSecret);
  const providedBuffer = Buffer.from(providedSecret);

  const isSecretValid =
    expectedBuffer.length > 0 &&
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer);

  if (!isSecretValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // CMS responses are always fetched fresh (see src/api/strapi.ts), so there is
  // no cache to invalidate. Acknowledge so Strapi's webhook config keeps working.
  return NextResponse.json({ ok: true });
};
