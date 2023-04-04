import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: custom.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.find(auth, { id: input.id });
  },
);
