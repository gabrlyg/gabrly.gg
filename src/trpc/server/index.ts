import { publicProcedure, router } from './trpc';
import * as notionDB from '../../../db/notion/notionDB';

export const appRouter = router({
  resinWishlist: publicProcedure.query(async () => {
    try {
      return await notionDB.getResinWishlist();
    } catch (err) {
      console.error('Error calling Notion API:', err);
      throw err;
    }
  }),
});

export type AppRouter = typeof appRouter;
