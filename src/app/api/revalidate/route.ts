import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

type RevalidateWebhookBody = {
  model?: string;
  uid?: string;
  entry?: {
    slug?: string;
    documentId?: string;
  };
};

// Models that feed into layout/navigation data (STATIC cache tier)
// Strapi sends either the singular model name (e.g. "general-data") or the full
// uid (e.g. "api::general-data.general-data"), so we normalize before matching.
const STATIC_MODELS = new Set(['general-data', 'group', 'rental-location']);

const normalizeModel = (raw?: string): string => {
  if (!raw) return '';

  // uid format: api::general-data.general-data -> general-data
  if (raw.includes('::')) {
    const parts = raw.split('.');
    return parts[parts.length - 1] ?? raw;
  }

  return raw;
};

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

  let body: RevalidateWebhookBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const model = normalizeModel(body.model ?? body.uid);
  const slug: string | undefined = body.entry?.slug;

  if (STATIC_MODELS.has(model)) {
    revalidateTag('static-data');
  }

  revalidateTag('dynamic-data');

  // Bust the full route cache for pre-built slug pages
  if (model === 'group') {
    if (slug) {
      revalidatePath(`/takken/${slug}`, 'page');
    } else {
      revalidatePath('/takken', 'layout');
    }
  } else if (model === 'rental-location') {
    if (slug) {
      revalidatePath(`/verhuur/${slug}`, 'page');
    } else {
      revalidatePath('/verhuur', 'layout');
    }
  }

  return NextResponse.json({ revalidated: true, model, slug });
};
