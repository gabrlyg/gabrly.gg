import type { APIRoute } from 'astro';
import { db } from '../../../../db/db';

export const GET: APIRoute = async ({ request }) => {
  const isCoverOnly =
    new URL(request.url).searchParams.get('coverOnly') === 'true';

  const data = await db.query.keyboards.findMany({
    with: {
      coverImg: true,
      imageKeyboards: isCoverOnly
        ? undefined
        : {
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

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
