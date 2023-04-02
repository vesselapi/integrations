import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from '../../constants';
import { getNextCursor } from '../utils';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: z.object({
      cursor: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const resp = await client.users.list(auth, {
      cursor: input.cursor,
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
