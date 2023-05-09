import {
  transformPagination,
  transformUser,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-users',
  {
    operation: 'search',
    resource: 'users',
    mutation: false,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.search(auth, input);

    return {
      pagination: transformPagination(result.data.pagination),
      users: result.data.users.map(transformUser),
      $native: result.$native,
    };
  },
);
