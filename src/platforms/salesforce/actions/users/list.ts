import { transformUser } from '@/platforms/salesforce/actions/mappers';
import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from '../../constants';
import { getNextCursor } from '../pagination';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.list(auth, {
      cursor: input.cursor,
      limit: MAX_QUERY_PAGE_SIZE,
    });
    return {
      records: result.data.records.map(transformUser),
      cursor: getNextCursor({
        records: result.data.records,
        limit: MAX_QUERY_PAGE_SIZE,
      }),
      $native: result.$native,
    };
  },
);
