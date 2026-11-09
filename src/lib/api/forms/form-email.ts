import {
  generalEmailAddress,
  groupEmailAddress,
  registerEmailAddress,
  rentalsEmailAddress,
} from '@/lib/constants/emailAddress';
import { Groups } from '@/lib/constants/enums/groups';
import { emailRegExValidation } from '@/lib/constants/regexValidation';

const FORM_EMAIL_RECIPIENTS = ['general', 'rentals', 'register', 'group'] as const;

const MAX_PAYLOAD_BYTES = 64 * 1024;
const MAX_FORM_DATA_ENTRIES = 100;
const MAX_LABEL_LENGTH = 200;
const MAX_TITLE_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;

type FormEmailRecipient = (typeof FORM_EMAIL_RECIPIENTS)[number];

type FormEmailDataPoint = {
  label: string;
  data: string;
};

type FormEmailPayload = {
  recipient: FormEmailRecipient;
  group?: Groups;
  formTitle: string;
  formData: FormEmailDataPoint[];
  replyTo?: string;
};

type ParseFormEmailPayloadOptions = {
  allowedRecipients?: readonly FormEmailRecipient[];
};

type ParseFormEmailPayloadResult =
  { ok: true; payload: FormEmailPayload } | { ok: false; error: string };

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasNoLineBreaks = (value: string): boolean => !/[\r\n]/.test(value);

const isScalar = (value: unknown): value is string | number | boolean =>
  ['string', 'number', 'boolean'].includes(typeof value);

const parseFormData = (value: unknown): FormEmailDataPoint[] | string => {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_FORM_DATA_ENTRIES) {
    return `formData must be a non-empty array of at most ${MAX_FORM_DATA_ENTRIES} entries`;
  }

  const dataPoints: FormEmailDataPoint[] = [];

  for (const entry of value) {
    if (!isObject(entry)) {
      return 'formData entries must be objects';
    }

    const { label, data } = entry;

    if (typeof label !== 'string' || label.trim().length === 0 || label.length > MAX_LABEL_LENGTH) {
      return `formData labels must be non-empty strings of at most ${MAX_LABEL_LENGTH} characters`;
    }

    if (!hasNoLineBreaks(label)) {
      return 'formData labels must not contain line breaks';
    }

    if (!isScalar(data)) {
      return 'formData values must be strings, numbers or booleans';
    }

    dataPoints.push({ label: label.trim(), data: String(data) });
  }

  return dataPoints;
};

/**
 * Validates an untrusted `POST /api/send-email` / `POST /api/register-member`
 * body. Only a recipient key, the rendered email content and an optional
 * Reply-To are accepted; the recipient address and the From header are
 * resolved server-side.
 */
const parseFormEmailPayload = (
  value: unknown,
  { allowedRecipients = FORM_EMAIL_RECIPIENTS }: ParseFormEmailPayloadOptions = {},
): ParseFormEmailPayloadResult => {
  if (!isObject(value)) {
    return { ok: false, error: 'body must be an object' };
  }

  if (JSON.stringify(value).length > MAX_PAYLOAD_BYTES) {
    return { ok: false, error: 'payload too large' };
  }

  const { recipient, group, formTitle, formData, replyTo } = value;

  if (typeof recipient !== 'string' || !FORM_EMAIL_RECIPIENTS.includes(recipient as never)) {
    return { ok: false, error: 'recipient is not a known key' };
  }

  if (!allowedRecipients.includes(recipient as FormEmailRecipient)) {
    return { ok: false, error: 'recipient is not allowed on this endpoint' };
  }

  if (
    typeof formTitle !== 'string' ||
    formTitle.trim().length === 0 ||
    formTitle.length > MAX_TITLE_LENGTH ||
    !hasNoLineBreaks(formTitle)
  ) {
    return {
      ok: false,
      error: `formTitle must be a non-empty string of at most ${MAX_TITLE_LENGTH} characters`,
    };
  }

  const parsedFormData = parseFormData(formData);

  if (typeof parsedFormData === 'string') {
    return { ok: false, error: parsedFormData };
  }

  if (recipient === 'group') {
    const groupValues: string[] = Object.values(Groups);

    if (typeof group !== 'string' || !groupValues.includes(group)) {
      return { ok: false, error: 'group must be a known group' };
    }
  }

  if (replyTo !== undefined) {
    if (
      typeof replyTo !== 'string' ||
      replyTo.length > MAX_EMAIL_LENGTH ||
      !emailRegExValidation.test(replyTo) ||
      !hasNoLineBreaks(replyTo)
    ) {
      return { ok: false, error: 'replyTo must be a valid email address' };
    }
  }

  return {
    ok: true,
    payload: {
      recipient: recipient as FormEmailRecipient,
      group: recipient === 'group' ? (group as Groups) : undefined,
      formTitle: formTitle.trim(),
      formData: parsedFormData,
      replyTo: replyTo as string | undefined,
    },
  };
};

/**
 * Maps the recipient key sent by the client to the only address the server is
 * willing to deliver to. The client can never supply the address itself.
 */
const resolveRecipientAddress = (payload: FormEmailPayload): string => {
  if (payload.recipient === 'group') {
    if (!payload.group) {
      throw new Error('group recipient requires a group');
    }

    return groupEmailAddress(payload.group);
  }

  switch (payload.recipient) {
    case 'rentals': {
      return rentalsEmailAddress;
    }
    case 'register': {
      return registerEmailAddress;
    }
    default: {
      return generalEmailAddress;
    }
  }
};

export { parseFormEmailPayload, resolveRecipientAddress, FORM_EMAIL_RECIPIENTS };
export type { FormEmailPayload, FormEmailRecipient, FormEmailDataPoint };
