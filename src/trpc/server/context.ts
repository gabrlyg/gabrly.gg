import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createContext = ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => {
  return { req, resHeaders };
};

export type Context = inferAsyncReturnType<typeof createContext>;
