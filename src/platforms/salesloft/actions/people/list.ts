import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-people',
  {
    operation: 'list',
    resource: 'people',
    mutation: true,
    schema: custom.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.people.list(auth, input);
  },
);
