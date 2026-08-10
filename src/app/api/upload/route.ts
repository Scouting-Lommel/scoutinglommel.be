import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { checkOrganisationPermission } from '@/lib/helpers/checkOrganisationPermission';
import { getAuthorizedOrgUnit } from '@/lib/helpers/getAuthorizedOrgUnit';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';

const STRAPI_BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const STRAPI_UPLOAD_TOKEN = process.env.STRAPI_UPLOAD_FILE_TOKEN;

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

  try {
    if (!STRAPI_BACKEND_URL || !STRAPI_UPLOAD_TOKEN) {
      throw new Error('Upload backend URL or token is not configured');
    }

    const formData = await request.formData();

    const strapiResponse = await fetch(`${STRAPI_BACKEND_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRAPI_UPLOAD_TOKEN}`,
      },
      body: formData,
    });

    if (!strapiResponse.ok) {
      throw new Error(
        `Strapi upload failed: ${strapiResponse.status} ${strapiResponse.statusText}`,
      );
    }

    const result = await strapiResponse.json();

    return NextResponse.json(result, {
      status: 200,
      headers: getCacheHeaders('WRITE'),
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }
};
