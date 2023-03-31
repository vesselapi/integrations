import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-list',
  {
    operation: 'find',
    resource: 'lists',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.lists.get(auth, { Id: input.id });
  },
);
