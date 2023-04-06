import { transformUser } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-users',
  {
    operation: 'search',
    resource: 'users',
    mutation: true,
    schema: z.object({
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.users.search(auth, input);

    return {
      pagination: {
        page: result.data.pagination.page,
        perPage: result.data.pagination.per_page,
        totalEntries: result.data.pagination.total_entries,
        totalPages: result.data.pagination.total_pages,
      },
      users: result.data.users.map(transformUser),
      $native: result.$native,
    };
  },
);
