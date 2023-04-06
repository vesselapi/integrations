import { transformUser } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'find-user',
  {
    operation: 'find',
    resource: 'users',
    mutation: false,
    schema: z.object({
      id: z.string(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.users.find(auth, {
      id: input.id,
    });

    return {
      ...transformUser(result.data),
      $native: result.$native,
    };
  },
);
