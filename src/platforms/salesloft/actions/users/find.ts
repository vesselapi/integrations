import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: true,
    schema: custom.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.find(auth, input);
  },
);
