import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from '../../constants';
import { getNextCursor } from '../pagination';

export default action(
  'list-contacts',
  {
    operation: 'list',
    resource: 'contacts',
    mutation: false,
    schema: z.object({
      cursor: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const resp = await client.contacts.list(auth, {
      cursor: input.cursor,
      limit: MAX_QUERY_PAGE_SIZE,
    });
    return {
      ...resp,
      cursor: getNextCursor({
        records: resp.records,
        limit: MAX_QUERY_PAGE_SIZE,
      }),
    };
  },
);
