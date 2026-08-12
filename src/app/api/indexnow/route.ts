import { NextRequest, NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';
import { timingSafeEqual } from 'node:crypto';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

type IndexNowBody = {
  urlList: string[];
};

const hasValidSecret = (provided: string, expected: string): boolean => {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  return (
    expectedBuffer.length > 0 &&
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ ok: true });
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  // Same auth as the revalidate webhook so only trusted callers can submit URLs
  const expectedSecret = process.env.REVALIDATE_SECRET ?? '';
  const providedSecret = req.headers.get('x-revalidate-secret') ?? '';

  if (!hasValidSecret(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: IndexNowBody | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const urlList = Array.isArray(body.urlList)
    ? body.urlList.filter((url): url is string => typeof url === 'string')
    : [];
  if (!urlList.length) {
    return NextResponse.json({ error: 'urlList is required' }, { status: 400 });
  }

  const key = process.env.INDEXNOW_KEY ?? '';
  if (!key) {
    return NextResponse.json({ error: 'INDEXNOW_KEY is not configured' }, { status: 500 });
  }

  const siteUrl = await getSiteUrl();
  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${key}.txt`;

  // Only accept URLs that belong to this site to prevent abuse of the key
  const validUrls = urlList.filter((url) => {
    try {
      return new URL(url).host === host;
    } catch {
      return false;
    }
  });

  if (!validUrls.length) {
    return NextResponse.json({ error: 'No valid URLs for this host' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  let indexNowResponse: Response;
  try {
    indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: validUrls }),
      signal: AbortSignal.any([req.signal, controller.signal]),
    });
  } catch (error) {
    const isTimeout = controller.signal.aborted;
    return NextResponse.json(
      { error: isTimeout ? 'IndexNow request timed out' : 'IndexNow request failed' },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }

  // 200 = submitted, 202 = already submitted recently; both are success
  const isSuccess = indexNowResponse.ok || indexNowResponse.status === 202;

  return NextResponse.json(
    { submitted: isSuccess, status: indexNowResponse.status },
    { status: isSuccess ? 200 : 502 },
  );
};
