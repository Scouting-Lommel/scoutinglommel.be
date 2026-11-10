import { randomUUID } from 'node:crypto';

type MimeMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

const CRLF = '\r\n';
const MESSAGE_ID_DOMAIN = 'scoutinglommel.be';

// Header values must never contain raw line breaks: a newline in a value would
// let user-supplied text (subject, reply-to, names) inject extra headers.
const sanitiseHeaderValue = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

const isPrintableAscii = (value: string): boolean => /^[\x20-\x7E]*$/.test(value);

const encodeHeaderValue = (value: string): string =>
  isPrintableAscii(value) ? value : `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;

/**
 * Formats an address for a header, encoding only the display name when it
 * cannot be sent as ASCII: `Scouting Sint-Pieter Lommel <noreply@…>`.
 */
const formatAddress = (value: string): string => {
  const sanitised = sanitiseHeaderValue(value);
  const match = sanitised.match(/^(.*?)\s*<([^>]+)>$/);

  if (!match) {
    return sanitised;
  }

  const [, rawName, address] = match;
  const name = rawName.trim().replace(/^"(.*)"$/, '$1');

  if (!name) {
    return `<${address.trim()}>`;
  }

  const encodedName = /^[A-Za-z0-9 .,'&_-]+$/.test(name)
    ? name
    : `=?UTF-8?B?${Buffer.from(name, 'utf8').toString('base64')}?=`;

  return `${encodedName} <${address.trim()}>`;
};

const encodeBody = (value: string): string => {
  const base64 = Buffer.from(value, 'utf8').toString('base64');

  return base64.match(/.{1,76}/g)?.join(CRLF) ?? '';
};

/**
 * Builds an RFC 5322 message with a `text/plain` part first and an `text/html`
 * part second, base64 encoded, and returns it base64url encoded for the Gmail
 * API's `raw` field.
 */
const buildMimeMessage = ({ from, to, replyTo, subject, text, html }: MimeMessage): string => {
  const boundary = `----=_Part_${randomUUID()}`;

  const headers = [
    `From: ${formatAddress(from)}`,
    `To: ${formatAddress(to)}`,
    replyTo ? `Reply-To: ${formatAddress(replyTo)}` : undefined,
    `Subject: ${encodeHeaderValue(sanitiseHeaderValue(subject))}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${randomUUID()}@${MESSAGE_ID_DOMAIN}>`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter((header): header is string => !!header);

  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    encodeBody(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    encodeBody(html),
    `--${boundary}--`,
    '',
  ];

  const message = [...headers, '', ...body].join(CRLF);

  return Buffer.from(message, 'utf8').toString('base64url');
};

export { buildMimeMessage };
export type { MimeMessage };
