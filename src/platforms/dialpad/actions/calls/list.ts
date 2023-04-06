import { transformCall } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-calls',
  {
    operation: 'list',
    resource: 'calls',
    mutation: false,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.calls.list(auth, input);

    return {
      cursor: result.data.cursor,
      items: result.data.items?.map(transformCall),
      $native: result.$native,
    };
  },
);
