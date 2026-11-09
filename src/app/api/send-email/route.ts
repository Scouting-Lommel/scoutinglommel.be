import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { parseFormEmailPayload } from '@/lib/api/forms/form-email';
import type { FormEmailRecipient } from '@/lib/api/forms/form-email';
import { handleCaptcha } from '@/lib/api/forms/handle-captcha';
import { handleSendEmail } from '@/lib/api/forms/handle-send-email';

const ALLOWED_RECIPIENTS: readonly FormEmailRecipient[] = ['general', 'rentals', 'group'];

const badRequest = (error: string): NextResponse =>
  NextResponse.json({ error }, { status: 400, headers: getCacheHeaders('WRITE') });

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  // Validate the payload before spending a Turnstile round trip: the recipient
  // key and the message shape are cheap to check and must never reach Gmail
  // unvalidated.
  const parsedPayload = parseFormEmailPayload(body, { allowedRecipients: ALLOWED_RECIPIENTS });

  if (!parsedPayload.ok) {
    return badRequest(parsedPayload.error);
  }

  const captchaToken =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>).captchaToken
      : undefined;

  if (typeof captchaToken !== 'string' || !captchaToken) {
    return badRequest('captchaToken is required');
  }

  const captchaResponse = await handleCaptcha(captchaToken);
  if (captchaResponse) {
    return captchaResponse;
  }

  const sendEmailResponse = await handleSendEmail(parsedPayload.payload);

  if (sendEmailResponse.status === 200) {
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      {
        status: 200,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }

  return sendEmailResponse;
};
