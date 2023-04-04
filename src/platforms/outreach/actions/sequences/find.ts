import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-sequence',
  {
    operation: 'find',
    resource: 'sequences',
    mutation: false,
    schema: custom.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.find(auth, { id: input.id });
  },
);
