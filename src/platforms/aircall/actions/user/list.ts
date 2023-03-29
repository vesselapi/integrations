import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'users-list',
  {
    resource: 'user',
    mutation: false,
    schema: z.object({
      from: z.string().optional(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.list(auth, {
      from: input.from,
      page: input.page,
      per_page: input.per_page,
    });
  },
);
