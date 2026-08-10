import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { editLinks } from '@/lib/api/groups/api';
import { checkOrganisationPermission } from '@/lib/helpers/checkOrganisationPermission';
import { getAuthorizedOrgUnit } from '@/lib/helpers/getAuthorizedOrgUnit';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const orgUnit = await getAuthorizedOrgUnit(request);
  if (!orgUnit || !checkOrganisationPermission(orgUnit, 'groups')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }

  const { data } = await request.json();

  try {
    await editLinks(data.id, data.links);
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: getCacheHeaders('WRITE'),
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }
};
