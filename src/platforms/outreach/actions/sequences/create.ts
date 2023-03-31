import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'create-sequence',
  {
    operation: 'create',
    resource: 'sequences',
    mutation: true,
    schema: z.object({
      attributes: z.object({
        name: z.string(),
        sequenceType: z.enum(['date', 'interval']),
        shareType: z.enum(['private', 'read_only', 'shared']),
      }),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.sequences.create(auth, input);
  },
);
