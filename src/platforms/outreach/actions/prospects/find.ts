import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'find-prospect',
  {
    operation: 'find',
    resource: 'prospects',
    mutation: false,
    schema: custom.object({
      id: z.number(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.prospects.find(auth, { id: input.id });
  },
);
