import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkOrganisationPermission } from '@/lib/helpers/checkOrganisationPermission';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';
import { isValidOrgUnitPath } from '@/lib/helpers/getOrganisationRole';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export async function groupsMiddleware(req: NextRequest) {
  const token = await getToken({ req });
  const url: string = req.nextUrl.pathname;
  const origin = await getSiteUrl(req);

  const signInRedirect = NextResponse.redirect(`${origin}/api/auth/signin`);
  const unauthorizedRedirect = NextResponse.redirect(`${origin}/geen-toegang`);

  const getGroup = () => {
    const regex = new RegExp(`/dashboard/takken/(.*)`);
    const match = url.match(regex);
    if (!match) {
      return null;
    }
    return match[1];
  };

  if (!token) {
    return signInRedirect;
  }

  if (!token.email) {
    console.error('Token exists but email is missing');
    return unauthorizedRedirect;
  }

  try {
    const response = await fetch(
      `${origin}/api/auth/get-org-unit?email=${encodeURIComponent(token.email)}`,
    );

    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      console.error(`API response not OK: ${response.status} ${response.statusText}`);
      return unauthorizedRedirect;
    }

    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Unexpected content type: ${contentType}`);
      return unauthorizedRedirect;
    }

    const data = await response.json();

    if (!data?.orgUnitPath || !data.orgUnitPath.startsWith('/')) {
      console.error(`Invalid orgUnitPath: ${data?.orgUnitPath}`);
      return unauthorizedRedirect;
    }

    if (!isValidOrgUnitPath(data.orgUnitPath)) {
      console.error(`Invalid orgUnitPath: ${data.orgUnitPath} is not a valid OrganisationRoles`);
      return unauthorizedRedirect;
    }

    const group = getGroup();
    if (group && checkOrganisationPermission(data.orgUnitPath, `groups:${group}`)) {
      return NextResponse.next();
    }

    if (!group && checkOrganisationPermission(data.orgUnitPath, 'groups')) {
      return NextResponse.next();
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error(`Error fetching org unit data: ${errorMessage}`, error);
    return unauthorizedRedirect;
  }

  return unauthorizedRedirect;
}

export const groupsMiddlewareConfig = ['/dashboard/takken', '/dashboard/takken/(.*)'];
