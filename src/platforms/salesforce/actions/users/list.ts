import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

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
    return await client.users.list(auth, { cursor: input.cursor });
  },
);
