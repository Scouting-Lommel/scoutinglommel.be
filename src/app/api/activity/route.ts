import { NextRequest, NextResponse } from 'next/server';
import { updateActivity, deleteActivity, createActivity } from '@/lib/api/activities/api';
import { getCacheHeaders } from '@/lib/api/cache';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { action, data } = await request.json();

  try {
    let result;
    switch (action) {
      case 'create':
        result = await createActivity(data);
        break;
      case 'update':
        result = await updateActivity(data);
        break;
      case 'delete':
        result = await deleteActivity(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Validate that the operation actually succeeded
    if (!result) {
      throw new Error(`Failed to ${action} activity: No result returned`);
    }

    return NextResponse.json(
      { success: true, data: result },
      {
        headers: getCacheHeaders('WRITE'),
      },
    );
  } catch (error) {
    console.error(`Activity API Error (${action}):`, error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: message || 'Unknown error occurred',
        action,
        data: data
          ? { ...data, groupDocumentId: data.groupDocumentId ? '[REDACTED]' : undefined }
          : undefined,
      },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }
};
