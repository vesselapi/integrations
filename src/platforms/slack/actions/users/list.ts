import { client } from '@/platforms/slack/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: true,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.users.list(auth, {
      cursor: input.cursor,
    });
  },
);
