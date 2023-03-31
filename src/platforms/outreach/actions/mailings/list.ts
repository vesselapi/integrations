import { outreachUrl } from '@/platforms/outreach/actions/validators';
import { client } from '@/platforms/outreach/client';
import { action } from '@/sdk';
import { z } from 'zod';

export default action(
  'list-mailings',
  {
    operation: 'list',
    resource: 'mailings',
    mutation: false,
    schema: z.object({
      cursor: outreachUrl().optional(),
      filters: z
        .object({
          prospectId: z.number().optional(),
          sequenceId: z.number().optional(),
        })
        .optional(),
    }),
    scopes: [],
  },
  async ({ input, auth }) => {
    return await client.mailings.list(auth, input);
  },
);
