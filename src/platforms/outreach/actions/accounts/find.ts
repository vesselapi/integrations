import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-account',
  {
    operation: 'find',
    resource: 'accounts',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.find(auth, { id: input.id });
  },
);
