import { noreplyEmailAddress } from '@/lib/constants/emailAddress';
import { renderEmail } from '@/emails/helpers/render-email';
import { FormSubmissionEmail } from '@/emails/templates/form-submission';

export type Email = {
  from: string;
  to: string[];
  cc?: string;
  bcc?: string;
  'h:Reply-To'?: string;
  subject?: string;
  text?: string;
  html?: string;
};

type FormDataEntry = {
  label: string;
  data: unknown;
};

type GenerateEmailProps = {
  formData: FormDataEntry[];
  formTitle: string;
  to: string;
  replyTo?: string;
  cc?: string;
  bcc?: string;
};

type SendEmailResponse = {
  message: unknown;
  status: number;
};

type SendEmailProps = {
  email: Email;
  callback: (response: SendEmailResponse) => void;
  captchaToken: string;
};

/**
 * Generates an email object with HTML content based on the provided form data.
 *
 * @param {GenerateEmailProps} params - The properties required to generate the email.
 * @param {Object} params.formData - The form data to be included in the email body.
 * @param {string} params.formTitle - The title of the form, used as the email subject and in the email body.
 * @param {string} params.to - The recipient email address.
 * @param {string} [params.replyTo] - The reply-to email address.
 * @param {string} [params.cc] - The CC email addresses.
 * @param {string} [params.bcc] - The BCC email addresses.
 * @returns {Email} The generated email object.
 */
const generateEmail = async ({
  formData,
  formTitle,
  to,
  replyTo,
  cc,
  bcc,
}: GenerateEmailProps): Promise<Email> => {
  const emailBody = await renderEmail(
    <FormSubmissionEmail formTitle={formTitle} formData={formData} />,
  );

  const email: Email = {
    from: noreplyEmailAddress,
    to: [process.env.NEXT_PUBLIC_EMAIL_DEV_OVERRIDE || to],
    subject: formTitle,
    html: emailBody,
  };

  if (replyTo) email['h:Reply-To'] = replyTo;
  if (cc) email.cc = cc;
  if (bcc) email.bcc = bcc;

  return email;
};

/**
 * Sends an email using the provided email address and captcha token.
 *
 * @param {Object} params - The parameters for sending the email.
 * @param {string} params.email - The email address to send the email to.
 * @param {Function} params.callback - The callback function to handle the response.
 * @param {string} params.captchaToken - The captcha token for verification.
 *
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 */
const sendEmail = async ({ email, callback, captchaToken }: SendEmailProps): Promise<void> => {
  const emailRequestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, captchaToken }),
  };

  const emailRequest = await fetch('/api/send-email', emailRequestData);
  const emailResponse = { message: await emailRequest.json(), status: emailRequest.status };

  callback(emailResponse);
};

export { sendEmail, generateEmail };
