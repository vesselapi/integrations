import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'search-users',
  {
    operation: 'search',
    resource: 'users',
    mutation: true,
    schema: custom.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.search(auth, input);
  },
);
