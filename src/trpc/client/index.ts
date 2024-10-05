import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { createCallerFactory } from '../server/trpc';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  // if (import.meta.env.VERCEL_URL) {
  //   return `https://${import.meta.env.VERCEL_URL}`;
  // }

  // TODO: Replace the above with Netlify

  return `http://localhost:${import.meta.env.PORT ?? 4321}`;
};

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export { trpc };
