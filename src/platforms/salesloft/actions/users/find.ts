import { transformUser } from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: true,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.find(auth, input);

    return {
      data: transformUser(result.data.data),
      $native: result.$native,
    };
  },
);
