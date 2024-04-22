import type { APIRoute } from 'astro';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { keyboards } from '../../../../db/schema';

export const GET: APIRoute = async ({ params }) => {
  if (params.keyboard) {
    const data = await db.query.keyboards.findFirst({
      where: eq(keyboards.id, parseInt(params.keyboard)),
      with: {
        imageKeyboards: {
          columns: {
            imageId: false,
            keyboardId: false,
          },
          with: {
            images: true,
          },
        },
      },
    });
    return new Response(
      JSON.stringify({
        keyboard: data,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  return new Response(
    JSON.stringify({
      message: 'A valid keyboard ID must be provided.',
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
