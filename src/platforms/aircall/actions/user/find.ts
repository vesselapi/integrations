import { transformUser } from '@/platforms/aircall/actions/mappers';
import { z } from 'zod';
import { action } from '../../../../sdk';
import { client } from '../../client';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.number().or(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.find(auth, { id: input.id });

    return {
      user: transformUser(result.data.user),
      $native: result.$native,
    };
  },
);
