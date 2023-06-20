import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { random } from 'radash';
import { z } from 'zod';

export default action(
  'mark-tasks-complete',
  {
    operation: 'mark-complete',
    resource: 'tasks',
    mutation: false,
    schema: z.object({
      ids: z.array(z.string()),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.tasks.markComplete(auth, {
      ids: input.ids,
      async: false,
      sync_index_tasks: false,
      // Generate a new cache key to force a cache miss.
      cacheKey: random(0, 1e12),
    });

    return {
      tasks: result.data.tasks,
      $native: result.$native,
    };
  },
);
