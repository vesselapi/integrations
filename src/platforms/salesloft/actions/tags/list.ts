import {
  transformMetadata,
  transformPerson,
} from '@/platforms/salesloft/actions/mappers';
import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-tags',
  {
    operation: 'list',
    resource: 'tags',
    mutation: false,
    schema: z.object({
      search: z.string().optional(),
      ids: z.array(z.string()).optional(),
      perPage: z.number().optional(),
      page: z.number().optional(),
      sortBy: z.string().optional(),
      sortDirection: z.string().optional(),
      includePagingCounts: z.boolean().optional(),
      limitPagingCounts: z.boolean().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.tags.list(auth, {
      search: input.search,
      ids: input.ids,
      per_page: input.perPage,
      page: input.page,
      sort_by: input.sortBy,
      sort_direction: input.sortDirection,
      include_paging_counts: input.includePagingCounts,
      limit_paging_counts: input.limitPagingCounts,
    });

    return {
      data: {
        data: result.data.data.map(transformPerson),
        metadata: transformMetadata(result.data.metadata),
      },
      $native: result.$native,
    };
  },
);
