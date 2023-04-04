import { client } from '@/platforms/salesloft/client';
import { action } from '@/sdk';
import * as custom from '@/sdk/validators';
import { z } from 'zod';

export default action(
  'list-emails',
  {
    operation: 'list',
    resource: 'emails',
    mutation: true,
    schema: custom.object({
      per_page: z.number().optional(),
      page: z.number().optional(),
      person_id: z.string().optional(),
      cadence_id: z.string().optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.emails.list(auth, input);
  },
);
