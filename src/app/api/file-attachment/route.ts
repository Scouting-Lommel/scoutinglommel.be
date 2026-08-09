import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { addFile } from '@/lib/api/groups/api';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';

type StrapiUploadFile = {
  id: number;
};

const getStrapiHeaders = (): { Authorization: string } => {
  const token = process.env.STRAPI_API_TOKEN;

  if (!token) {
    throw new Error('STRAPI_API_TOKEN is required');
  }

  return { Authorization: `Bearer ${token}` };
};

const deleteUploadFileByDocumentId = async (documentId: string): Promise<void> => {
  const backendUrl = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

  const lookupResponse = await fetch(
    `${backendUrl}/api/upload/files?filters[documentId][$eq]=${encodeURIComponent(documentId)}`,
    { headers: getStrapiHeaders() },
  );

  if (!lookupResponse.ok) {
    throw new Error(
      `Failed to look up file: ${lookupResponse.status} ${lookupResponse.statusText}`,
    );
  }

  const files: StrapiUploadFile[] = await lookupResponse.json();
  const file = files[0];

  if (!file) {
    throw new Error('File not found');
  }

  const deleteResponse = await fetch(`${backendUrl}/api/upload/files/${file.id}`, {
    method: 'DELETE',
    headers: getStrapiHeaders(),
  });

  if (!deleteResponse.ok) {
    throw new Error(`Failed to delete file: ${deleteResponse.status} ${deleteResponse.statusText}`);
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { action, data } = await request.json();

  try {
    switch (action) {
      case 'create':
        await addFile(data.id, data.files);
        break;
      case 'delete':
        if (typeof data !== 'string' || !data) {
          throw new Error('Invalid file id');
        }
        await deleteUploadFileByDocumentId(data);
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
