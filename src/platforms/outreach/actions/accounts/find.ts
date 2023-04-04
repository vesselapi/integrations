import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-account',
  {
    operation: 'find',
    resource: 'accounts',
    mutation: false,
    schema: custom.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.accounts.find(auth, { id: input.id });
  },
);
