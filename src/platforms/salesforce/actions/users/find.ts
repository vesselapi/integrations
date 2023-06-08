import { transformUser } from '@/platforms/salesforce/actions/mappers';
import { client } from '@/platforms/salesforce/client';
import { action } from '@/sdk';
import { z } from 'zod';

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
  async ({ input, auth }) => {
    const result = await client.users.find(auth, { Id: input.id });

    return {
      ...transformUser(result.data),
      $native: result.$native,
    };
  },
);
