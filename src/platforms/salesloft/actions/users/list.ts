import { transformUser } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: true,
    schema: z.object({
      perPage: z.number().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.list(auth, {
      per_page: input.perPage,
      page: input.page,
    });

    return {
      data: result.data.data.map(transformUser),
      $native: result.$native,
    };
  },
);
