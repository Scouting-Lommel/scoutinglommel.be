import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { deleteFile } from '@/lib/api/files/api';
import { addFile } from '@/lib/api/groups/api';
import { getErrorMessage } from '@/lib/helpers/getErrorMessage';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { action, data } = await request.json();

  try {
    switch (action) {
      case 'create':
        await addFile(data.id, data.files);
        break;
      case 'delete':
        await deleteFile(data);
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
