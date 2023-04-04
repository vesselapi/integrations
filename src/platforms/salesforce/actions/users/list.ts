import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';
import { MAX_QUERY_PAGE_SIZE } from '../../constants';
import { getNextCursor } from '../pagination';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: custom.object({
      cursor: z.number().optional(),
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
      cursor: getNextCursor({
        records: resp.records,
        limit: MAX_QUERY_PAGE_SIZE,
      }),
    };
  },
);
