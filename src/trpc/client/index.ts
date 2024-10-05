import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { createCallerFactory } from '../server/trpc';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }

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
