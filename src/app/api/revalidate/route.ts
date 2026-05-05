import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Models that feed into layout/navigation data (STATIC cache tier)
const STATIC_MODELS = new Set(['general', 'group', 'rental-location']);

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ ok: true });
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const secret = req.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, any>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const model: string = body.model ?? '';
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
