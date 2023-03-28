import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'get-mailing',
  {
    resource: 'mailings',
    mutation: false,
    schema: z.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.mailings.get(auth, { id: input.id });
  },
);
