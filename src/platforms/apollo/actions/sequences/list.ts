import { client } from '@/platforms/apollo/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-sequences',
  {
    operation: 'list',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      q_keywords: z.string().optional(),
      page: z.number().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.search(auth, {
      page: input.page,
      q_keywords: input.q_keywords,
    });
  },
);
