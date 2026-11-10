import { JWT } from 'google-auth-library';

const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
const GMAIL_SEND_ENDPOINT = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

type GmailConfig = {
  clientEmail: string;
  privateKey: string;
  keyId?: string;
  impersonatedUser: string;
  from: string;
};

class GmailSendError extends Error {
  status: number;

  body: string;

  constructor(status: number, body: string) {
    super(`Gmail API error ${status}: ${body}`);
    this.name = 'GmailSendError';
    this.status = status;
    this.body = body;
  }
}

const getGmailConfig = (): GmailConfig => {
  const clientEmail = process.env.GOOGLE_GMAIL_SERVICE_ACCOUNT;
  const privateKey = process.env.GOOGLE_GMAIL_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const impersonatedUser = process.env.GOOGLE_GMAIL_IMPERSONATE_EMAIL;
  const from = process.env.GOOGLE_GMAIL_FROM;

  if (!clientEmail || !privateKey || !impersonatedUser || !from) {
    throw new Error('Gmail credentials not configured');
  }

  return {
    clientEmail,
    privateKey,
    keyId: process.env.GOOGLE_GMAIL_KEY_ID,
    impersonatedUser,
    from,
  };
};

const getAccessToken = async ({
  clientEmail,
  privateKey,
  keyId,
  impersonatedUser,
}: GmailConfig): Promise<string> => {
  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    ...(keyId ? { keyId } : {}),
    subject: impersonatedUser,
    scopes: [GMAIL_SEND_SCOPE],
  });

  await auth.authorize();
  const tokenResponse = await auth.getAccessToken();
  const accessToken = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse?.token;

  if (!accessToken) {
    throw new Error('Failed to obtain access token for the Gmail API');
  }

  return accessToken;
};

/**
 * Sends a fully built RFC 5322 message (base64url encoded) through the Gmail
 * API as the impersonated Workspace user, and returns the Gmail message id.
 */
const sendGmailMessage = async (raw: string): Promise<string> => {
  const config = getGmailConfig();
  const accessToken = await getAccessToken(config);

  const response = await fetch(GMAIL_SEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    throw new GmailSendError(response.status, await response.text());
  }

  const result = (await response.json()) as { id?: string };

  if (!result.id) {
    throw new GmailSendError(response.status, 'Gmail response did not include a message id');
  }

  return result.id;
};

export { getGmailConfig, sendGmailMessage, GmailSendError };
export type { GmailConfig };
