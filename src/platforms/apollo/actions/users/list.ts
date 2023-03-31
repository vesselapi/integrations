import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.search(auth, {
      page: input.page,
    });
  },
);
