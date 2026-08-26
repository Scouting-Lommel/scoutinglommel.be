import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';
import { isStagingOrgUnitAllowed } from '@/lib/helpers/getStagingAccess';

export const IS_STAGING =
  process.env.NEXT_PUBLIC_APP_ENV === 'staging' || process.env.APP_ENV === 'staging';

export async function stagingMiddleware(req: NextRequest): Promise<NextResponse | null> {
  if (!IS_STAGING) return null;

  if (req.method === 'OPTIONS') return null;

  const { pathname } = req.nextUrl;
  if (
    pathname === '/inloggen' ||
    pathname === '/geen-toegang' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/api/auth')
  ) {
    return null;
  }

  const token = await getToken({ req });
  const origin = await getSiteUrl(req);

  if (!token) {
    return NextResponse.redirect(
      `${origin}/inloggen?callbackUrl=${encodeURIComponent(pathname + req.nextUrl.search)}`,
    );
  }

  if (!token.email) {
    console.error('Staging gate: Token exists but email is missing');
    return NextResponse.redirect(`${origin}/geen-toegang`);
  }

  try {
    const response = await fetch(
      `${origin}/api/auth/get-org-unit?email=${encodeURIComponent(token.email)}`,
    );

    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      console.error(`Staging gate: API response not OK: ${response.status} ${response.statusText}`);
      return NextResponse.redirect(`${origin}/geen-toegang`);
    }

    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Staging gate: Unexpected content type: ${contentType}`);
      return NextResponse.redirect(`${origin}/geen-toegang`);
    }

    const data = await response.json();

    if (!data?.orgUnitPath || !data.orgUnitPath.startsWith('/')) {
      console.error(`Staging gate: Invalid orgUnitPath: ${data?.orgUnitPath}`);
      return NextResponse.redirect(`${origin}/geen-toegang`);
    }

    if (!isStagingOrgUnitAllowed(data.orgUnitPath)) {
      console.error(`Staging gate: Org unit not allowed for staging: ${data.orgUnitPath}`);
      return NextResponse.redirect(`${origin}/geen-toegang`);
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error(`Staging gate: Error fetching org unit data: ${errorMessage}`, error);
    return NextResponse.redirect(`${origin}/geen-toegang`);
  }

  return null;
}
