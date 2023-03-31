import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

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
    return await client.lists.list(auth, { cursor: input.cursor });
  },
);
