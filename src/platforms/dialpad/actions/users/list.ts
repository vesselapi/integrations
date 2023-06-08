import { transformUser } from '@/platforms/dialpad/actions/mappers';
import { action } from '@/sdk';
import { z } from 'zod';
import client from '../../client';

export default action(
  'list-users',
  {
    operation: 'list',
    resource: 'users',
    mutation: false,
    schema: z.object({
      cursor: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ auth, input }) => {
    const result = await client.users.list(auth, input);

    return {
      cursor: result.data.cursor,
      items: result.data.items?.map(transformUser),
      $native: result.$native,
    };
  },
);
