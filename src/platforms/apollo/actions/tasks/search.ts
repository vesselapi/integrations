import {
  transformPagination,
  transformTask,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-tasks',
  {
    operation: 'search',
    resource: 'tasks',
    mutation: false,
    schema: z.object({
      userIds: z.array(z.string()).optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.tasks.search(auth, {
      user_ids: input.userIds,
      page: input.page,
    });

    return {
      pagination: transformPagination(result.data.pagination),
      tasks: result.data.tasks.map(transformTask),
      $native: result.$native,
    };
  },
);
