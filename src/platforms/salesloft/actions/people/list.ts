import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-people',
  {
    operation: 'list',
    resource: 'people',
    mutation: true,
    schema: z.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.people.list(auth, input);
  },
);
