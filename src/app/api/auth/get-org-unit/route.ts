import { JWT } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Validate required environment variables
    if (!process.env.GOOGLE_ADMIN_SERVICE_ACCOUNT) {
      console.error('GOOGLE_ADMIN_SERVICE_ACCOUNT is not set');
      return NextResponse.json(
        { error: 'Google Admin service account not configured' },
        { status: 500, headers: getCacheHeaders('WRITE') },
      );
    }

    if (!process.env.GOOGLE_ADMIN_EMAIL) {
      console.error('GOOGLE_ADMIN_EMAIL is not set');
      return NextResponse.json(
        { error: 'Google Admin email not configured' },
        { status: 500, headers: getCacheHeaders('WRITE') },
      );
    }

    if (!process.env.GOOGLE_ADMIN_PRIVATE_KEY) {
      console.error('GOOGLE_ADMIN_PRIVATE_KEY is not set');
      return NextResponse.json(
        { error: 'Google Admin private key not configured' },
        { status: 500, headers: getCacheHeaders('WRITE') },
      );
    }

    const auth = new JWT({
      email: process.env.GOOGLE_ADMIN_SERVICE_ACCOUNT,
      subject: process.env.GOOGLE_ADMIN_EMAIL,
      key: process.env.GOOGLE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
      keyId: process.env.GOOGLE_ADMIN_KEY_ID,
      scopes: ['https://www.googleapis.com/auth/admin.directory.user.readonly'],
    });

    // Authorize the JWT client and get access token
    await auth.authorize();
    const tokenResponse = await auth.getAccessToken();
    const accessToken = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse?.token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token from JWT authorization');
    }

    // Make direct HTTP request to Google Admin API
    const response = await fetch(
      `https://admin.googleapis.com/admin/directory/v1/users/${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      let errorMessage = `Google Admin API error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const orgUnitPath = data.orgUnitPath;

    if (!orgUnitPath) {
      return NextResponse.json(
        { error: 'Organization unit path not found for user' },
        { status: 404, headers: getCacheHeaders('WRITE') },
      );
    }

    return NextResponse.json(
      { orgUnitPath },
      {
        headers: getCacheHeaders('USER'),
      },
    );
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`Error fetching org unit data for ${email}:`, message);

    if (message.includes('Login Required') || message.includes('401')) {
      return NextResponse.json(
        {
          error:
            'Google Admin API authentication failed. Check service account configuration and domain-wide delegation.',
          details: message,
        },
        { status: 401, headers: getCacheHeaders('WRITE') },
      );
    }

    return NextResponse.json(
      { error: message || 'Failed to fetch organization unit data' },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }
};
