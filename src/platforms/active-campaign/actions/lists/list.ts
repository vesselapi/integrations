import { client } from '@/platforms/active-campaign/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-lists',
  {
    operation: 'list',
    resource: 'lists',
    mutation: false,
    schema: custom.object({
      limit: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.lists.list(auth, {
      limit: input.limit,
    });
  },
);
