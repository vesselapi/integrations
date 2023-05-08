import { transformLabel } from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-labels',
  {
    operation: 'search',
    resource: 'labels',
    mutation: false,
    schema: z.object({
      qKeywords: z.string().optional(),
      page: z.number().optional(),
      teamListsOnly: z.boolean().optional().default(false),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.labels.search(auth, {
      q_keywords: input.qKeywords,
      page: input.page,
      team_lists_only: input.teamListsOnly,
    });

    return {
      labels: result.data.labels.map(transformLabel),
      $native: result.$native,
    };
  },
);
