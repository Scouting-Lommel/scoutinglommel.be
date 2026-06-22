import { NextRequest, NextResponse } from 'next/server';
import { getCacheHeaders } from '@/lib/api/cache';
import { editLinks } from '@/lib/api/groups/api';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
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
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: getCacheHeaders('WRITE'),
      },
    );
  }
};
