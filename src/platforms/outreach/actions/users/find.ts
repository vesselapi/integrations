import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.find(auth, { id: input.id });
  },
);
