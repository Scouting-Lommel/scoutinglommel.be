import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { parseFormEmailPayload } from '@/lib/api/forms/form-email';
import type { FormEmailRecipient } from '@/lib/api/forms/form-email';
import { handleCaptcha } from '@/lib/api/forms/handle-captcha';
import { handleSendEmail } from '@/lib/api/forms/handle-send-email';
import { registerMemberWithGoogleSheets } from '@/lib/api/register/api';
import type { RegisterMemberData } from '@/lib/api/register/api';

const ALLOWED_RECIPIENTS: readonly FormEmailRecipient[] = ['register'];

const REQUIRED_MEMBER_FIELDS = [
  'firstName',
  'lastName',
  'birthday',
  'gender',
  'telephoneNumber',
  'email',
  'address',
  'postalCode',
  'city',
  'comments',
  'workingYear',
] as const;

const parseRegisterMemberData = (value: unknown): RegisterMemberData | null => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }

  const member = value as Record<string, unknown>;

  const hasRequiredFields = REQUIRED_MEMBER_FIELDS.every(
    (field) => typeof member[field] === 'string' && member[field] !== '',
  );

  if (!hasRequiredFields) {
    return null;
  }

  if (member.memberGroup !== undefined && typeof member.memberGroup !== 'string') {
    return null;
  }

  return member as RegisterMemberData;
};

const badRequest = (error: string): NextResponse =>
  NextResponse.json({ error }, { status: 400, headers: getCacheHeaders('WRITE') });

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  const parsedPayload = parseFormEmailPayload(body, { allowedRecipients: ALLOWED_RECIPIENTS });

  if (!parsedPayload.ok) {
    return badRequest(parsedPayload.error);
  }

  const { captchaToken, member } =
    typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};

  if (typeof captchaToken !== 'string' || !captchaToken) {
    return badRequest('captchaToken is required');
  }

  const memberData = parseRegisterMemberData(member);

  if (!memberData) {
    return badRequest('member is incomplete');
  }

  const captchaResponse = await handleCaptcha(captchaToken);
  if (captchaResponse) {
    return captchaResponse;
  }

  try {
    await registerMemberWithGoogleSheets(memberData);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Something went wrong while registering member.' },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }

  const sendEmailResponse = await handleSendEmail(parsedPayload.payload);

  if (sendEmailResponse.status === 200) {
    return NextResponse.json(
      { success: true, message: 'Member registered successfully' },
      {
        status: 200,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }

  return sendEmailResponse;
};
