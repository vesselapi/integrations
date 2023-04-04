import { client } from '@/platforms/salesforce/client';
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
      Id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.find(auth, { Id: input.Id });
  },
);
