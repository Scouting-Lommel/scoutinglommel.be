import { NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { resolveRecipientAddress } from '@/lib/api/forms/form-email';
import type { FormEmailPayload } from '@/lib/api/forms/form-email';
import { sendGmailMessage } from '@/lib/services/gmail';
import { buildMimeMessage } from '@/lib/services/mime';
import { renderEmail, renderEmailText } from '@/emails/helpers/render-email';
import { FormSubmissionEmail } from '@/emails/templates/form-submission';

/**
 * Renders the notification template and sends it through the Gmail API. The
 * From header and the recipient address are resolved server-side; the caller
 * only supplies content.
 */
export const handleSendEmail = async (payload: FormEmailPayload): Promise<NextResponse> => {
  const from = process.env.GOOGLE_GMAIL_FROM;

  if (!from) {
    console.error('GOOGLE_GMAIL_FROM is not set, cannot send form notifications');

    return NextResponse.json(
      { error: 'Email is not configured' },
      { status: 500, headers: getCacheHeaders('WRITE') },
    );
  }

  try {
    const email = <FormSubmissionEmail formTitle={payload.formTitle} formData={payload.formData} />;
    const [html, text] = await Promise.all([renderEmail(email), renderEmailText(email)]);

    const raw = buildMimeMessage({
      from,
      to: process.env.NEXT_PUBLIC_EMAIL_DEV_OVERRIDE || resolveRecipientAddress(payload),
      replyTo: payload.replyTo,
      subject: payload.formTitle,
      text,
      html,
    });

    await sendGmailMessage(raw);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200, headers: getCacheHeaders('WRITE') },
    );
  } catch (error) {
    console.error('Error when sending email through the Gmail API:', error);

    return NextResponse.json(
      { error: 'Error when sending email' },
      { status: 502, headers: getCacheHeaders('WRITE') },
    );
  }
};
