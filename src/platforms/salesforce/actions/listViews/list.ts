import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from '../../constants';
import { getNextCursor } from '../utils';

export default action(
  'list-list-views',
  {
    operation: 'list',
    resource: 'list-views',
    mutation: false,
    schema: z.object({
      cursor: z.number(),
      objectType: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const resp = await client.listViews.list(auth, {
      cursor: input.cursor,
      objectType: input.objectType,
      limit: MAX_QUERY_PAGE_SIZE,
    });
    return {
      ...resp,
      nextCursor: getNextCursor({
        records: resp.records,
        limit: MAX_QUERY_PAGE_SIZE,
      }),
    };
  },
);
