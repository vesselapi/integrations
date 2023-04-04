import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'search-sequences',
  {
    operation: 'search',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      q_keywords: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.search(auth, input);
  },
);
