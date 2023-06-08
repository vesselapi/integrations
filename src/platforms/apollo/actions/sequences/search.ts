import {
  transformPagination,
  transformSequence,
} from '@/platforms/apollo/actions/mappers';
import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-sequences',
  {
    operation: 'search',
    resource: 'sequences',
    mutation: false,
    schema: z.object({
      qKeywords: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    const result = await client.sequences.search(auth, {
      q_keywords: input.qKeywords,
      page: input.page,
    });

    return {
      pagination: transformPagination(result.data.pagination),
      emailerCampaigns: result.data.emailer_campaigns.map(transformSequence),
      $native: result.$native,
    };
  },
);
