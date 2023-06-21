import {
  transformPagination,
  transformTask,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';
import { DEFAULT_PAGE_SIZE } from '../../constants';

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
      per_page: DEFAULT_PAGE_SIZE,
    });

    return {
      pagination: transformPagination(result.data.pagination, input.page),
      tasks: result.data.tasks.map(transformTask),
      $native: result.$native,
    };
  },
);
