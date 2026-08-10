import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';
import { isValidOrgUnitPath, OrganisationRoles } from '@/lib/helpers/getOrganisationRole';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

/**
 * Resolves the authenticated caller's organisation unit path.
 *
 * Mirrors the lookup performed by `groupsMiddleware`: reads the NextAuth
 * session token from the request cookies and resolves its org unit via the
 * Google Admin API (`/api/auth/get-org-unit`).
 *
 * @param req - The incoming request (its cookies carry the session token).
 * @returns The org unit path (e.g. `/Leiding/Kapoenen`) or `null` when the
 * caller is not authenticated or the org unit cannot be resolved.
 */
export async function getAuthorizedOrgUnit(req: NextRequest): Promise<OrganisationRoles | null> {
  const token = await getToken({ req });

  if (!token?.email) {
    return null;
  }

  try {
    const origin = await getSiteUrl(req);
    const response = await fetch(
      `${origin}/api/auth/get-org-unit?email=${encodeURIComponent(token.email)}`,
    );

    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      console.error(`getAuthorizedOrgUnit: API response not OK: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (!data?.orgUnitPath || !data.orgUnitPath.startsWith('/')) {
      console.error(`getAuthorizedOrgUnit: Invalid orgUnitPath: ${data?.orgUnitPath}`);
      return null;
    }

    if (!isValidOrgUnitPath(data.orgUnitPath)) {
      console.error(`getAuthorizedOrgUnit: Invalid orgUnitPath: ${data.orgUnitPath}`);
      return null;
    }

    return data.orgUnitPath;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(`getAuthorizedOrgUnit: Error fetching org unit data: ${errorMessage}`, error);
    return null;
  }
}
