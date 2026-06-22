import FormDataLib from 'form-data';
import Mailgun from 'mailgun.js';
import type { MailgunMessageData } from 'mailgun.js/definitions';
import { NextResponse } from 'next/server';
import { Email } from '@/lib/helpers/sendEmail';

export const handleSendEmail = async (email: Email): Promise<NextResponse> => {
  if (!process.env.MAILGUN_API_KEY) {
    return NextResponse.json({ error: 'MAILGUN_API_KEY is not set' }, { status: 500 });
  }

  const mailgun = new Mailgun(FormDataLib);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: 'https://api.eu.mailgun.net',
  });

  try {
    await mg.messages.create('mg.scoutinglommel.be', email as MailgunMessageData);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error when sending email: ${error}` }, { status: 500 });
  }
};
