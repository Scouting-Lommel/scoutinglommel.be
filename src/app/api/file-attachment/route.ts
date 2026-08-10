import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { addFile } from '@/lib/api/groups/api';
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

  const { action, data } = await request.json();

  try {
    switch (action) {
      case 'create':
        await addFile(data.id, data.files);
        break;
      case 'delete':
        if (typeof data?.id !== 'string' || !Array.isArray(data.files)) {
          throw new Error('Invalid file data');
        }
        await addFile(data.id, data.files);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          {
            status: 400,
            headers: getCacheHeaders('WRITE'),
          },
        );
    }
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
