import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-sequence',
  {
    operation: 'find',
    resource: 'sequences',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.get(auth, { id: input.id });
  },
);