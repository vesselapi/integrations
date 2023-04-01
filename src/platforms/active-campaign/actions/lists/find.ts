import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-list',
  {
    operation: 'find',
    resource: 'lists',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.lists.find(auth, {
      id: input.id,
    });
  },
);
