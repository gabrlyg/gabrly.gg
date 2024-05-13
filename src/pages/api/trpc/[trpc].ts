import type { APIRoute } from 'astro';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../trpc/server';
import { createContext } from '../../../trpc/server/context';

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });
};
