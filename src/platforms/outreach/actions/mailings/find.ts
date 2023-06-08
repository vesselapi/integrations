import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'find-mailing',
  {
    operation: 'find',
    resource: 'mailings',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.mailings.find(auth, { id: input.id });
  },
);
