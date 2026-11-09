import type { FormEmailPayload } from '@/lib/api/forms/form-email';

type SendEmailResponse = {
  message: unknown;
  status: number;
};

type SendEmailProps = {
  payload: FormEmailPayload;
  callback: (response: SendEmailResponse) => void;
  captchaToken: string;
};

/**
 * Sends a form notification to the server, which resolves the recipient and
 * sends it through the Gmail API. The browser never supplies the From or To
 * address.
 */
const sendEmail = async ({ payload, callback, captchaToken }: SendEmailProps): Promise<void> => {
  const emailRequest = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload, captchaToken }),
  });

  const emailResponse = { message: await emailRequest.json(), status: emailRequest.status };

  callback(emailResponse);
};

export { sendEmail };
