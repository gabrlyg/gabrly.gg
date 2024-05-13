// @ts-nochcek
import { Client } from '@notionhq/client';
import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { ResinInWishlist } from '../../src/components/ResinCollection/type';

const NOTION_API_KEY = import.meta.env.NOTION_API_KEY!;

// TODO: typesafety for .env
const notion = new Client({ auth: NOTION_API_KEY });
const RESIN_WISHLIST_DB_ID = import.meta.env.NOTION_RESIN_WISHLIST_ID!;

export const getResinWishlist = async () => {
  const data = await notion.databases.query({
    database_id: RESIN_WISHLIST_DB_ID,
    sorts: [
      {
        property: 'Priority',
        direction: 'ascending',
      },
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
  });

  return data.results.map((listItem) => {
    const item = listItem as DatabaseObjectResponse;
    return {
      // TODO: type safety warnings
      name: item.properties.Name.title[0].plain_text || '',
      sculpt: item.properties.Sculpt.select.name || '',
      maker: item.properties.Maker.select.name || '',
      stem: item.properties.Stem.multi_select.map((item) => item.name) || [],
      thumbnail: item.properties.Thumbnail.files[0].file.url || '',
      priority: item.properties.Priority.select.name || '',
    } as ResinInWishlist;
  });
};
